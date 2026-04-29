import { Scale } from '../component/scale/Scale'
import TimeScale from '../component/scale/Time'
import SeriesData from '../data/SeriesData'
import {
  Dictionary,
  DimensionName,
  ScaleTick,
  TimeScaleTick,
} from '../util/types'
import * as zrUtil from 'zrender/src/core/util'
import { AxisBaseModel } from './AxisBaseModel'
import { getStackedDimension } from '../data/helper/dataStackHelper'
import {
  AxisBaseOption,
  CategoryAxisBaseOption,
  LogAxisBaseOption,
  TimeAxisLabelFormatterOption,
  ValueAxisBaseOption,
} from './axisCommonTypes'
import { ensureScaleRawExtentInfo } from './scaleRawExtentInfo'
import { prepareLayoutBarSeries } from '../component/layout/barGrid'
import IntervalScale from '../component/scale/Interval'
import Axis from './Axis'
import Model from '../model/Model'

export function createScaleByModel(
  model: AxisBaseModel,
  axisType?: string
): Scale {
  axisType = axisType || model.get('type')
  if (!axisType) return
  switch (axisType) {
    case 'time':
      return new TimeScale({
        locale: model.piModel.getLocaleModel(),
        useUTC: false,
      })
    default:
      // case 'value'/'interval', 'log', or others.
      return new (Scale.getClass(axisType) || IntervalScale)()
  }
}

export function getDataDimensionsOnAxis(
  data: SeriesData,
  axisDim: string
): DimensionName[] {
  const dataDimMap = {} as Dictionary<boolean>
  zrUtil.each(data.mapDimensionsAll(axisDim), function (dataDim) {
    dataDimMap[getStackedDimension(data, dataDim)] = true
  })
  return zrUtil.keys(dataDimMap)
}

export function getScaleExtent(scale: Scale, model: AxisBaseModel) {
  const scaleType = scale.type
  const rawExtentResult = ensureScaleRawExtentInfo(
    scale,
    model,
    scale.getExtent()
  ).calculate()
  scale.setBlank(rawExtentResult.isBlank)

  let min = rawExtentResult.min
  let max = rawExtentResult.max

  const piModel = model.piModel
  if (piModel && scaleType === 'time' /* || scaleType === 'interval' */) {
    const barSeriesModels = prepareLayoutBarSeries('bar', piModel)
    let isBaseAxisAndHasBarSeries = false

    zrUtil.each(barSeriesModels, function (seriesModel) {
      isBaseAxisAndHasBarSeries =
        isBaseAxisAndHasBarSeries || seriesModel.getBaseAxis() === model.axis
    })

    // if (isBaseAxisAndHasBarSeries) {
    //     // Calculate placement of bars on axis. TODO should be decoupled
    //     // with barLayout
    //     const barWidthAndOffset = makeColumnLayout(barSeriesModels);

    //     // Adjust axis min and max to account for overflow
    //     const adjustedScale = adjustScaleForOverflow(min, max, model as CartesianAxisModel, barWidthAndOffset);
    //     min = adjustedScale.min;
    //     max = adjustedScale.max;
    // }
  }

  return {
    extent: [min, max],
    // "fix" means "fixed", the value should not be
    // changed in the subsequent steps.
    fixMin: rawExtentResult.minFixed,
    fixMax: rawExtentResult.maxFixed,
  }
}

