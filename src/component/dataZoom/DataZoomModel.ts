import { createHashMap, each, HashMap } from 'zrender/src/core/util'
import ComponentModel from '../../model/Component'
import GlobalModel from '../../model/Global'
import Model from '../../model/Model'
import { ComponentOption, LayoutOrient } from '../../util/types'
import {
  DATA_ZOOM_AXIS_DIMENSIONS,
  DataZoomAxisDimension,
  getAxisMainType,
} from './helper'
import { MULTIPLE_REFERRING, SINGLE_REFERRING } from '../../util/model'
import AxisProxy from './AxisProxy'
import { AxisBaseModel } from '../../coord/AxisBaseModel'

type RangeOption = Pick<
  DataZoomOption,
  'start' | 'end' | 'startValue' | 'endValue'
>

export interface DataZoomOption extends ComponentOption {
  mainType?: 'dataZoom'
  orient?: LayoutOrient
  xAxisIndex?: number | number[]
  xAxisId?: string | string[]

  /**
   * Default the first vertical category axis.
   */
  yAxisIndex?: number | number[]
  yAxisId?: string | string[]

  radiusAxisIndex?: number | number[]
  radiusAxisId?: string | string[]
  angleAxisIndex?: number | number[]
  angleAxisId?: string | string[]

  singleAxisIndex?: number | number[]
  singleAxisId?: string | string[]

  filterMode?: 'filter' | 'weakFilter' | 'empty' | 'none'

  throttle?: number | null | undefined

  /**
   * Start percent. 0 ~ 100
   */
  start?: number
  /**
   * End percent. 0 ~ 100
   */
  end?: number
  /**
   * Start value. If startValue specified, start is ignored
   */
  startValue?: number | string | Date
  /**
   * End value. If endValue specified, end is ignored.
   */
  endValue?: number | string | Date
  /**
   * Min span percent, 0 - 100
   * The range of dataZoom can not be smaller than that.
   */
  minSpan?: number
  /**
   * Max span percent, 0 - 100
   * The range of dataZoom can not be larger than that.
   */
  maxSpan?: number

  minValueSpan?: number

  maxValueSpan?: number

  rangeMode?: ['value' | 'percent', 'value' | 'percent']

  realtime?: boolean
}

export type DataZoomExtendedAxisBaseModel = AxisBaseModel & {
  __dzAxisProxy: AxisProxy
}

class DataZoomAxisInfo {
  indexList: number[] = []
  indexMap: boolean[] = []

  add(axisCmptIdx: number) {
    // Remove duplication.
    if (!this.indexMap[axisCmptIdx]) {
      this.indexList.push(axisCmptIdx)
      this.indexMap[axisCmptIdx] = true
    }
  }
}

export type DataZoomTargetAxisInfoMap = HashMap<
  DataZoomAxisInfo,
  DataZoomAxisDimension
>

class DataZoomModel<
  Opts extends DataZoomOption = DataZoomOption
