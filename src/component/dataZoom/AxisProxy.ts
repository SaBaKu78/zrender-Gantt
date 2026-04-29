import { AxisBaseModel } from '../../coord/AxisBaseModel'
import GlobalModel from '../../model/Global'
import DataZoomModel from './DataZoomModel'
import {
  DataZoomAxisDimension,
  getAxisMainType,
  isCoordSupported,
} from './helper'
import * as numberUtil from '../../util/number'
import SeriesModel from '../../model/Series'
import { SINGLE_REFERRING } from '../../util/model'
import { each } from 'zrender/src/core/util'
import { Dictionary } from 'zrender/src/core/types'
import { ensureScaleRawExtentInfo } from '../../coord/scaleRawExtentInfo'
import sliderMove from '../helper/sliderMove'
import ExtensionAPI from '../../core/ExtensionAPI'
import * as zrUtil from 'zrender/src/core/util'
import { unionAxisExtentFromData } from '../../coord/axisHelper'

const asc = numberUtil.asc

interface MinMaxSpan {
  minSpan: number
  maxSpan: number
  minValueSpan: number
  maxValueSpan: number
}

class AxisProxy {
  piModel: GlobalModel

  private _dimName: DataZoomAxisDimension
  private _axisIndex: number

  private _valueWindow: [number, number]
  private _percentWindow: [number, number]

  private _dataExtent: [number, number]

  private _minMaxSpan: MinMaxSpan

  private _dataZoomModel: DataZoomModel

  constructor(
    dimName: DataZoomAxisDimension,
    axisIndex: number,
    dataZoomModel: DataZoomModel,
    piModel: GlobalModel
  ) {
    this._dimName = dimName

    this._axisIndex = axisIndex

    this.piModel = piModel

    this._dataZoomModel = dataZoomModel
  }

  hostedBy(dataZoomModel: DataZoomModel): boolean {
    return this._dataZoomModel === dataZoomModel
  }

  getDataValueWindow() {
    return this._valueWindow.slice() as [number, number]
  }

  getTargetSeriesModels() {
    const seriesModels: SeriesModel[] = []

    this.piModel.eachSeries(function (seriesModel) {
      if (isCoordSupported(seriesModel)) {
        const axisMainType = getAxisMainType(this._dimName)
        const axisModel = seriesModel.getReferringComponents(
          axisMainType,
          SINGLE_REFERRING
        ).models[0]
        if (axisModel && this._axisIndex === axisModel.componentIndex) {
          seriesModels.push(seriesModel)
        }
      }
    }, this)

    return seriesModels
  }

  getAxisModel(): AxisBaseModel {
    return this.piModel.getComponent(
      this._dimName + 'Axis',
      this._axisIndex
    ) as AxisBaseModel
  }

  getDataPercentWindow() {
    return this._percentWindow.slice() as [number, number]
  }

  getMinMaxSpan() {
    return zrUtil.clone(this._minMaxSpan)
  }

