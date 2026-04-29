import {
  createHashMap,
  each,
  HashMap,
  isFunction,
  map,
} from 'zrender/src/core/util'
import GlobalModel from '../model/Global'
import ExtensionAPI from './ExtensionAPI'
import { GanttType } from './Gantt'
import {
  createTask,
  PerformArgs,
  Task,
  TaskContext,
  TaskPlanCallbackReturn,
  TaskProgressCallback,
  TaskProgressParams,
} from './Task'
import SeriesModel from '../model/Series'
import SeriesData from '../data/SeriesData'
import {
  Payload,
  SeriesLargeOptionMixin,
  SeriesOption,
  StageHandler,
  StageHandlerInternal,
  StageHandlerOverallReset,
  StageHandlerPlan,
  StageHandlerProgressExecutor,
  StageHandlerReset,
} from '../util/types'
import ChartView from '../view/Chart'
import { getUID } from '../util/component'
import { normalizeToArray } from '../util/model'

export type Pipeline = {
  id: string
  head: GeneralTask //首部任务
  tail: GeneralTask //尾部任务
  threshold: number
  progressiveEnabled: boolean
  blockIndex: number
  step: number
  count: number
  currentTask?: GeneralTask
  context?: PipelineContext
}

export type PipelineContext = {
  progressiveRender: boolean
  modDataCount: number
  large: boolean
}

export type GeneralTask = Task<TaskContext>

export type OverallTask = Task<OverallTaskContext> & {
  agentStubMap?: HashMap<StubTask>
}

export type StubTask = Task<StubTaskContext> & {
  agent?: OverallTask
}

export type SeriesTask = Task<SeriesTaskContext>

export interface SeriesTaskContext extends TaskContext {
  model?: SeriesModel
  data?: SeriesData
  view?: ChartView
  piModel?: GlobalModel
  api?: ExtensionAPI
  useClearVisual?: boolean
  plan?: StageHandlerPlan
  reset?: StageHandlerReset
  scheduler?: Scheduler
  payload?: Payload
  resetDefines?: StageHandlerProgressExecutor[]
}

type TaskRecord = {
  seriesTaskMap?: HashMap<SeriesTask>
  overallTask?: OverallTask
}

export interface OverallTaskContext extends TaskContext {
  piModel: GlobalModel
  api: ExtensionAPI
  overallReset: StageHandlerOverallReset
  scheduler: Scheduler
  payload?: Payload
}

export interface StubTaskContext extends TaskContext {
  model: SeriesModel
  overallProgress: boolean
}

type PerformStageTaskOpt = {
  block?: boolean
  setDirty?: boolean
  visualType?: StageHandlerInternal['visualType']
  dirtyMap?: HashMap<any>
}

class Scheduler {
  readonly piInstance: GanttType
  readonly api: ExtensionAPI

  private _dataProcessorHandlers: StageHandlerInternal[]
  private _visualHandlers: StageHandlerInternal[]
  private _allHandlers: StageHandlerInternal[]

  private _stageTaskMap: HashMap<TaskRecord> = createHashMap<TaskRecord>()
  private _pipelineMap: HashMap<Pipeline>

  unfinished: boolean

  constructor(
    piInstance: GanttType,
    api: ExtensionAPI,
    dataProcessorHandlers: StageHandlerInternal[],
    visualHandlers: StageHandlerInternal[]
  ) {
    this.piInstance = piInstance
    this.api = api
    dataProcessorHandlers = this._dataProcessorHandlers =
      dataProcessorHandlers.slice()
    visualHandlers = this._visualHandlers = visualHandlers.slice()
    this._allHandlers = dataProcessorHandlers.concat(visualHandlers)
  }

  restorePipelines(piModel: GlobalModel) {
    const scheduler = this
    const pipelineMap = (scheduler._pipelineMap = createHashMap())
    piModel.eachSeries(function (serierModel) {
      const progressive = serierModel.getProgressive()
      const pipelineId = serierModel.uid
      pipelineMap.set(pipelineId, {
        id: pipelineId,
        head: null,
        tail: null,
        threshold: serierModel.getProgressiveThreshold(),
        progressiveEnabled: progressive as boolean,
        blockIndex: -1,
        step: Math.round(progressive || 700),
        count: 0,
      })
      scheduler._pipe(serierModel, serierModel.dataTask)
    })
  }

  restoreData(piModel: GlobalModel, payload: Payload): void {
    piModel.restoreData(payload)
    this._stageTaskMap.each(function (taskRecord) {
      const overallTask = taskRecord.overallTask
      overallTask && overallTask.dirty()
    })
  }


  performSeriesTasks(piModel: GlobalModel): void {
    let unfinished: boolean

    piModel.eachSeries(function (seriesModel) {
      unfinished = seriesModel.dataTask.perform() || unfinished
    })
    this.unfinished = unfinished || this.unfinished
  }

