import {
  GeneralTask,
  OverallTask,
  PipelineContext,
  SeriesTask,
  SeriesTaskContext,
} from '../core/Scheduler'
import { createTask } from '../core/Task'
import SeriesData from '../data/SeriesData'
import {
  Dictionary,
  DimensionName,
  OptionDataItemObject,
  OptionEncodeValue,
  SeriesDataType,
  SeriesEncodeOptionMixin,
  SeriesOption,
  StageHandlerProgressParams,
  StatesOptionMixin,
} from '../util/types'
import ComponentModel from './Component'
import GlobalModel from './Global'
import Model from './Model'
import * as modelUtil from '../util/model'
import { SourceManager } from '../data/helper/SourceManager'
import * as zrUtil from 'zrender/src/core/util'
import { CoordinateSystem } from '../coord/CoordinateSystem'
import Axis from '../coord/Axis'

const inner = modelUtil.makeInner<
  {
    data: SeriesData
    dataBeforeProcessed: SeriesData
    sourceManager: SourceManager
  },
  SeriesModel
>()

function getSelectionKey(data: SeriesData, dataIndex: number): string {
  return data.getName(dataIndex) || data.getId(dataIndex)
}

export const SERIES_UNIVERSAL_TRANSITION_PROP = '__universalTransitionEnabled'

interface SeriesModel {
  getShadowDim?(): string
}

class SeriesModel<
  Opt extends SeriesOption = SeriesOption
> extends ComponentModel<Opt> {
  seriesIndex: number

  dataTask: SeriesTask

  //seriesModel init的时候合并默认option 被注入
  coordinateSystem: CoordinateSystem

  pipelineContext: PipelineContext

  hasSymbolVisual: boolean;

  [SERIES_UNIVERSAL_TRANSITION_PROP]: boolean

  private _selectedDataIndicesMap: Dictionary<number> = {}

  init(option: Opt, parentModel: Model, piModel: GlobalModel) {
    this.seriesIndex = this.componentIndex
    this.dataTask = createTask<SeriesTaskContext>({
      count: dataTaskCount,
      reset: dataTaskReset,
    })
    this.dataTask.context = { model: this }
    this.mergeDefault(option, piModel)
    const sourceManager = (inner(this).sourceManager = new SourceManager(this))
    sourceManager?.prepareSource()
    const data = this.getInitialData(option, piModel)
    wrapData(data, this)
    this.dataTask.context.data = data
    inner(this).dataBeforeProcessed = data
    autoSeriesName(this)

    this._initSelectedMapFromData(data)
  }

  mergeDefault(option: Opt, piModel: GlobalModel): void {
    zrUtil.merge(option, this.getDefaultOption())
  }

  mergeOption(newSeriesOption: Opt, piModel: GlobalModel) {}

  private _initSelectedMapFromData(data: SeriesData) {
    // Ignore select info in data if selectedMap exists.
    // NOTE It's only for legacy usage. edge data is not supported.
    if (this.option.selectedMap) {
      return
    }

    const dataIndices: number[] = []
    if (data.hasItemOption) {
      data.each(function (idx) {
        const rawItem = data.getRawDataItem(idx)
        if (rawItem && (rawItem as OptionDataItemObject<unknown>).selected) {
          dataIndices.push(idx)
        }
      })
    }

    if (dataIndices.length > 0) {
      this._innerSelect(data, dataIndices)
    }
  }

  getSelectedDataIndices(): number[] {
    if (this.option.selectedMap === 'all') {
      return [].slice.call(this.getData().getIndices())
    }
    const selectedDataIndicesMap = this._selectedDataIndicesMap
    const nameOrIds = zrUtil.keys(selectedDataIndicesMap)
    const dataIndices = []
    for (let i = 0; i < nameOrIds.length; i++) {
      const dataIndex = selectedDataIndicesMap[nameOrIds[i]]
      if (dataIndex >= 0) {
        dataIndices.push(dataIndex)
      }
    }
    return dataIndices
  }

  isSelected(dataIndex: number, dataType?: SeriesDataType): boolean {
    const selectedMap = this.option.selectedMap
    if (!selectedMap) {
      return false
    }

    const data = this.getData(dataType)

    return (
      (selectedMap === 'all' ||
        selectedMap[getSelectionKey(data, dataIndex)]) &&
      !data
        .getItemModel<StatesOptionMixin<unknown, unknown>>(dataIndex)
        .get(['select', 'disabled'])
    )
  }

  private _innerSelect(data: SeriesData, innerDataIndices: number[]) {
    const option = this.option
    const selectedMode = option.selectedMode
    const len = innerDataIndices.length
    if (!selectedMode || !len) {
      return
    }

    if (selectedMode === 'series') {
      option.selectedMap = 'all'
    } else if (selectedMode === 'multiple') {
      if (!zrUtil.isObject(option.selectedMap)) {
        option.selectedMap = {}
      }
      const selectedMap = option.selectedMap
      for (let i = 0; i < len; i++) {
        const dataIndex = innerDataIndices[i]
        // TODO different types of data share same object.
        const nameOrId = getSelectionKey(data, dataIndex)
        selectedMap[nameOrId] = true
        this._selectedDataIndicesMap[nameOrId] = data.getRawIndex(dataIndex)
      }
    } else if (selectedMode === 'single' || selectedMode === true) {
      const lastDataIndex = innerDataIndices[len - 1]
      const nameOrId = getSelectionKey(data, lastDataIndex)
      option.selectedMap = {
        [nameOrId]: true,
      }
      this._selectedDataIndicesMap = {
        [nameOrId]: data.getRawIndex(lastDataIndex),
      }
    }
  }

  getAllData(): {
    data: SeriesData
    type?: SeriesDataType
  }[] {
    const mainData = this.getData()
    return mainData && mainData.getLinkedDataAll
      ? mainData.getLinkedDataAll()
      : [{ data: mainData }]
  }

  setData(data: SeriesData) {
    const task = getCurrentTask(this)
    if (task) {
      const context = task.context
      context.outputData = data
      if (task !== this.dataTask) {
        context.data = data
      }
    }
    inner(this).data = data
  }

  getData(dataType?: SeriesDataType): SeriesData<this> {
    const task = getCurrentTask(this)
    if (task) {
      const data = task.context.data
      return (
        dataType == null ? data : data.getLinkedData(dataType)
      ) as SeriesData<this>
    } else {
      // When series is not alive (that may happen when click toolbox
      // restore or setOption with not merge mode), series data may
      // be still need to judge animation or something when graphic
      // elements want to know whether fade out.
      return inner(this).data as SeriesData<this>
    }
  }

  /**
   * 初始化data数据结构
   * 需要被重写
   */
  getInitialData(option: Opt, piModel: GlobalModel): SeriesData {
    return
  }

  getRawData(): SeriesData {
    return inner(this).dataBeforeProcessed
  }

  getProgressive(): number | false {
    return this.get('progressive')
  }

  getProgressiveThreshold(): number {
    return this.get('progressiveThreshold')
  }

  getEncode() {
    const encode = (this as Model<SeriesEncodeOptionMixin>).get('encode', true)
    if (encode) {
      return zrUtil.createHashMap<OptionEncodeValue, DimensionName>(encode)
    }
  }

  getSourceManager(): SourceManager {
    return inner(this).sourceManager
  }

  getBaseAxis(): Axis {
    const coordSys = this.coordinateSystem
    // @ts-ignore
    return coordSys && coordSys.getBaseAxis && coordSys.getBaseAxis()
  }

  restoreData() {
    this.dataTask.dirty()
  }

  isUniversalTransitionEnabled(): boolean {
    if (this[SERIES_UNIVERSAL_TRANSITION_PROP]) {
      return true
    }

    const universalTransitionOpt = this.option.universalTransition
    if (!universalTransitionOpt) {
      return false
    }

    if (universalTransitionOpt === true) {
      return true
    }

    // Can be simply 'universalTransition: true'
    return universalTransitionOpt && universalTransitionOpt.enabled
  }
}

