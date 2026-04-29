import { getPrecision, nice, round } from "../../util/number";
import IntervalScale from "./Interval";
import { Scale } from "./Scale";



type intervalScaleNiceTicksResult = {
    interval: number,
    intervalPrecision: number,
    niceTickExtent: [number, number]
}

export function normalize(val: number, extent: [number, number]): number {
    if (extent[1] === extent[0]) {
        return 0.5;
    }
    return (val - extent[0]) / (extent[1] - extent[0]);
}

export function isIntervalOrLogScale(scale: Scale): scale is IntervalScale {
    return scale.type === 'interval'
}


/**
 * @param extent Both extent[0] and extent[1] should be valid number.
 *               Should be extent[0] < extent[1].
 * @param splitNumber splitNumber should be >= 1.
 */
export function intervalScaleNiceTicks(
    extent: [number, number],
    splitNumber: number,
    minInterval?: number,
    maxInterval?: number
): intervalScaleNiceTicksResult {

    const result = {} as intervalScaleNiceTicksResult;

    const span = extent[1] - extent[0];
    let interval = result.interval = nice(span / splitNumber, true);
    if (minInterval != null && interval < minInterval) {
        interval = result.interval = minInterval;
    }
    if (maxInterval != null && interval > maxInterval) {
        interval = result.interval = maxInterval;
    }
    // Tow more digital for tick.
    const precision = result.intervalPrecision = getIntervalPrecision(interval);
    // Niced extent inside original extent
    const niceTickExtent = result.niceTickExtent = [
        round(Math.ceil(extent[0] / interval) * interval, precision),
        round(Math.floor(extent[1] / interval) * interval, precision)
    ];

    fixExtent(niceTickExtent, extent);

    return result;
}

export function fixExtent(
    niceTickExtent: [number, number], extent: [number, number]
): void {
    !isFinite(niceTickExtent[0]) && (niceTickExtent[0] = extent[0]);
    !isFinite(niceTickExtent[1]) && (niceTickExtent[1] = extent[1]);
    clamp(niceTickExtent, 0, extent);
    clamp(niceTickExtent, 1, extent);
    if (niceTickExtent[0] > niceTickExtent[1]) {
        niceTickExtent[0] = niceTickExtent[1];
    }
}

export function getIntervalPrecision(interval: number): number {
    // Tow more digital for tick.
    return getPrecision(interval) + 2;
}

function clamp(
    niceTickExtent: [number, number], idx: number, extent: [number, number]
): void {
    niceTickExtent[idx] = Math.max(Math.min(niceTickExtent[idx], extent[1]), extent[0]);
}