   performDataProcessorTasks(piModel: GlobalModel, payload?: Payload) {
    this._performStageTasks(this._dataProcessorHandlers, piModel, payload, {
      block: true,
    })
  }

  private _performStageTasks(
    stageHandlers: StageHandlerInternal[],
    piModel: GlobalModel,
    payload: Payload,
    opt?: PerformStageTaskOpt
  ): void {
    opt = opt || {}
    let unfinished: boolean = false
    const scheduler = this

    each(stageHandlers, function (stageHandler, idx) {
      if (opt.visualType && opt.visualType !== stageHandler.visualType) {
        return
      }
      const stageHandlerRecord = scheduler._stageTaskMap.get(stageHandler.uid)

      const seriesTaskMap = stageHandlerRecord.seriesTaskMap
      const overallTask = stageHandlerRecord.overallTask
      if (overallTask) {
        let overallNeedDirty
        const agentStubMap = overallTask.agentStubMap
        agentStubMap.each(function (stub) {
          if (needSetDirty(opt, stub)) {
            stub.dirty()
            overallNeedDirty = true
          }
        })
        overallNeedDirty && overallTask.dirty()
        scheduler.updatePayload(overallTask, payload)
        const performArgs = scheduler.getPerformArgs(overallTask, opt.block)
        // Execute stubs firstly, which may set the overall task dirty,
        // then execute the overall task. And stub will call seriesModel.setData,
        // which ensures that in the overallTask seriesModel.getData() will not
        // return incorrect data.
        agentStubMap.each(function (stub) {
          stub.perform(performArgs)
        })
        if (overallTask.perform(performArgs)) {
          unfinished = true
        }
      } else if (seriesTaskMap) {
        seriesTaskMap.each(function (task, pipelineId) {
          if (needSetDirty(opt, task)) {
            task.dirty()
          }
          const performArgs: PerformArgs = scheduler.getPerformArgs(
            task,
            opt.block
          )
          // FIXME
          // if intending to declare `performRawSeries` in handlers, only
          // stream-independent (specifically, data item independent) operations can be
          // performed. Because if a series is filtered, most of the tasks will not
          // be performed. A stream-dependent operation probably cause wrong biz logic.
          // Perhaps we should not provide a separate callback for this case instead
          // of providing the config `performRawSeries`. The stream-dependent operations
          // and stream-independent operations should better not be mixed.
          performArgs.skip =
            !stageHandler.performRawSeries &&
            piModel.isSeriesFiltered(task.context.model)
          scheduler.updatePayload(task, payload)

          if (task.perform(performArgs)) {
            unfinished = true
          }
        })
      }
    })

    function needSetDirty(
      opt: PerformStageTaskOpt,
      task: GeneralTask
    ): boolean {
      return (
        opt.setDirty && (!opt.dirtyMap || opt.dirtyMap.get(task.__pipeline.id))
      )
    }

    this.unfinished = unfinished || this.unfinished
  }

  prepareStageTasks() {
    const stageTaskMap = this._stageTaskMap
    const piModel = this.api.getModel()
    const api = this.api
    each(
      this._allHandlers,
      function (handler) {
        const record =
          stageTaskMap.get(handler.uid) || stageTaskMap.set(handler.uid, {})

        handler.reset &&
          this._createSeriesStageTask(handler, record, piModel, api)
        handler.overallReset &&
          this._createOverallStageTask(handler, record, piModel, api)
      },
      this
    )
  }

  prepareView(
    view: ChartView,
    model: SeriesModel,
    piModel: GlobalModel,
    api: ExtensionAPI
  ) {
    const renderTask = view.renderTask
    const context = renderTask.context
    context.model = model
    context.piModel = piModel
    context.api = api

    renderTask.__block = !view.incrementalPrepareRender
    this._pipe(model, renderTask)
  }

  performVisualTasks(
    piModel: GlobalModel,
    payload?: Payload,
    opt?: PerformStageTaskOpt
  ): void {
    this._performStageTasks(this._visualHandlers, piModel, payload, opt)
  }

  _pipe(serierModel: SeriesModel, task: GeneralTask) {
    const pipelineId = serierModel.uid
    const pipeline = this._pipelineMap.get(pipelineId)
    !pipeline.head && (pipeline.head = task)
    pipeline.tail && pipeline.tail.pipe(task)
    pipeline.tail = task
    task.__idxInPipeline = pipeline.count++
    task.__pipeline = pipeline
  }

  plan(): void {
    this._pipelineMap.each((pipeline) => {
      let task = pipeline.tail
      do {
        if (task.__block) {
          pipeline.blockIndex = task.__idxInPipeline
          break
        }

        task = task.getUpstream()
      } while (task)
    })
  }

  