> extends ComponentModel<Opts> {
  static type = 'dataZoom'
  type = DataZoomModel.type

  static dependencies = ['xAxis', 'yAxis']

  static defaultOption: DataZoomOption = {
    // zlevel: 0,
    z: 4, // Higher than normal component (z: 2).

    filterMode: 'filter',

    start: 0,
    end: 100,
  }

  settledOption: Opts

  private _autoThrottle: boolean = true

  private _orient: LayoutOrient

  private _targetAxisInfoMap: DataZoomTargetAxisInfoMap

  private _noTarget: boolean = true

  private _rangePropMode: DataZoomOption['rangeMode'] = ['percent', 'percent']

  init(option: Opts, parentModel: Model, piModel: GlobalModel): void {
    const inputRawOption = retrieveRawOption(option)
    this.settledOption = inputRawOption
    this.mergeDefaultAndTheme(option, piModel)
    this._doInit(inputRawOption)
  }

  eachTargetAxis<Ctx>(
    callback: (
      this: Ctx,
      axisDim: DataZoomAxisDimension,
      axisIndex: number
    ) => void,
    context?: Ctx
  ): void {
    this._targetAxisInfoMap.each(function (axisInfo, axisDim) {
      each(axisInfo.indexList, function (axisIndex) {
        callback.call(context, axisDim, axisIndex)
      })
    })
  }

  getAxisProxy(axisDim: DataZoomAxisDimension, axisIndex: number): AxisProxy {
    const axisModel = this.getAxisModel(axisDim, axisIndex)
    if (axisModel) {
      return (axisModel as DataZoomExtendedAxisBaseModel).__dzAxisProxy
    }
  }

  getAxisModel(
    axisDim: DataZoomAxisDimension,
    axisIndex: number
  ): AxisBaseModel {
    const axisInfo = this._targetAxisInfoMap.get(axisDim)
    if (axisInfo && axisInfo.indexMap[axisIndex]) {
      return this.piModel.getComponent(
        getAxisMainType(axisDim),
        axisIndex
      ) as AxisBaseModel
    }
  }

  private _doInit(inputRawOption: Opts): void {
    const thisOption = this.option

    this._setDefaultThrottle(inputRawOption)

    this._updateRangeUse(inputRawOption)

    const settledOption = this.settledOption
    each(
      [
        ['start', 'startValue'],
        ['end', 'endValue'],
      ] as const,
      function (names, index) {
        // start/end has higher priority over startValue/endValue if they
        // both set, but we should make chart.setOption({endValue: 1000})
        // effective, rather than chart.setOption({endValue: 1000, end: null}).
        if (this._rangePropMode[index] === 'value') {
          thisOption[names[0]] = settledOption[names[0]] = null
        }
        // Otherwise do nothing and use the merge result.
      },
      this
    )
    this._resetTarget()
  }

  private _setDefaultThrottle(inputRawOption: DataZoomOption): void {
    if (inputRawOption.hasOwnProperty('throttle')) {
      this._autoThrottle = false
    }
    if (this._autoThrottle) {
      const globalOption = this.piModel.option
      this.option.throttle =
        globalOption.animation &&
        <number>globalOption.animationDurationUpdate > 0
          ? 100
          : 20
    }
  }

  private _updateRangeUse(inputRawOption: RangeOption): void {
    const rangePropMode = this._rangePropMode
    const rangeModeInOption = this.get('rangeMode')
    each(
      [
        ['start', 'startValue'],
        ['end', 'endValue'],
      ] as const,
      function (names, index) {
        const percentSpecified = inputRawOption[names[0]] != null
        const valueSpecified = inputRawOption[names[1]] != null
        if (percentSpecified && !valueSpecified) {
          rangePropMode[index] = 'percent'
        } else if (!percentSpecified && valueSpecified) {
          rangePropMode[index] = 'value'
        } else if (rangeModeInOption) {
          rangePropMode[index] = rangeModeInOption[index]
        } else if (percentSpecified) {
          // percentSpecified && valueSpecified
          rangePropMode[index] = 'percent'
        }
        // else remain its original setting.
      }
    )
  }

  private _resetTarget() {
    const optionOrient = this.get('orient', true)
    const targetAxisIndexMap = (this._targetAxisInfoMap = createHashMap<
      DataZoomAxisInfo,
      DataZoomAxisDimension
    >())

    const hasAxisSpecified = this._fillSpecifiedTargetAxis(targetAxisIndexMap)

    if (hasAxisSpecified) {
      this._orient = optionOrient || this._makeAutoOrientByTargetAxis()
    } else {
      this._orient = optionOrient || 'horizontal'
      this._fillAutoTargetAxisByOrient(targetAxisIndexMap, this._orient)
    }

    this._noTarget = true
    targetAxisIndexMap.each(function (axisInfo) {
      if (axisInfo.indexList.length) {
        this._noTarget = false
      }
    }, this)
  }

  private _fillSpecifiedTargetAxis(
    targetAxisIndexMap: DataZoomTargetAxisInfoMap
  ): boolean {
    let hasAxisSpecified = false

    each(
      DATA_ZOOM_AXIS_DIMENSIONS,
      function (axisDim) {
        const refering = this.getReferringComponents(
          getAxisMainType(axisDim),
          MULTIPLE_REFERRING
        )
        // When user set axisIndex as a empty array, we think that user specify axisIndex
        // but do not want use auto mode. Because empty array may be encountered when
        // some error occurred.

        if (!refering.specified) {
          return
        }
        hasAxisSpecified = true
        const axisInfo = new DataZoomAxisInfo()
        each(refering.models, function (axisModel) {
          axisInfo.add(axisModel.componentIndex)
        })
        targetAxisIndexMap.set(axisDim, axisInfo)
      },
      this
    )

    return hasAxisSpecified
  }

  private _fillAutoTargetAxisByOrient(
    targetAxisIndexMap: DataZoomTargetAxisInfoMap,
    orient: LayoutOrient
  ): void {
    const ecModel = this.piModel
    let needAuto = true

    // Find axis that parallel to dataZoom as default.
    if (needAuto) {
      const axisDim = orient === 'vertical' ? 'y' : 'x'
      const axisModels = ecModel.findComponents({ mainType: axisDim + 'Axis' })
      setParallelAxis(axisModels, axisDim)
    }
    // Find axis that parallel to dataZoom as default.
    // if (needAuto) {
    //   const axisModels = ecModel.findComponents({
    //     mainType: 'singleAxis',
    //     filter: (axisModel: SingleAxisModel) =>
    //       axisModel.get('orient', true) === orient,
    //   })
    //   setParallelAxis(axisModels, 'single')
    // }

    function setParallelAxis(
      axisModels: ComponentModel[],
      axisDim: DataZoomAxisDimension
    ): void {
      // At least use the first parallel axis as the target axis.
      const axisModel = axisModels[0]
      if (!axisModel) {
        return
      }

      const axisInfo = new DataZoomAxisInfo()
      axisInfo.add(axisModel.componentIndex)
      targetAxisIndexMap.set(axisDim, axisInfo)
      needAuto = false

      // Find parallel axes in the same grid.
      if (axisDim === 'x' || axisDim === 'y') {
        const gridModel = axisModel.getReferringComponents(
          'grid',
          SINGLE_REFERRING
        ).models[0]
        gridModel &&
          each(axisModels, function (axModel) {
            if (
              axisModel.componentIndex !== axModel.componentIndex &&
              gridModel ===
                axModel.getReferringComponents('grid', SINGLE_REFERRING)
                  .models[0]
            ) {
              axisInfo.add(axModel.componentIndex)
            }
          })
      }
    }

    // if (needAuto) {
    //   // If no parallel axis, find the first category axis as default. (Also consider polar).
    //   each(
    //     DATA_ZOOM_AXIS_DIMENSIONS,
    //     function (axisDim) {
    //       if (!needAuto) {
    //         return
    //       }
    //       const axisModels = ecModel.findComponents({
    //         mainType: getAxisMainType(axisDim),
    //         filter: (axisModel: SingleAxisModel) =>
    //           axisModel.get('type', true) === 'category',
    //       })
    //       if (axisModels[0]) {
    //         const axisInfo = new DataZoomAxisInfo()
    //         axisInfo.add(axisModels[0].componentIndex)
    //         targetAxisIndexMap.set(axisDim, axisInfo)
    //         needAuto = false
    //       }
    //     },
    //     this
    //   )
    // }
  }

  private _makeAutoOrientByTargetAxis(): LayoutOrient {
    let dim: string

    // Find the first axis
    this.eachTargetAxis(function (axisDim) {
      !dim && (dim = axisDim)
    }, this)

    return dim === 'y' ? 'vertical' : 'horizontal'
  }

  getRangePropMode(): DataZoomModel['_rangePropMode'] {
    return this._rangePropMode.slice() as DataZoomModel['_rangePropMode']
  }

  getOrient(): LayoutOrient {
    return this._orient
  }

  setRawRange(opt: RangeOption): void {
    const thisOption = this.option
    const settledOption = this.settledOption
    each(
      [
        ['start', 'startValue'],
        ['end', 'endValue'],
      ] as const,
      function (names) {
        // Consider the pair <start, startValue>:
        // If one has value and the other one is `null/undefined`, we both set them
        // to `settledOption`. This strategy enables the feature to clear the original
        // value in `settledOption` to `null/undefined`.
        // But if both of them are `null/undefined`, we do not set them to `settledOption`
        // and keep `settledOption` with the original value. This strategy enables users to
        // only set <end or endValue> but not set <start or startValue> when calling
        // `dispatchAction`.
        // The pair <end, endValue> is treated in the same way.
        if (opt[names[0]] != null || opt[names[1]] != null) {
          thisOption[names[0]] = settledOption[names[0]] = opt[names[0]]
          thisOption[names[1]] = settledOption[names[1]] = opt[names[1]]
        }
      },
      this
    )

    this._updateRangeUse(opt)
  }

  getPercentRange(): number[] {
    const axisProxy = this.findRepresentativeAxisProxy()
    if (axisProxy) {
      return axisProxy.getDataPercentWindow()
    }
  }

  findRepresentativeAxisProxy(axisModel?: AxisBaseModel): AxisProxy {
    if (axisModel) {
      return (axisModel as DataZoomExtendedAxisBaseModel).__dzAxisProxy
    }

    // Find the first hosted axisProxy
    let firstProxy
    const axisDimList = this._targetAxisInfoMap.keys()
    for (let i = 0; i < axisDimList.length; i++) {
      const axisDim = axisDimList[i]
      const axisInfo = this._targetAxisInfoMap.get(axisDim)
      for (let j = 0; j < axisInfo.indexList.length; j++) {
        const proxy = this.getAxisProxy(axisDim, axisInfo.indexList[j])
        if (proxy.hostedBy(this)) {
          return proxy
        }
        if (!firstProxy) {
          firstProxy = proxy
        }
      }
    }

    // If no hosted proxy found, still need to return a proxy.
    // This case always happens in toolbox dataZoom, where axes are all hosted by
    // other dataZooms.
    return firstProxy
  }

  noTarget(): boolean {
    return this._noTarget
  }

  getFirstTargetAxisModel(): AxisBaseModel {
    let firstAxisModel: AxisBaseModel
    this.eachTargetAxis(function (axisDim, axisIndex) {
      if (firstAxisModel == null) {
        firstAxisModel = this.piModel.getComponent(
          getAxisMainType(axisDim),
          axisIndex
        ) as AxisBaseModel
      }
    }, this)

    return firstAxisModel
  }
}

function retrieveRawOption<T extends DataZoomOption>(option: T) {
  const ret = {} as T
  each(
    ['start', 'end', 'startValue', 'endValue', 'throttle'] as const,
    function (name) {
      option.hasOwnProperty(name) && ((ret as any)[name] = option[name])
    }
  )
  return ret
}

export default DataZoomModel