function dataTaskCount(context: SeriesTaskContext): number {
  return context.model.getRawData().count()
}

function dataTaskReset(context: SeriesTaskContext) {
  const seriesModel = context.model
  seriesModel.setData(seriesModel.getRawData().cloneShallow())
  return dataTaskProgress
}

function dataTaskProgress(
  param: StageHandlerProgressParams,
  context: SeriesTaskContext
): void {
  // Avoid repeat cloneShallow when data just created in reset.
  if (context.outputData && param.end > context.outputData.count()) {
    context.model.getRawData().cloneShallow(context.outputData)
  }
}

function getCurrentTask(seriesModel: SeriesModel): GeneralTask {
  const scheduler = (seriesModel.piModel || {}).scheduler
  const pipeline = scheduler?.getPipeline(seriesModel.uid)
  if (pipeline) {
    let task = pipeline.currentTask
    if (task) {
      const agentStubMap = (task as OverallTask).agentStubMap
      if (agentStubMap) {
        task = agentStubMap.get(seriesModel.uid)
      }
    }
    return task
  }
}

function wrapData(data: SeriesData, seriesModel: SeriesModel): void {
  zrUtil.each(
    zrUtil.concatArray(data.CHANGABLE_METHODS, data.DOWNSAMPLE_METHODS),
    function (methodName) {
      data.wrapMethod(
        methodName as any,
        zrUtil.curry(onDataChange, seriesModel)
      )
    }
  )
}

function autoSeriesName(seriesModel: SeriesModel): void {
  // User specified name has higher priority, otherwise it may cause
  // series can not be queried unexpectedly.
  const name = seriesModel.name
  if (!modelUtil.isNameSpecified(seriesModel)) {
    seriesModel.name = getSeriesAutoName(seriesModel) || name
  }
}

function getSeriesAutoName(seriesModel: SeriesModel): string {
  const data = seriesModel.getRawData()
  const dataDims = data.mapDimensionsAll('seriesName')
  const nameArr: string[] = []
  zrUtil.each(dataDims, function (dataDim) {
    const dimInfo = data.getDimensionInfo(dataDim)
    dimInfo.displayName && nameArr.push(dimInfo.displayName)
  })
  return nameArr.join(' ')
}

function onDataChange(
  this: SeriesData,
  seriesModel: SeriesModel,
  newList: SeriesData
): SeriesData {
  const task = getCurrentTask(seriesModel)
  if (task) {
    // Consider case: filter, selectRange
    task.setOutputEnd((newList || this).count())
  }
  return newList
}

export default SeriesModel