  //性能处理权衡数据量大小
  getPerformArgs(
    task: GeneralTask,
    isBlock?: boolean
  ): {
    step: number
    modBy: number
    modDataCount: number
  } {
    if (!task.__pipeline) {
      return
    }

    const pipeline = this._pipelineMap.get(task.__pipeline.id)
    const pCtx = pipeline.context
    const incremental =
      !isBlock &&
      pipeline.progressiveEnabled &&
      (!pCtx || pCtx.progressiveRender) &&
      task.__idxInPipeline > pipeline.blockIndex
    const step = incremental ? pipeline.step : null
    const modDataCount = pCtx?.modDataCount
    const modBy = modDataCount != null ? Math.ceil(modDataCount / step) : null
    return { step, modBy, modDataCount }
  }

  getPipeline(pipelineId: string) {
    return this._pipelineMap.get(pipelineId)
  }

  updatePayload(
    task: Task<SeriesTaskContext | OverallTaskContext>,
    payload: Payload | 'remain'
  ): void {
    payload !== 'remain' && (task.context.payload = payload)
  }

  //流式启用渐进式渲染（通过seriesModel的uid获取渲染管线）
  updateStreamModes(
    seriesModel: SeriesModel<SeriesOption & SeriesLargeOptionMixin>,
    view: ChartView
  ): void {
    const pipeline = this._pipelineMap.get(seriesModel.uid)
    const data = seriesModel.getData()
    const dataLength = data.count()

    //管线启用渐进式渲染 && 视图支持渐进式渲染 && 实际数据量超过了管线阈值
    const progressiveRender =
      pipeline.progressiveEnabled &&
      view.incrementalPrepareRender &&
      dataLength >= pipeline.threshold

    const large =
      seriesModel.get('large') &&
      dataLength >= seriesModel.get('largeThreshold')
    const modDataCount =
      seriesModel.get('progressiveChunkMode') === 'mod' ? dataLength : null
    seriesModel.pipelineContext = pipeline.context = {
      progressiveRender: progressiveRender,
      modDataCount: modDataCount,
      large: large,
    }
  }

  private _createSeriesStageTask(
    stageHandler: StageHandlerInternal,
    stageHandlerRecord: TaskRecord,
    piModel: GlobalModel,
    api: ExtensionAPI
  ): void {
    const scheduler = this
    const oldSeriesTaskMap = stageHandlerRecord.seriesTaskMap
    // The count of stages are totally about only several dozen, so
    // do not need to reuse the map.
    const newSeriesTaskMap = (stageHandlerRecord.seriesTaskMap =
      createHashMap())
    const seriesType = stageHandler.seriesType
    const getTargetSeries = stageHandler.getTargetSeries
    if (stageHandler.createOnAllSeries) {
      piModel.eachRawSeries(create)
    } else if (seriesType) {
      piModel.eachRawSeriesByType(seriesType, create)
    } else if (getTargetSeries) {
      getTargetSeries(piModel, api).each(create)
    }

    function create(seriesModel: SeriesModel): void {
      const pipelineId = seriesModel.uid

      // Init tasks for each seriesModel only once.
      // Reuse original task instance.
      const task = newSeriesTaskMap.set(
        pipelineId,
        (oldSeriesTaskMap && oldSeriesTaskMap.get(pipelineId)) ||
          createTask<SeriesTaskContext>({
            plan: seriesTaskPlan,
            reset: seriesTaskReset,
            count: seriesTaskCount,
          })
      )
      task.context = {
        model: seriesModel,
        piModel: piModel,
        api: api,
        // PENDING: `useClearVisual` not used?
        useClearVisual: stageHandler.isVisual && !stageHandler.isLayout,
        plan: stageHandler.plan,
        reset: stageHandler.reset,
        scheduler: scheduler,
      }
      scheduler._pipe(seriesModel, task)
    }
  }

