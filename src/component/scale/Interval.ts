import { Dictionary } from 'zrender/src/core/types'
import { Scale } from './Scale'
import * as helper from './helper'
import * as numberUtil from '../../util/number'
import { ScaleTick } from '../../util/types'
import * as formatUtil from '../../util/format';

const roundNumber = numberUtil.round

class IntervalScale<
  SETTING extends Dictionary<unknown> = Dictionary<unknown>
> extends Scale<SETTING> {
  static type = 'interval'
  type = 'interval'
  protected _interval: number = 0
  protected _niceExtent: [number, number]
  private _intervalPrecision: number = 2

  getTicks(expandToNicedExtent?: boolean): ScaleTick[] {
    const interval = this._interval
    const extent = this._extent
    const niceTickExtent = this._niceExtent
    const intervalPrecision = this._intervalPrecision

    const ticks = [] as ScaleTick[]
    // If interval is 0, return [];
    if (!interval) {
      return ticks
    }

    // Consider this case: using dataZoom toolbox, zoom and zoom.
    const safeLimit = 10000

    if (extent[0] < niceTickExtent[0]) {
      if (expandToNicedExtent) {
        ticks.push({
          value: roundNumber(niceTickExtent[0] - interval, intervalPrecision),
        })
      } else {
        ticks.push({
          value: extent[0],
        })
      }
    }
    let tick = niceTickExtent[0]

    while (tick <= niceTickExtent[1]) {
      ticks.push({
        value: tick,
      })
      // Avoid rounding error
      tick = roundNumber(tick + interval, intervalPrecision)
      if (tick === ticks[ticks.length - 1].value) {
        // Consider out of safe float point, e.g.,
        // -3711126.9907707 + 2e-10 === -3711126.9907707
        break
      }
      if (ticks.length > safeLimit) {
        return []
      }
    }
    // Consider this case: the last item of ticks is smaller
    // than niceTickExtent[1] and niceTickExtent[1] === extent[1].
    const lastNiceTick = ticks.length
      ? ticks[ticks.length - 1].value
      : niceTickExtent[1]
    if (extent[1] > lastNiceTick) {
      if (expandToNicedExtent) {
        ticks.push({
          value: roundNumber(lastNiceTick + interval, intervalPrecision),
        })
      } else {
        ticks.push({
          value: extent[1],
        })
      }
    }

    return ticks
  }

     getLabel(
        data: ScaleTick,
        opt?: {
            precision?: 'auto' | number,
            pad?: boolean
        }
    ): string {
        if (data == null) {
            return '';
        }

        let precision = opt && opt.precision;

        if (precision == null) {
            precision = numberUtil.getPrecision(data.value) || 0;
        }
        else if (precision === 'auto') {
            // Should be more precise then tick.
            precision = this._intervalPrecision;
        }

        // (1) If `precision` is set, 12.005 should be display as '12.00500'.
        // (2) Use roundNumber (toFixed) to avoid scientific notation like '3.5e-7'.
        const dataNum = roundNumber(data.value, precision as number, true);

        return formatUtil.addCommas(dataNum);
    }

  calcTicks(
    splitNumber?: number,
    minInterval?: number,
    maxInterval?: number
  ): void {
    splitNumber = splitNumber || 5
    const extent = this._extent
    let span = extent[1] - extent[0]
    if (!isFinite(span)) {
      return
    }
    // User may set axis min 0 and data are all negative
    // FIXME If it needs to reverse ?
    if (span < 0) {
      span = -span
      extent.reverse()
    }

    const result = helper.intervalScaleNiceTicks(
      extent,
      splitNumber,
      minInterval,
      maxInterval
    )

    this._intervalPrecision = result.intervalPrecision
    this._interval = result.interval
    this._niceExtent = result.niceTickExtent
  }

  parse(val: number): number {
    return val
  }

  calcNiceExtent(opt?: {
    splitNumber?: number
    fixMin?: boolean
    fixMax?: boolean
    minInterval?: number
    maxInterval?: number
  }): void {
    const extent = this._extent
    // If extent start and end are same, expand them
    if (extent[0] === extent[1]) {
      if (extent[0] !== 0) {
        // Expand extent
        // Note that extents can be both negative. See #13154
        const expandSize = Math.abs(extent[0])
        // In the fowllowing case
        //      Axis has been fixed max 100
        //      Plus data are all 100 and axis extent are [100, 100].
        // Extend to the both side will cause expanded max is larger than fixed max.
        // So only expand to the smaller side.
        if (!opt.fixMax) {
          extent[1] += expandSize / 2
          extent[0] -= expandSize / 2
        } else {
          extent[0] -= expandSize / 2
        }
      } else {
        extent[1] = 1
      }
    }
    const span = extent[1] - extent[0]
    // If there are no data and extent are [Infinity, -Infinity]
    if (!isFinite(span)) {
      extent[0] = 0
      extent[1] = 1
    }

    this.calcNiceTicks(opt.splitNumber, opt.minInterval, opt.maxInterval)
    // let extent = this._extent;
    const interval = this._interval

    if (!opt.fixMin) {
      extent[0] = roundNumber(Math.floor(extent[0] / interval) * interval)
    }
    if (!opt.fixMax) {
      extent[1] = roundNumber(Math.ceil(extent[1] / interval) * interval)
    }
  }

  /**
   * @param splitNumber By default `5`.
   */
  calcNiceTicks(
    splitNumber?: number,
    minInterval?: number,
    maxInterval?: number
  ): void {
    splitNumber = splitNumber || 5
    const extent = this._extent
    let span = extent[1] - extent[0]
    if (!isFinite(span)) {
      return
    }
    // User may set axis min 0 and data are all negative
    // FIXME If it needs to reverse ?
    if (span < 0) {
      span = -span
      extent.reverse()
    }

    const result = helper.intervalScaleNiceTicks(
      extent,
      splitNumber,
      minInterval,
      maxInterval
    )

    this._intervalPrecision = result.intervalPrecision
    this._interval = result.interval
    this._niceExtent = result.niceTickExtent
  }

  normalize(val: number): number {
    return helper.normalize(val, this._extent)
  }

  setInterval(interval: number): void {
    this._interval = interval
    // Dropped auto calculated niceExtent and use user-set extent.
    // We assume user wants to set both interval, min, max to get a better result.
    this._niceExtent = this._extent.slice() as [number, number]
    this._intervalPrecision = helper.getIntervalPrecision(interval)
  }
}

Scale.registerClass(IntervalScale)

export default IntervalScale