export function niceScaleExtent(scale: Scale, inModel: AxisBaseModel) {
  const model = inModel as AxisBaseModel<LogAxisBaseOption>
  const extentInfo = getScaleExtent(scale, model)
  const extent = extentInfo.extent
  const splitNumber = model.get('splitNumber')

  // if (scale instanceof LogScale) {
  //   scale.base = model.get('logBase')
  // }

  const scaleType = scale.type
  const interval = model.get('interval')
  const isIntervalOrTime = scaleType === 'interval' || scaleType === 'time'
  scale.setExtent(extent[0], extent[1])
  scale.calcNiceExtent({
    splitNumber: splitNumber,
    fixMin: extentInfo.fixMin,
    fixMax: extentInfo.fixMax,
    minInterval: isIntervalOrTime ? model.get('minInterval') : null,
    maxInterval: isIntervalOrTime ? model.get('maxInterval') : null,
  })

  // If some one specified the min, max. And the default calculated interval
  // is not good enough. He can specify the interval. It is often appeared
  // in angle axis with angle 0 - 360. Interval calculated in interval scale is hard
  // to be 60.
  // FIXME
  if (interval != null) {
    ;(scale as IntervalScale).setInterval &&
      (scale as IntervalScale).setInterval(interval)
  }
}

export function unionAxisExtentFromData(
  dataExtent: number[],
  data: SeriesData,
  axisDim: string
): void {
  if (data) {
    zrUtil.each(getDataDimensionsOnAxis(data, axisDim), function (dim) {
      const seriesExtent = data.getApproximateExtent(dim)
      seriesExtent[0] < dataExtent[0] && (dataExtent[0] = seriesExtent[0])
      seriesExtent[1] > dataExtent[1] && (dataExtent[1] = seriesExtent[1])
    })
  }
}

export function makeLabelFormatter(
  axis: Axis
): (tick: ScaleTick, idx?: number) => string {
  const labelFormatter = (
    axis.getLabelModel() as Model<ValueAxisBaseOption['axisLabel']>
  ).get('formatter')
  const categoryTickStart =
    axis.type === 'category' ? axis.scale.getExtent()[0] : null

  if (axis.scale.type === 'time') {
    return (function (tpl) {
      return function (tick: ScaleTick, idx: number) {
        return (axis.scale as TimeScale).getFormattedLabel(tick, idx, tpl)
      }
    })(labelFormatter as TimeAxisLabelFormatterOption)
  } else if (zrUtil.isString(labelFormatter)) {
    return (function (tpl) {
      return function (tick: ScaleTick) {
        // For category axis, get raw value; for numeric axis,
        // get formatted label like '1,333,444'.
        const label = axis.scale.getLabel(tick)
        const text = tpl.replace('{value}', label != null ? label : '')

        return text
      }
    })(labelFormatter)
  } else if (zrUtil.isFunction(labelFormatter)) {
    return (function (cb) {
      return function (tick: ScaleTick, idx: number) {
        // The original intention of `idx` is "the index of the tick in all ticks".
        // But the previous implementation of category axis do not consider the
        // `axisLabel.interval`, which cause that, for example, the `interval` is
        // `1`, then the ticks "name5", "name7", "name9" are displayed, where the
        // corresponding `idx` are `0`, `2`, `4`, but not `0`, `1`, `2`. So we keep
        // the definition here for back compatibility.
        if (categoryTickStart != null) {
          idx = tick.value - categoryTickStart
        }
        return cb(
          getAxisRawValue(axis, tick) as number,
          idx,
          (tick as TimeScaleTick).level != null
            ? {
                level: (tick as TimeScaleTick).level,
              }
            : null
        )
      }
    })(labelFormatter as (...args: any[]) => string)
  } else {
    return function (tick: ScaleTick) {
      return axis.scale.getLabel(tick)
    }
  }
}

export function getOptionCategoryInterval(
  model: Model<AxisBaseOption['axisLabel']>
) {
  const interval = (model as Model<CategoryAxisBaseOption['axisLabel']>).get(
    'interval'
  )
  return interval == null ? 'auto' : interval
}

export function getAxisRawValue(axis: Axis, tick: ScaleTick): number | string {
  return axis.type === 'category' ? axis.scale.getLabel(tick) : tick.value
}

export function shouldShowAllLabels(axis: Axis): boolean {
  return (
    axis.type === 'category' &&
    getOptionCategoryInterval(axis.getLabelModel()) === 0
  )
}
