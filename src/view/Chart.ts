import * as clazzUtil from '../util/clazz'
import {
  Payload,
  StageHandlerPlanReturn,
  StageHandlerProgressParams,
  ViewRootGroup,
} from '../util/types'
import { SeriesTask, SeriesTaskContext } from '../core/Scheduler'
import * as componentUtil from '../util/component'
import { createTask, TaskResetCallbackReturn } from '../core/Task'
import GlobalModel from '../model/Global'
import ExtensionAPI from '../core/ExtensionAPI'
import SeriesModel from '../model/Series'
import * as modelUtil from '../util/model'
import { Group } from 'zrender'
import createRenderPlanner from '../data/helper/createRenderPlanner'

const renderPlanner = createRenderPlanner()

const inner = modelUtil.makeInner<
  {
    updateMethod: keyof ChartView
  },
  Payload
>()

interface ChartView {
  incrementalPrepareRender(
    seriesModel: SeriesModel,
    piModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void
}

class ChartView {
  type: string

  readonly group: ViewRootGroup
  readonly uid: string
  readonly renderTask: SeriesTask

  __alive: boolean
  __id: string
  __model: SeriesModel

  static protoInitialize = (function () {
    const proto = ChartView.prototype
    proto.type = 'chart'
  })()

  constructor() {
    this.group = new Group()
    this.uid = componentUtil.getUID('viewChart')
    this.renderTask = createTask<SeriesTaskContext>({
      plan: renderTaskPlan,
      reset: renderTaskReset,
    })
    this.renderTask.context = { view: this } as SeriesTaskContext
  }

  init(piModal: GlobalModel, api: ExtensionAPI): void {}

  render(
    seriesModel: SeriesModel,
    piModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void {}

  dispose(piModal: GlobalModel, api: ExtensionAPI): void {}

  remove(piModel: GlobalModel, api: ExtensionAPI): void {
    this.group.removeAll()
  }

  static registerClass: clazzUtil.ClassManager['registerClass']
}

function renderTaskPlan(context: SeriesTaskContext): StageHandlerPlanReturn {
  return renderPlanner(context.model)
}

function renderTaskReset(
  context: SeriesTaskContext
): TaskResetCallbackReturn<SeriesTaskContext> {
  const seriesModel = context.model
  const piModel = context.piModel
  const api = context.api
  const payload = context.payload
  const progressiveRender = seriesModel?.pipelineContext?.progressiveRender
  const view = context.view

  const updateMethod = payload && inner(payload).updateMethod
  const methodName: keyof ChartView = progressiveRender
    ? 'incrementalPrepareRender'
    : updateMethod && view[updateMethod]
    ? updateMethod
    : 'render'
  if (methodName !== 'render') {
    ;(view[methodName] as any)(seriesModel, piModel, api, payload)
  }
  return progressMethodMap[methodName]
}

const progressMethodMap: {
  [method: string]: TaskResetCallbackReturn<SeriesTaskContext>
} = {
  render: {
    forceFirstProgress: true,
    progress: function (
      params: StageHandlerProgressParams,
      context: SeriesTaskContext
    ): void {
      context.view.render(
        context.model,
        context.piModel,
        context.api,
        context.payload
      )
    },
  },
}

export type ChartViewConstructor = typeof ChartView &
  clazzUtil.ExtendableConstructor &
  clazzUtil.ClassManager

clazzUtil.enableClassManagement(ChartView as ChartViewConstructor)

export default ChartView