  calculateDataWindow(opt?: {
    start?: number
    end?: number
    startValue?: number | string | Date
    endValue?: number | string | Date
  }) {
    const dataExtent = this._dataExtent
    const axisModel = this.getAxisModel()
    const scale = axisModel.axis.scale
    const rangePropMode = this._dataZoomModel.getRangePropMode()
    const percentExtent = [0, 100]
    const percentWindow = [] as unknown as [number, number]
    const valueWindow = [] as unknown as [number, number]
    let hasPropModeValue
    each(['start', 'end'] as const, function (prop, idx) {
      let boundPercent = opt[prop]
      let boundValue = opt[(prop + 'Value') as 'startValue' | 'endValue']

      if (rangePropMode[idx] === 'percent') {
        boundPercent == null && (boundPercent = percentExtent[idx])
        // Use scale.parse to math round for category or time axis.

        boundValue = scale.parse(
          numberUtil.linearMap(boundPercent, percentExtent, dataExtent)
        )
      } else {
        hasPropModeValue = true
        boundValue =
          boundValue == null ? dataExtent[idx] : scale.parse(boundValue)
        boundPercent = numberUtil.linearMap(
          boundValue,
          dataExtent,
          percentExtent
        )
      }

      valueWindow[idx] =
        boundValue == null || isNaN(boundValue) ? dataExtent[idx] : boundValue
      percentWindow[idx] =
        boundPercent == null || isNaN(boundPercent)
          ? percentExtent[idx]
          : boundPercent
    })

    asc(valueWindow)
    asc(percentWindow)

    // The windows from user calling of `dispatchAction` might be out of the extent,
    // or do not obey the `min/maxSpan`, `min/maxValueSpan`. But we don't restrict window
    // by `zoomLock` here, because we see `zoomLock` just as a interaction constraint,
    // where API is able to initialize/modify the window size even though `zoomLock`
    // specified.
    const spans = this._minMaxSpan
    hasPropModeValue
      ? restrictSet(
          valueWindow,
          percentWindow,
          dataExtent,
          percentExtent,
          false
        )
      : restrictSet(percentWindow, valueWindow, percentExtent, dataExtent, true)

    function restrictSet(
      fromWindow: number[],
      toWindow: number[],
      fromExtent: number[],
      toExtent: number[],
      toValue: boolean
    ) {
      const suffix = toValue ? 'Span' : 'ValueSpan'
      sliderMove(
        0,
        fromWindow,
        fromExtent,
        'all',
        spans[('min' + suffix) as 'minSpan' | 'minValueSpan'],
        spans[('max' + suffix) as 'maxSpan' | 'maxValueSpan']
      )
      for (let i = 0; i < 2; i++) {
        toWindow[i] = numberUtil.linearMap(
          fromWindow[i],
          fromExtent,
          toExtent,
          true
        )
        toValue && (toWindow[i] = scale.parse(toWindow[i]))
      }
    }

    return {
      valueWindow: valueWindow,
      percentWindow: percentWindow,
    }
  }

  reset(dataZoomModel: DataZoomModel) {
    if (dataZoomModel !== this._dataZoomModel) {
      return
    }

    const targetSeries = this.getTargetSeriesModels()
    // Culculate data window and data extent, and record them.
    this._dataExtent = calculateDataExtent(this, this._dimName, targetSeries)
    // `calculateDataWindow` uses min/maxSpan.
    this._updateMinMaxSpan()
    const dataWindow = this.calculateDataWindow(dataZoomModel.settledOption)

    this._valueWindow = dataWindow.valueWindow
    this._percentWindow = dataWindow.percentWindow
    
    // Update axis setting then.
    this._setAxisModel()
  }

  filterData(dataZoomModel: DataZoomModel, api: ExtensionAPI) {
    if (dataZoomModel !== this._dataZoomModel) {
      return
    }
    const axisDim = this._dimName
    const seriesModels = this.getTargetSeriesModels()
    const filterMode = dataZoomModel.get('filterMode')
    const valueWindow = this._valueWindow
    if (filterMode === 'none') {
      return
    }
    each(seriesModels, function (seriesModel) {
      let seriesData = seriesModel.getData()
      const dataDims = seriesData.mapDimensionsAll(axisDim)

      if (!dataDims.length) {
        return
      }

      if (filterMode === 'weakFilter') {
        const store = seriesData.getStore()
        const dataDimIndices = zrUtil.map(
          dataDims,
          (dim) => seriesData.getDimensionIndex(dim),
          seriesData
        )
        seriesData.filterSelf(function (dataIndex) {
          let leftOut
          let rightOut
          let hasValue
          for (let i = 0; i < dataDims.length; i++) {
            const value = store.get(dataDimIndices[i], dataIndex) as number
            const thisHasValue = !isNaN(value)
            const thisLeftOut = value < valueWindow[0]
            const thisRightOut = value > valueWindow[1]
            if (thisHasValue && !thisLeftOut && !thisRightOut) {
              return true
            }
            thisHasValue && (hasValue = true)
            thisLeftOut && (leftOut = true)
            thisRightOut && (rightOut = true)
          }
          // If both left out and right out, do not filter.
          return hasValue && leftOut && rightOut
        })
      } else {
        each(dataDims, function (dim) {
          if (filterMode === 'empty') {
            seriesModel.setData(
              (seriesData = seriesData.map(dim, function (value: number) {
                return !isInWindow(value) ? NaN : value
              }))
            )
          } else {
            const range: Dictionary<[number, number]> = {}
            range[dim] = valueWindow
            seriesData.selectRange(range)
          }
        })
      }


      each(dataDims, function (dim) {
        seriesData.setApproximateExtent(valueWindow, dim)
      })
    })

    function isInWindow(value: number) {
      return value >= valueWindow[0] && value <= valueWindow[1]
    }
  }