  private _createOverallStageTask(
    stageHandler: StageHandlerInternal,
    stageHandlerRecord: TaskRecord,
    piModel: GlobalModel,
    api: ExtensionAPI
  ): void {
    const scheduler = this
    const overallTask: OverallTask = (stageHandlerRecord.overallTask =
      stageHandlerRecord.overallTask ||
      // For overall task, the function only be called on reset stage.
      createTask<OverallTaskContext>({ reset: overallTaskReset }))
    overallTask.context = {
      piModel: piModel,
      api: api,
      overallReset: stageHandler.overallReset,
      scheduler: scheduler,
    }

    const oldAgentStubMap = overallTask.agentStubMap
    // The count of stages are totally about only several dozen, so
    // do not need to reuse the map.
    const newAgentStubMap = (overallTask.agentStubMap =
      createHashMap<StubTask>())

    const seriesType = stageHandler.seriesType
    const getTargetSeries = stageHandler.getTargetSeries
    let overallProgress = true
    let shouldOverallTaskDirty = false
    if (seriesType) {
      piModel.eachRawSeriesByType(seriesType, createStub)
    } else if (getTargetSeries) {
      getTargetSeries(piModel, api).each(createStub)
    }
    // Otherwise, (usually it is legacy case), the overall task will only be
    // executed when upstream is dirty. Otherwise the progressive rendering of all
    // pipelines will be disabled unexpectedly. But it still needs stubs to receive
    // dirty info from upstream.
    else {
      overallProgress = false
      each(piModel.getSeries(), createStub)
    }

    function createStub(seriesModel: SeriesModel): void {
      const pipelineId = seriesModel.uid
      const stub = newAgentStubMap.set(
        pipelineId,
        (oldAgentStubMap && oldAgentStubMap.get(pipelineId)) ||
          // When the result of `getTargetSeries` changed, the overallTask
          // should be set as dirty and re-performed.
          ((shouldOverallTaskDirty = true),
          createTask<StubTaskContext>({
            reset: stubReset,
            onDirty: stubOnDirty,
          }))
      )
      stub.context = {
        model: seriesModel,
        overallProgress: overallProgress,
        // FIXME:TS never used, so comment it
        // modifyOutputEnd: modifyOutputEnd
      }
      stub.agent = overallTask
      stub.__block = overallProgress
      scheduler._pipe(seriesModel, stub)
    }

    if (shouldOverallTaskDirty) {
      overallTask.dirty()
    }
  }

  static wrapStageHandler(
    stageHandler: StageHandler | StageHandlerOverallReset,
    visualType: StageHandlerInternal['visualType']
  ): StageHandlerInternal {
    if (isFunction(stageHandler)) {
      stageHandler = {
        overallReset: stageHandler,
        seriesType: detectSeriseType(stageHandler),
      } as StageHandlerInternal
    }

    ;(stageHandler as StageHandlerInternal).uid = getUID('stageHandler')
    visualType &&
      ((stageHandler as StageHandlerInternal).visualType = visualType)

    return stageHandler as StageHandlerInternal
  }
}

function detectSeriseType(legacyFunc: StageHandlerOverallReset): string {
  seriesType = null
  try {
    // Assume there is no async when calling `eachSeriesByType`.
    legacyFunc(piModelMock, apiMock)
  } catch (e) {}
  return seriesType
}

const piModelMock: GlobalModel = {} as GlobalModel
const apiMock: ExtensionAPI = {} as ExtensionAPI
let seriesType

function seriesTaskPlan(context: SeriesTaskContext): TaskPlanCallbackReturn {
  return context.plan
    ? context.plan(context.model, context.piModel, context.api, context.payload)
    : null
}

function seriesTaskReset(
  context: SeriesTaskContext
):
  | TaskProgressCallback<SeriesTaskContext>
  | TaskProgressCallback<SeriesTaskContext>[] {
  if (context.useClearVisual) {
    context.data.clearAllVisual()
  }
  const resetDefines = (context.resetDefines = normalizeToArray(
    context.reset(context.model, context.piModel, context.api, context.payload)
  ) as StageHandlerProgressExecutor[])
  return resetDefines.length > 1
    ? map(resetDefines, function (v, idx) {
        return makeSeriesTaskProgress(idx)
      })
    : singleSeriesTaskProgress
}

const singleSeriesTaskProgress = makeSeriesTaskProgress(0)
function makeSeriesTaskProgress(
  resetDefineIdx: number
): TaskProgressCallback<SeriesTaskContext> {
  return function (
    params: TaskProgressParams,
    context: SeriesTaskContext
  ): void {
    const data = context.data
    const resetDefine = context.resetDefines[resetDefineIdx]

    if (resetDefine && resetDefine.dataEach) {
      for (let i = params.start; i < params.end; i++) {
        resetDefine.dataEach(data, i)
      }
    } else if (resetDefine && resetDefine.progress) {
      resetDefine.progress(params, data)
    }
  }
}

function overallTaskReset(context: OverallTaskContext): void {
  context.overallReset(context.piModel, context.api, context.payload)
}

function stubReset(
  context: StubTaskContext
): TaskProgressCallback<StubTaskContext> {
  return context.overallProgress && stubProgress
}

function stubProgress(this: StubTask): void {
  this.agent.dirty()
  this.getDownstream().dirty()
}

function stubOnDirty(this: StubTask): void {
  this.agent && this.agent.dirty()
}

function seriesTaskCount(context: SeriesTaskContext): number {
  return context.data.count()
}

export default Scheduler