  private _updateMinMaxSpan() {
    const minMaxSpan = (this._minMaxSpan = {} as MinMaxSpan)
    const dataZoomModel = this._dataZoomModel
    const dataExtent = this._dataExtent

    each(
      ['min', 'max'],
      function (minMax) {
        let percentSpan = dataZoomModel.get(
          (minMax + 'Span') as 'minSpan' | 'maxSpan'
        )
        let valueSpan = dataZoomModel.get(
          (minMax + 'ValueSpan') as 'minValueSpan' | 'maxValueSpan'
        )
        valueSpan != null &&
          (valueSpan = this.getAxisModel().axis.scale.parse(valueSpan))

        // minValueSpan and maxValueSpan has higher priority than minSpan and maxSpan
        if (valueSpan != null) {
          percentSpan = numberUtil.linearMap(
            dataExtent[0] + valueSpan,
            dataExtent,
            [0, 100],
            true
          )
        } else if (percentSpan != null) {
          valueSpan =
            numberUtil.linearMap(percentSpan, [0, 100], dataExtent, true) -
            dataExtent[0]
        }

        minMaxSpan[(minMax + 'Span') as 'minSpan' | 'maxSpan'] = percentSpan
        minMaxSpan[(minMax + 'ValueSpan') as 'minValueSpan' | 'maxValueSpan'] =
          valueSpan
      },
      this
    )
  }

  private _setAxisModel() {
    const axisModel = this.getAxisModel()

    const percentWindow = this._percentWindow
    const valueWindow = this._valueWindow

    if (!percentWindow) {
      return
    }

    // [0, 500]: arbitrary value, guess axis extent.
    let precision = numberUtil.getPixelPrecision(valueWindow, [0, 500])
    precision = Math.min(precision, 20)

    const rawExtentInfo = axisModel.axis.scale.rawExtentInfo
    if (percentWindow[0] !== 0) {
      rawExtentInfo.setDeterminedMinMax(
        'min',
        +valueWindow[0].toFixed(precision)
      )
    }
    if (percentWindow[1] !== 100) {
      rawExtentInfo.setDeterminedMinMax(
        'max',
        +valueWindow[1].toFixed(precision)
      )
    }
    rawExtentInfo.freeze()
  }
}

function calculateDataExtent(
  axisProxy: AxisProxy,
  axisDim: string,
  seriesModels: SeriesModel[]
) {
  const dataExtent = [Infinity, -Infinity]

  each(seriesModels, function (seriesModel) {
    unionAxisExtentFromData(dataExtent, seriesModel.getData(), axisDim)
  })

  const axisModel = axisProxy.getAxisModel()
  const rawExtentResult = ensureScaleRawExtentInfo(
    axisModel.axis.scale,
    axisModel,
    dataExtent
  ).calculate()

  return [rawExtentResult.min, rawExtentResult.max] as [number, number]
}

export default AxisProxy
