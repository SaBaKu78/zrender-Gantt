import * as zrender from 'zrender'
import { warn } from '../util/log'
import * as modelUtil from '../util/model'
import '../mock/index'
import {
  ActionHandler,
  ActionInfo,
  ComponentMainType,
  ComponentSubType,
  GanttBaseOption,
  GanttUnitOption,
  OptionPreprocessor,
  Payload,
  PIActionEvent,
  PIElement,
  PIElementEvent,
  PIEventData,
  RendererType,
  SelectChangedPayload,
  StageHandler,
  StageHandlerInternal,
  StageHandlerOverallReset,
  ZRElementEventName,
} from '../util/types'
import {
  assert,
  bind,
  createHashMap,
  defaults,
  each,
  extend,
  HashMap,
  indexOf,
  isFunction,
  isObject,
  map,
  retrieve2,
} from 'zrender/src/core/util'
import { throttle } from '../util/throttle'
import Eventful, { EventCallbackSingleParam } from 'zrender/src/core/Eventful'
import ComponentView, { ComponentViewConstructor } from '../view/Component'
import extensionRegisters, { use } from '../../extension'
import GridView from '../component/gird/GridView'
import { parseClassType } from '../util/clazz'
import CoordinateSystemManager from './CoordinateSystem'
import { CoordinateSystemCreator } from '../coord/CoordinateSystem'
import Grid from '../component/gird/Grid'
import GlobalModel, {
  GlobalModelSetOptionOpts,
  QueryConditionKindA,
} from '../model/Global'
import ComponentModel from '../model/Component'
import { PIEventProcessor } from '../util/PIEventProcessor'
import OptionManager from '../model/OptionManager'
import GridModel from '../component/gird/GridModel'
import { install as TitleInstall } from '../component/title/TitleModel'
import { install as SliderSplitInstall } from '../component/split/SliderSplitModel'
import { install as CustomSeriesInstall } from '../component/custom/install'
import { install as AxisInstall } from '../component/axis/install'
import { install as DataZoomInstall } from '../component/dataZoom/install'
import ExtensionAPI from './ExtensionAPI'
import EventController from './EventController'
import SliderSplitView from '../component/split/SliderSplitView'
import { getResourceList } from '../api/resource'
import Scheduler from './Scheduler'
import {
  UpdateLifecycleParams,
  UpdateLifecycleTransitionItem,
  UpdateLifecycleTransitionOpt,
} from './lifecycle'
import ChartView, { ChartViewConstructor } from '../view/Chart'
import { dataSymbolTask } from '../visual/symbol'
import SeriesModel from '../model/Series'
import * as graphic from '../util/graphic'
import CanvasPainter from 'zrender/lib/canvas/Painter'
import moment from 'moment'
import { createLocaleObject, LocaleOption, SYSTEM_LANG } from './locale'
import {
  allLeaveBlur,
  blurComponent,
  blurSeriesFromHighlightPayload,
  enterEmphasis,
  findComponentHighDownDispatchers,
  getAllSelectedIndices,
  HIGHLIGHT_ACTION_TYPE,
  HOVER_STATE_BLUR,
  HOVER_STATE_EMPHASIS,
  isHighDownPayload,
  isSelectChangePayload,
  leaveEmphasis,
  toggleSelectionFromPayload,
  updateSeriesElementSelection,
} from '../util/states'
import { isElementRemoved } from '../animation/basicTransition'

//----------------------------------- 变量 定义区 --------------------------------------------------------

window.moment = moment

const IN_MAIN_PROCESS_KEY = '__flagInMainProcess' as const
const PENDING_UPDATE = '__pendingUpdate' as const

const MOUSE_EVENT_NAMES: ZRElementEventName[] = [
  'click',
  'dblclick',
  'mouseover',
  'mouseout',
  'mousemove',
  'mousedown',
  'mouseup',
  'globalout',
  'contextmenu',
]
const ACTION_REG = /^[a-zA-Z0-9_]+$/

const COMPONENT_NAME = ['grid']

const instances: { [id: string]: Gantt } = {}

let idBase: number = +new Date() - 0
let groupIdBase: number = +new Date() - 0
const DOM_ATTRIBUTE_KEY = '_instance_'
const STATUS_NEEDS_UPDATE_KEY = '__needsUpdateStatus' as const

const TEST_FRAME_REMAIN_TIME = 1

const PRIORITY_PROCESSOR_SERIES_FILTER = 800
const PRIORITY_PROCESSOR_DATASTACK = 900
const PRIORITY_PROCESSOR_FILTER = 1000
const PRIORITY_PROCESSOR_DEFAULT = 2000
const PRIORITY_PROCESSOR_STATISTIC = 5000

const PRIORITY_VISUAL_LAYOUT = 1000
const PRIORITY_VISUAL_PROGRESSIVE_LAYOUT = 1100
const PRIORITY_VISUAL_GLOBAL = 2000
const PRIORITY_VISUAL_CHART = 3000
const PRIORITY_VISUAL_COMPONENT = 4000

const PRIORITY_VISUAL_CHART_DATA_CUSTOM = 4500

const PRIORITY_VISUAL_POST_CHART_LAYOUT = 4600
const PRIORITY_VISUAL_BRUSH = 5000
const PRIORITY_VISUAL_ARIA = 6000
const PRIORITY_VISUAL_DECAL = 7000

// export const PRIORITY = {
//   PROCESSOR: {
//     FILTER: PRIORITY_PROCESSOR_FILTER,
//     SERIES_FILTER: PRIORITY_PROCESSOR_SERIES_FILTER,
//     STATISTIC: PRIORITY_PROCESSOR_STATISTIC,
//   },
//   VISUAL: {
//     LAYOUT: PRIORITY_VISUAL_LAYOUT,
//     PROGRESSIVE_LAYOUT: PRIORITY_VISUAL_PROGRESSIVE_LAYOUT,
//     GLOBAL: PRIORITY_VISUAL_GLOBAL,
//     CHART: PRIORITY_VISUAL_CHART,
//     POST_CHART_LAYOUT: PRIORITY_VISUAL_POST_CHART_LAYOUT,
//     COMPONENT: PRIORITY_VISUAL_COMPONENT,
//     BRUSH: PRIORITY_VISUAL_BRUSH,
//     CHART_ITEM: PRIORITY_VISUAL_CHART_DATA_CUSTOM,
//     ARIA: PRIORITY_VISUAL_ARIA,
//     DECAL: PRIORITY_VISUAL_DECAL,
//   },
// }

const eventActionMap: { [eventType: string]: string } = {}
const actions: {
  [actionType: string]: {
    action: ActionHandler
    actionInfo: ActionInfo
  }
} = {}

const dataProcessorFuncs: StageHandlerInternal[] = []
const visualFuncs: StageHandlerInternal[] = []
const registeredTasks: (StageHandler | StageHandlerOverallReset)[] = []
const optionPreprocessorFuncs: OptionPreprocessor[] = []

//----------------------------------- 变量 定义区 --------------------------------------------------------

//----------------------------------- ts Type 定义区 --------------------------------------------------------

type RenderedEventParam = { elapsedTime: number }

type EventDefinition = {
  [key in ZRElementEventName]: EventCallbackSingleParam<PIElementEvent>
} & {
  rendered: EventCallbackSingleParam<RenderedEventParam>
  finished: () => void | boolean
} & {
  // TODO: Use ECActionEvent
  [key: string]: (...args: unknown[]) => void | boolean
}

type InitOpts = {
  locale?: string | LocaleOption
  renderer?: RendererType
  devicePixelRatio?: number
  useDirtyRect?: boolean
  useCoarsePointer?: boolean
  pointerSize?: number
  ssr?: boolean
  width?: number | string
  height?: number | string
}

type EventMethodName = 'on' | 'off'

//----------------------------------- ts Type 定义区 --------------------------------------------------------

//----------------------------------- Interface 定义区 --------------------------------------------------------

export interface ResizeOpts {
  width?: number | 'auto'
  height?: number | 'auto'
}

export type SetOptionTransitionOpt = UpdateLifecycleTransitionOpt
export type SetOptionTransitionOptItem = UpdateLifecycleTransitionItem

export interface SetOptionOpts {
  notMerge?: boolean
  lazyUpdate?: boolean
  silent?: boolean
  // Rule: only `id` mapped will be merged,
  // other components of the certain `mainType` will be removed.
  replaceMerge?: GlobalModelSetOptionOpts['replaceMerge']
  transition?: SetOptionTransitionOpt
}

//----------------------------------- Interface 定义区 --------------------------------------------------------

//----------------------------------- 函数 定义区 --------------------------------------------------------

let prepare: (piIns: Gantt) => void
let prepareView: (piIns: Gantt, isComponent: boolean) => void
let updateDirectly: (
  piIns: Gantt,
  method: string,
  payload: Payload,
  mainType: ComponentMainType,
  subType?: ComponentSubType
) => void
let bindRenderedEvent: (zr: zrender.ZRenderType, piIns: Gantt) => void
let bindMouseEvent: (zr: zrender.ZRenderType, piIns: Gantt) => void
let bindLayeroutEvent: (zr: zrender.ZRenderType, piIns: Gantt) => void
type UpdateMethod = (
  this: Gantt,
  payload?: Payload,
  renderParams?: UpdateLifecycleParams
) => void
let updateMethods: {
  update: UpdateMethod
}

let render: (
  piIns: Gantt,
  piModel: GlobalModel,
  api: ExtensionAPI,
  payload: Payload,
  updateParams: UpdateLifecycleParams
) => void
let renderComponents: (
  piIns: Gantt,
  piModel: GlobalModel,
  api: ExtensionAPI,
  payload: Payload,
  dirtyList?: ComponentView[]
) => void
let renderSeries: (
  piIns: Gantt,
  piModel: GlobalModel,
  api: ExtensionAPI,
  payload: Payload | 'remain',
  updateParams: UpdateLifecycleParams,
  dirtyMap?: { [uid: string]: any }
) => void
let doDispatchAction: (this: Gantt, payload: Payload, silent: boolean) => void
let flushPendingActions: (this: Gantt, silent: boolean) => void
let triggerUpdatedEvent: (this: Gantt, silent: boolean) => void
let createExtensionAPI: (piIns: Gantt) => ExtensionAPI
let markStatusToUpdate: (piIns: Gantt) => void
let applyChangedStates: (piIns: Gantt) => void
let updateStreamModes: (piIns: Gantt, piModel: GlobalModel) => void

//----------------------------------- 函数 定义区 --------------------------------------------------------
//----------------------------------- 注册实例区 --------------------------------------------------------

zrender.registerPainter('canvas', CanvasPainter)
// zrender.registerPainter('svg', SVGPainter);
extensionRegisters.registerComponentModel(GlobalModel)
extensionRegisters.registerComponentView(GridView)
extensionRegisters.registerComponentModel(GridModel)

//注册组件记得要在外部 index.js option 中有配置才会被注册进components
use(TitleInstall)
use(SliderSplitInstall)
use(CustomSeriesInstall)
registerCoordinateSystem('cartesian2d', Grid)
use(AxisInstall)
use(DataZoomInstall)
registerVisual(PRIORITY_VISUAL_CHART_DATA_CUSTOM, dataSymbolTask)

//----------------------------------- 注册实例区 --------------------------------------------------------

class MessageCenter extends Eventful {}
const messageCenterProto = MessageCenter.prototype
messageCenterProto.on = createRegisterEventWithLowercaseMessageCenter('on')
messageCenterProto.off = createRegisterEventWithLowercaseMessageCenter('off')

function createRegisterEventWithLowercaseECharts(method: EventMethodName) {
  return function (this: Gantt, ...args: any): Gantt {
    if (this.isDisposed()) {
      disposedWarning(this.id)
      return
    }
    return toLowercaseNameAndCallEventful<Gantt>(this, method, args)
  }
}

function createRegisterEventWithLowercaseMessageCenter(
  method: EventMethodName
) {
  return function (this: MessageCenter, ...args: any): MessageCenter {
    return toLowercaseNameAndCallEventful<MessageCenter>(this, method, args)
  }
}
function toLowercaseNameAndCallEventful<T>(
  host: T,
  method: EventMethodName,
  args: any
): T {
  // `args[0]` is event name. Event name is all lowercase.
  args[0] = args[0] && args[0].toLowerCase()
  return Eventful.prototype[method].apply(host, args) as any
}

class Gantt extends Eventful<EventDefinition> {
  /**
   * @readonly
   */
  id: string

  /**
   * Group id
   * @readonly
   */
  group: string

  private _ssr: boolean

  private _zr: zrender.ZRenderType

  private _api: ExtensionAPI

  private _scheduler: Scheduler

  private _dom: HTMLElement

  private _locale: LocaleOption

  private _model: GlobalModel

  private _throttledZrFlush: zrender.ZRenderType extends { flush: infer R }
    ? R
    : never

  private _componentsViews: ComponentView[] = []

  private _componentsMap: { [componentId: string]: ComponentView } = {}

  private _chartsViews: ChartView[] = []

  private _chartsViewsMap: { [viewId: string]: ChartView } = {}

  private _coordSysMgr: CoordinateSystemManager

  private eventController: EventController

  private _messageCenter: MessageCenter

  private _disposed: boolean

  private _pendingActions: Payload[] = []

  private _containerInstence: Map<string, graphic.Group> = new Map()

  private [PENDING_UPDATE]: {
    silent: boolean
    updateParams: UpdateLifecycleParams
  }

  private [IN_MAIN_PROCESS_KEY]: boolean

  constructor(dom: HTMLElement | null, opts?: InitOpts) {
    super(new PIEventProcessor())
    this._dom = dom
    opts = opts || {}
    let defaultRenderer = 'canvas'
    let defaultCoarsePointer: 'auto' | boolean = 'auto'
    let defaultUseDirtyRect = false
    const zr = (this._zr = zrender.init(dom, {
      renderer: opts?.renderer || defaultRenderer,
      devicePixelRatio: opts.devicePixelRatio,
      width: opts.width,
      height: opts.height,
      ssr: opts.ssr,
      useDirtyRect: retrieve2(opts.useDirtyRect, defaultUseDirtyRect),
      useCoarsePointer: retrieve2(opts.useCoarsePointer, defaultCoarsePointer),
      pointerSize: opts.pointerSize,
    }))

    this._ssr = opts.ssr

    this._throttledZrFlush = throttle(bind(zr.flush, zr), 17)

    const api = (this._api = createExtensionAPI(this))

    this._locale = createLocaleObject(opts.locale || SYSTEM_LANG)

    this._coordSysMgr = new CoordinateSystemManager()

    function prioritySortFunc(
      a: StageHandlerInternal,
      b: StageHandlerInternal
    ): number {
      return a.__prio - b.__prio
    }
    // timsort(visualFuncs, prioritySortFunc)
    // timsort(dataProcessorFuncs, prioritySortFunc)
    this._scheduler = new Scheduler(this, api, dataProcessorFuncs, visualFuncs)

    this._messageCenter = new MessageCenter()

    this._initEvents()
    this.resize = bind(this.resize, this)

    zr.animation.on('frame', this._onframe, this)

    bindRenderedEvent(zr, this)

    bindMouseEvent(zr, this)

    //test 测试grid大小
    // this._zr.add(new zrender.Rect({
    //   shape: {
    //     x: 186,
    //     y: 80,
    //     height: 807,
    //     width: 1489
    //   }
    // }))
  }

  async _initEvents() {
    each(MOUSE_EVENT_NAMES, (eveName) => {
      const handler = (e: zrender.ElementEvent) => {
        let params: PIElementEvent
        const isGlobalOut = eveName === 'globalout'
        if (isGlobalOut) {
          params = {} as any
        }
        if (params) {
          params.event = e
          params.type = eveName

          // (this._$eventProcessor as ECEventProcessor).eventInfo = {
          //     targetEl: el,
          //     packedEvent: params,
          //     model: model,
          //     view: view
          // };
          // this.trigger(eveName, params);
        }
      }
      this._zr.on(eveName, handler, this)
    })
    each(eventActionMap, (actionType, eventType) => {
      this._messageCenter.on(
        eventType,
        function (event: Payload) {
          ;(this as any).trigger(eventType, event)
        },
        this
      )
    })
    // this.eventController.enable(true)
  }

  resize(opts?: ResizeOpts) {
    this._zr.resize(opts)
  }

  private getModel(): GlobalModel {
    return this._model
  }

  getId(): string {
    return this.id
  }

  getZr(): zrender.ZRenderType {
    return this._zr
  }

  getWidth(): number {
    return this._zr.getWidth()
  }

  getHeight(): number {
    return this._zr.getHeight()
  }

  getOption(): GanttUnitOption {
    return this._model?.getOption()
  }

  getComponentViewMap(): ComponentView[] {
    return this._componentsViews
  }

  getDevicePixelRatio(): number {
    return (
      (this._zr.painter as CanvasPainter).dpr || window.devicePixelRatio || 1
    )
  }

  private getViewOfComponentModel(
    componentModel: ComponentModel
  ): ComponentView {
    return this._componentsMap[componentModel.__viewId]
  }

  /**
   * Get view of corresponding series model
   */
  private getViewOfSeriesModel(seriesModel: SeriesModel): ChartView {
    return this._chartsViewsMap[seriesModel.__viewId]
  }

  isDisposed(): boolean {
    return this._disposed
  }

  /**
   * 初始化甘特配置项
   * @param option 配置项
   * @param notMerge
   */
  setOption<Opt extends GanttBaseOption>(
    option: Opt,
    notMerge?: boolean,
    lazyUpdate?: boolean
  ): void
  setOption<Opt extends GanttBaseOption>(
    option: Opt,
    opts?: SetOptionOpts
  ): void
  setOption<Opt extends GanttBaseOption>(
    option: Opt,
    notMerge?: boolean | SetOptionOpts,
    lazyUpdate?: boolean
  ): void {
    if (this[IN_MAIN_PROCESS_KEY]) {
      return
    }

    if (this._disposed) {
      return
    }
    let replaceMerge
    let silent
    let transitionOpt: SetOptionTransitionOpt
    if (isObject(notMerge)) {
      lazyUpdate = notMerge.lazyUpdate
      silent = notMerge.silent
      replaceMerge = notMerge.replaceMerge
      transitionOpt = notMerge.transition
      notMerge = notMerge.notMerge
    }

    this[IN_MAIN_PROCESS_KEY] = true

    if (!this._model) {
      const optionManager = new OptionManager()
      const piModel = (this._model = new GlobalModel())
      piModel.scheduler = this._scheduler
      piModel.init(null, null, null, this._locale, optionManager)
    }
    this._model.setOption(option, { replaceMerge })
    const updateParams = {
      seriesTransition: transitionOpt,
      optionChanged: true,
    } as UpdateLifecycleParams
    if (lazyUpdate) {
      this[PENDING_UPDATE] = {
        silent: silent,
        updateParams: updateParams,
      }
      this[IN_MAIN_PROCESS_KEY] = false

      this.getZr().wakeUp()
    } else {
      try {
        prepare(this)
        updateMethods.update.call(this, null, updateParams)
      } catch (e) {
        this[PENDING_UPDATE] = null
        this[IN_MAIN_PROCESS_KEY] = false

        throw e
      }

      // Ensure zr refresh sychronously, and then pixel in canvas can be
      // fetched after `setOption`.
      if (!this._ssr) {
        // not use flush when using ssr mode.
        this._zr.flush()
      }

      this[PENDING_UPDATE] = null
      this[IN_MAIN_PROCESS_KEY] = false

      flushPendingActions.call(this, silent)
      triggerUpdatedEvent.call(this, silent)
    }
  }

  /**
   * @param opt If pass boolean, means opt.silent
   * @param opt.silent Default `false`. Whether trigger events.
   * @param opt.flush Default `undefined`.
   *        true: Flush immediately, and then pixel in canvas can be fetched
   *            immediately. Caution: it might affect performance.
   *        false: Not flush.
   *        undefined: Auto decide whether perform flush.
   */
  dispatchAction(
    payload: Payload,
    opt?:
      | boolean
      | {
          silent?: boolean
          flush?: boolean | undefined
        }
  ): void {
    if (this._disposed) {
      disposedWarning(this.id)
      return
    }

    if (!isObject(opt)) {
      opt = { silent: !!opt }
    }

    if (!actions[payload.type]) {
      return
    }

    // Avoid dispatch action before setOption. Especially in `connect`.
    if (!this._model) {
      return
    }

    // May dispatchAction in rendering procedure
    if (this[IN_MAIN_PROCESS_KEY]) {
      this._pendingActions.push(payload)
      return
    }

    const silent = opt.silent
    doDispatchAction.call(this, payload, silent)

    const flush = opt.flush
    if (flush) {
      this._zr.flush()
    }

    flushPendingActions.call(this, silent)

    triggerUpdatedEvent.call(this, silent)
  }

  private _onframe(): void {
    applyChangedStates(this)
    const scheduler = this._scheduler
    if (this[PENDING_UPDATE]) {
      const silent = (this[PENDING_UPDATE] as any).silent

      this[IN_MAIN_PROCESS_KEY] = true

      try {
        prepare(this)
        updateMethods.update.call(this, null, this[PENDING_UPDATE].updateParams)
      } catch (e) {
        this[IN_MAIN_PROCESS_KEY] = false
        this[PENDING_UPDATE] = null
        throw e
      }

      // At present, in each frame, zrender performs:
      //   (1) animation step forward.
      //   (2) trigger('frame') (where this `_onframe` is called)
      //   (3) zrender flush (render).
      // If we do nothing here, since we use `setToFinal: true`, the step (3) above
      // will render the final state of the elements before the real animation started.
      this._zr.flush()

      this[IN_MAIN_PROCESS_KEY] = false
      this[PENDING_UPDATE] = null

      flushPendingActions.call(this, silent)
      triggerUpdatedEvent.call(this, silent)
    } else if (scheduler?.unfinished) {
      let remainTime = TEST_FRAME_REMAIN_TIME
      const ecModel = this._model
      const api = this._api
      scheduler.unfinished = false
      do {
        const startTime = +new Date()

        scheduler.performSeriesTasks(ecModel)

        // Currently dataProcessorFuncs do not check threshold.
        scheduler.performDataProcessorTasks(ecModel)
        updateStreamModes(this, ecModel)

        // Do not update coordinate system here. Because that coord system update in
        // each frame is not a good user experience. So we follow the rule that
        // the extent of the coordinate system is determined in the first frame (the
        // frame is executed immediately after task reset.
        // this._coordSysMgr.update(ecModel, api);

        // console.log('--- ec frame visual ---', remainTime);
        scheduler.performVisualTasks(ecModel)

        renderSeries(this, this._model, api, 'remain', {})

        remainTime -= +new Date() - startTime
      } while (remainTime > 0 && scheduler.unfinished)

      // Call flush explicitly for trigger finished event.
      if (!scheduler.unfinished) {
        this._zr.flush()
      }
    }
  }

  //内部函数变量
  private static internalField = (function () {
    prepare = function (piIns: Gantt) {
      const scheduler = piIns._scheduler
      scheduler.restorePipelines(piIns._model)
      scheduler.prepareStageTasks()
      prepareView(piIns, true)
      prepareView(piIns, false)
      scheduler.plan()
    }

    prepareView = function (piIns: Gantt, isComponent: boolean) {
      const piModel = piIns._model
      const viewList = isComponent ? piIns._componentsViews : piIns._chartsViews
      const viewMap = isComponent ? piIns._componentsMap : piIns._chartsViewsMap
      const scheduler = piIns._scheduler
      const zr = piIns._zr
      const api = piIns._api
      isComponent
        ? piModel.eachComponent(function (componentType, model) {
            componentType !== 'series' && doPrepare(model)
          })
        : piModel.eachSeries(doPrepare)
      for (let i = 0; i < viewList.length; ) {
        const view = viewList[i]
        if (!view.__alive) {
          !isComponent && (view as ChartView).renderTask.dispose()
          zr.remove(view.group)
          view.dispose(piModel, api)
          viewList.splice(i, 1)
          if (viewMap[view.__id] === view) {
            delete viewMap[view.__id]
          }
          view.__id = view.group.__ComponentInfo = null
        } else {
          i++
        }
      }

      function doPrepare(model: ComponentModel): void {
        const requireNewView = model.__requireNewView
        // This command should not work twice.
        model.__requireNewView = false
        // Consider: id same and type changed.
        const viewId = '_pi_' + model.id + '_' + model.type
        let view = !requireNewView && viewMap[viewId]
        if (!view) {
          const classType = parseClassType(model.type)
          const Clazz = isComponent
            ? (ComponentView as ComponentViewConstructor).getClass(
                classType.main,
                classType.sub
              )
            : (ChartView as ChartViewConstructor).getClass(classType.sub)
          view = new Clazz()
          view.init(piModel, api)
          viewMap[viewId] = view
          viewList.push(view as any)
          zr.add(view.group)
        }
        model.__viewId = view.__id = viewId
        view.__alive = true
        view.__model = model
        view.group.__ComponentInfo = {
          mainType: model.mainType,
          index: model.componentIndex,
        }
        !isComponent &&
          scheduler.prepareView(
            view as ChartView,
            model as SeriesModel,
            piModel,
            api
          )
      }
    }

    updateDirectly = function (
      piIns: Gantt,
      method: string,
      payload: Payload,
      mainType: ComponentMainType,
      subType?: ComponentSubType
    ): void {
      const ecModel = piIns._model

      ecModel.setUpdatePayload(payload)

      // broadcast
      if (!mainType) {
        // FIXME
        // Chart will not be update directly here, except set dirty.
        // But there is no such scenario now.
        each(
          [].concat(piIns._componentsViews).concat(piIns._chartsViews),
          callView
        )
        return
      }

      const query: QueryConditionKindA['query'] = {}
      query[mainType + 'Id'] = payload[mainType + 'Id']
      query[mainType + 'Index'] = payload[mainType + 'Index']
      query[mainType + 'Name'] = payload[mainType + 'Name']

      const condition = {
        mainType: mainType,
        query: query,
      } as QueryConditionKindA
      subType && (condition.subType = subType) // subType may be '' by parseClassType;

      const excludeSeriesId = payload.excludeSeriesId
      let excludeSeriesIdMap: HashMap<true, string>
      if (excludeSeriesId != null) {
        excludeSeriesIdMap = createHashMap()
        each(modelUtil.normalizeToArray(excludeSeriesId), (id) => {
          const modelId = modelUtil.convertOptionIdName(id, null)
          if (modelId != null) {
            excludeSeriesIdMap.set(modelId, true)
          }
        })
      }

      // If dispatchAction before setOption, do nothing.
      ecModel &&
        ecModel.eachComponent(
          condition,
          function (model) {
            const isExcluded =
              excludeSeriesIdMap && excludeSeriesIdMap.get(model.id) != null
            if (isExcluded) {
              return
            }
            if (isHighDownPayload(payload)) {
              if (model instanceof SeriesModel) {
                if (
                  payload.type === HIGHLIGHT_ACTION_TYPE &&
                  !payload.notBlur &&
                  !model.get(['emphasis', 'disabled'])
                ) {
                  blurSeriesFromHighlightPayload(model, payload, piIns._api)
                }
              } else {
                const { focusSelf, dispatchers } =
                  findComponentHighDownDispatchers(
                    model.mainType,
                    model.componentIndex,
                    payload.name,
                    piIns._api
                  )
                if (
                  payload.type === HIGHLIGHT_ACTION_TYPE &&
                  focusSelf &&
                  !payload.notBlur
                ) {
                  blurComponent(
                    model.mainType,
                    model.componentIndex,
                    piIns._api
                  )
                }
                // PENDING:
                // Whether to put this "enter emphasis" code in `ComponentView`,
                // which will be the same as `ChartView` but might be not necessary
                // and will be far from this logic.
                if (dispatchers) {
                  each(dispatchers, (dispatcher) => {
                    payload.type === HIGHLIGHT_ACTION_TYPE
                      ? enterEmphasis(dispatcher)
                      : leaveEmphasis(dispatcher)
                  })
                }
              }
            } else if (isSelectChangePayload(payload)) {
              // TODO geo
              if (model instanceof SeriesModel) {
                toggleSelectionFromPayload(model, payload, piIns._api)
                updateSeriesElementSelection(model)
                markStatusToUpdate(piIns)
              }
            }
          },
          piIns
        )

      ecModel &&
        ecModel.eachComponent(
          condition,
          function (model) {
            const isExcluded =
              excludeSeriesIdMap && excludeSeriesIdMap.get(model.id) != null
            if (isExcluded) {
              return
            }
            callView(
              piIns[mainType === 'series' ? '_chartsMap' : '_componentsMap'][
                model.__viewId
              ]
            )
          },
          piIns
        )

      function callView(view: ComponentView | ChartView) {
        view &&
          view.__alive &&
          (view as any)[method] &&
          (view as any)[method](view.__model, ecModel, piIns._api, payload)
      }
    }

    updateStreamModes = function (piIns: Gantt, piModel: GlobalModel) {
      const chartsMap = piIns._chartsViewsMap
      const shceduler = piIns._scheduler
      piModel.eachRawSeries(function (seriesModel) {
        shceduler.updateStreamModes(
          seriesModel,
          chartsMap[seriesModel.__viewId]
        )
      })
    }

    doDispatchAction = function (
      this: Gantt,
      payload: Payload,
      silent: boolean
    ): void {
      const piModel = this.getModel()
      const payloadType = payload.type
      const escapeConnect = payload.escapeConnect
      const actionWrap = actions[payloadType]
      const actionInfo = actionWrap.actionInfo

      const cptTypeTmp = (actionInfo.update || 'update').split(':')
      const updateMethod = cptTypeTmp.pop()
      const cptType = cptTypeTmp[0] != null && parseClassType(cptTypeTmp[0])

      this[IN_MAIN_PROCESS_KEY] = true

      let payloads: Payload[] = [payload]
      let batched = false
      // Batch action
      if (payload.batch) {
        batched = true
        payloads = map<Payload['batch'][0], Payload, unknown>(
          payload.batch,
          function (item) {
            item = defaults(extend({}, item), payload)
            item.batch = null
            return item as Payload
          }
        )
      }

      const eventObjBatch: PIEventData[] = []
      let eventObj: PIActionEvent

      const isSelectChange = isSelectChangePayload(payload)
      const isHighDown = isHighDownPayload(payload)

      // Only leave blur once if there are multiple batches.
      if (isHighDown) {
        allLeaveBlur(this._api)
      }
      each(payloads, (batchItem) => {
        // Action can specify the event by return it.
        eventObj = actionWrap.action(
          batchItem,
          this._model,
          this._api
        ) as PIActionEvent
        // Emit event outside
        eventObj = eventObj || extend({} as PIActionEvent, batchItem)
        // Convert type to eventType
        eventObj.type = actionInfo.event || eventObj.type
        eventObjBatch.push(eventObj)

        // light update does not perform data process, layout and visual.
        if (isHighDown) {
          const { queryOptionMap, mainTypeSpecified } =
            modelUtil.preParseFinder(payload as modelUtil.ModelFinder)
          const componentMainType = mainTypeSpecified
            ? queryOptionMap.keys()[0]
            : 'series'
          updateDirectly(
            this,
            updateMethod,
            batchItem as Payload,
            componentMainType
          )
          markStatusToUpdate(this)
        } else if (isSelectChange) {
          // At present `dispatchAction({ type: 'select', ... })` is not supported on components.
          // geo still use 'geoselect'.
          updateDirectly(this, updateMethod, batchItem as Payload, 'series')
          markStatusToUpdate(this)
        } else if (cptType) {
          updateDirectly(
            this,
            updateMethod,
            batchItem as Payload,
            cptType.main,
            cptType.sub
          )
        }
      })

      if (
        updateMethod !== 'none' &&
        !isHighDown &&
        !isSelectChange &&
        !cptType
      ) {
        try {
          // Still dirty
          if (this[PENDING_UPDATE]) {
            prepare(this)
            updateMethods.update.call(this, payload)
            this[PENDING_UPDATE] = null
          } else {
            updateMethods[updateMethod as keyof typeof updateMethods].call(
              this,
              payload
            )
          }
        } catch (e) {
          this[IN_MAIN_PROCESS_KEY] = false
          throw e
        }
      }

      // Follow the rule of action batch
      if (batched) {
        eventObj = {
          type: actionInfo.event || payloadType,
          escapeConnect: escapeConnect,
          batch: eventObjBatch,
        }
      } else {
        eventObj = eventObjBatch[0] as PIActionEvent
      }

      this[IN_MAIN_PROCESS_KEY] = false

      if (!silent) {
        const messageCenter = this._messageCenter
        messageCenter.trigger(eventObj.type, eventObj)
        // Extra triggered 'selectchanged' event
        if (isSelectChange) {
          const newObj: SelectChangedPayload = {
            type: 'selectchanged',
            escapeConnect: escapeConnect,
            selected: getAllSelectedIndices(piModel),
            isFromClick: payload.isFromClick || false,
            fromAction: payload.type as
              | 'select'
              | 'unselect'
              | 'toggleSelected',
            fromActionPayload: payload,
          }
          messageCenter.trigger(newObj.type, newObj)
        }
      }
    }

    flushPendingActions = function (this: Gantt, silent: boolean): void {
      const pendingActions = this._pendingActions
      while (pendingActions.length) {
        const payload = pendingActions.shift()
        doDispatchAction.call(this, payload, silent)
      }
    }

    triggerUpdatedEvent = function (this: Gantt, silent): void {
      !silent && this.trigger('updated')
    }

    applyChangedStates = function (piIns: Gantt): void {
      if (!piIns[STATUS_NEEDS_UPDATE_KEY]) {
        return
      }

      piIns.getZr().storage.traverse(function (el: PIElement) {
        if (isElementRemoved(el)) {
          return
        }
        applyElementStates(el)
      })

      piIns[STATUS_NEEDS_UPDATE_KEY] = false

      function applyElementStates(el: PIElement) {
        const newStates = []
        const oldStates = el.currentStates
        for (let i = 0; i < oldStates.length; i++) {
          const stateName = oldStates[i]
          if (
            !(
              stateName === 'emphasis' ||
              stateName === 'blur' ||
              stateName === 'select'
            )
          ) {
            newStates.push(stateName)
          }
        }
        if (el.hoverState === HOVER_STATE_EMPHASIS && el.states.emphasis) {
          newStates.push('emphasis')
        } else if (el.hoverState === HOVER_STATE_BLUR && el.states.blur) {
          newStates.push('blur')
        }
        el.useStates(newStates)
      }
    }

    bindRenderedEvent = function (zr: zrender.ZRenderType, piIns: Gantt): void {
      zr.on('rendered', function (params: RenderedEventParam) {
        piIns.trigger('rendered', params)
        if (
          // Although zr is dirty if initial animation is not finished
          // and this checking is called on frame, we also check
          // animation finished for robustness.
          zr.animation.isFinished() &&
          !piIns[PENDING_UPDATE]
          // && !piIns._scheduler.unfinished
          // && !piIns._pendingActions.length
        ) {
          piIns.trigger('finished')
        }
      })
    }

    bindMouseEvent = function (zr: zrender.ZRenderType, piIns: Gantt): void {
      // zr.on('mousemove', function (e) {
      //   const el = e.target;
      // }).on('mouseout', function (e) {
      //     const el = e.target;
      // }).on('click', function (e) {
      //     const el = e.target;
      // });
    }

    //初始化被分割线分割的容器区域
    bindLayeroutEvent = function (zr: zrender.ZRenderType, piIns: Gantt): void {
      const splitViewList = piIns._componentsViews.filter(
        //@ts-ignore
        (c) => c.type == 'split.slider'
      ) as SliderSplitView[]
      const verticalSplitView = splitViewList?.filter(
        (split) => split.getOrient() == 'vertical'
      )[0]
      const horizontalSplitView = splitViewList?.filter(
        (split) => split.getOrient() == 'horizontal'
      )[0]
      const vPos = verticalSplitView.getPos()
      const hPos = horizontalSplitView.getPos()
      //横竖分割线情况
      if (verticalSplitView && horizontalSplitView) {
        //被分割册成四块区域

        //左上
        piIns._containerInstence.set(
          'ltopContainer',
          new graphic.Group({
            name: 'ltopContainer',
            x: 0,
            y: 0,
          })
        )
        //右上
        piIns._containerInstence.set(
          'rtopContainer',
          new graphic.Group({
            name: 'rtopContainer',
            x: vPos.x + vPos.width,
            y: 0,
          })
        )
        //左下
        piIns._containerInstence.set(
          'lbottomContainer',
          new graphic.Group({
            name: 'lbottomContainer',
            x: 0,
            y: hPos.y + hPos.height,
          })
        )
        //右下
        piIns._containerInstence.set(
          'rbottomContainer',
          new graphic.Group({
            name: 'rbottomContainer',
            x: vPos.x + vPos.width,
            y: hPos.y + hPos.height,
          })
        )
        piIns._containerInstence.forEach((v, k) => {
          zr.add(v)
        })
      }
      extensionRegisters.registerAction(
        {
          type: 'updateLayerout',
        },
        function (e) {
          if (verticalSplitView && horizontalSplitView) {
            const { displayables, orient } = e.data
          }
        }
      )
    }

    updateMethods = {
      //TODO
      update(
        this: Gantt,
        payload: Payload,
        updateParams: UpdateLifecycleParams
      ) {
        const model = this._model
        const zr = this._zr
        const api = this._api
        const shceduler = this._scheduler
        const coordSysMgr = this._coordSysMgr
        if (!model) {
          return
        }
        model.setUpdatePayload(payload)
        shceduler.restoreData(model, payload)
        shceduler.performSeriesTasks(model)

        coordSysMgr.create(model, api)

        shceduler.performDataProcessorTasks(model, payload)
        updateStreamModes(this, model)

        coordSysMgr.update(model, api)

        shceduler.performVisualTasks(model, payload)

        render(this, model, api, payload, updateParams)
      },
    }

    render = (
      piIns: Gantt,
      piModel: GlobalModel,
      api: ExtensionAPI,
      payload: Payload,
      updateParams: UpdateLifecycleParams
    ) => {
      renderComponents(piIns, piModel, api, payload)
      each(piIns._chartsViews, function (chart: ChartView) {
        chart.__alive = false
      })
      renderSeries(piIns, piModel, api, payload, updateParams)
      each(piIns._chartsViews, function (chart: ChartView) {
        if (!chart.__alive) {
          chart.remove(piModel, api)
        }
      })
    }

    renderComponents = (
      piIns: Gantt,
      piModel: GlobalModel,
      api: ExtensionAPI,
      payload: Payload,
      dirtyList?: ComponentView[]
    ) => {
      each(
        dirtyList || piIns._componentsViews,
        function (componentView: ComponentView) {
          const componentModel = componentView.__model
          componentView.render(componentModel, piModel, api, payload)
        }
      )
    }

    renderSeries = (
      piIns: Gantt,
      piModel: GlobalModel,
      api: ExtensionAPI,
      payload: Payload | 'remain',
      updateParams: UpdateLifecycleParams,
      dirtyMap?: { [uid: string]: any }
    ) => {
      const scheduler = piIns._scheduler
      let unfinished: boolean = false
      piModel.eachSeries(function (seriesModel) {
        const chartView = piIns._chartsViewsMap[seriesModel.__viewId]
        chartView.__alive = true
        const renderTask = chartView.renderTask
        scheduler.updatePayload(renderTask, payload)
        // clearStates(seriesModel, chartView)
        if (dirtyMap && dirtyMap.get(seriesModel.uid)) {
          renderTask.dirty()
        }
        if (renderTask.perform(scheduler.getPerformArgs(renderTask))) {
          unfinished = true
        }
      })
      scheduler.unfinished = unfinished || scheduler.unfinished
    }

    markStatusToUpdate = function (piIns: Gantt): void {
      piIns[STATUS_NEEDS_UPDATE_KEY] = true
      // Wake up zrender if it's sleep. Let it update states in the next frame.
      piIns.getZr().wakeUp()
    }

    createExtensionAPI = function (piIns: Gantt): ExtensionAPI {
      return new (class extends ExtensionAPI {
        getModel(): GlobalModel {
          return piIns.getModel()
        }

        getViewOfComponentModel(componentModel: ComponentModel): ComponentView {
          return piIns.getViewOfComponentModel(componentModel)
        }
        getViewOfSeriesModel(seriesModel: SeriesModel): ChartView {
          return piIns.getViewOfSeriesModel(seriesModel)
        }
        enterEmphasis(el: zrender.Element, highlightDigit?: number): void {
          enterEmphasis(el, highlightDigit)
          markStatusToUpdate(piIns)
        }
        leaveEmphasis(el: zrender.Element, highlightDigit?: number): void {
          leaveEmphasis(el, highlightDigit)
          markStatusToUpdate(piIns)
        }
      })(piIns)
    }
  })()
}

const echartsProto = Gantt.prototype
echartsProto.on = createRegisterEventWithLowercaseECharts('on')
echartsProto.off = createRegisterEventWithLowercaseECharts('off')

function disposedWarning(id: string): void {
  warn('Instance ' + id + ' has been disposed')
}

export function init(dom?: HTMLElement | null, opts?: InitOpts) {
  // if (__DEV__) {
  if (!dom) {
    throw new Error('Initialize failed: invalid dom.')
    // }
  }

  const existInstance = getInstanceByDom(dom)
  if (existInstance) {
    // if () {
    warn('There is a instance already initialized on the dom.')
    // }
    return existInstance
  }

  const gantt = new Gantt(dom)
  gantt.id = 'pi_' + idBase++
  instances[gantt.id] = gantt
  modelUtil.setAttribute(dom, DOM_ATTRIBUTE_KEY, gantt.id)

  return gantt
}

export function getInstanceByDom(dom: HTMLElement): Gantt | undefined {
  return instances[modelUtil.getAttribute(dom, DOM_ATTRIBUTE_KEY)]
}

export function registerPreprocessor(
  preprocessorFunc: OptionPreprocessor
): void {
  if (indexOf(optionPreprocessorFuncs, preprocessorFunc) < 0) {
    optionPreprocessorFuncs.push(preprocessorFunc)
  }
}

export function registerProcessor(
  priority: number | StageHandler | StageHandlerOverallReset,
  processor?: StageHandler | StageHandlerOverallReset
): void {
  normalizeRegister(
    dataProcessorFuncs,
    priority,
    processor,
    PRIORITY_PROCESSOR_DEFAULT
  )
}

export function registerCoordinateSystem(
  type: string,
  coordSysCreator: CoordinateSystemCreator
): void {
  CoordinateSystemManager.register(type, coordSysCreator)
}

function registerVisual(
  priority: number,
  layoutTask: StageHandler | StageHandlerOverallReset
): void
function registerVisual(
  layoutTask: StageHandler | StageHandlerOverallReset
): void
function registerVisual(
  priority: number | StageHandler | StageHandlerOverallReset,
  visualTask?: StageHandler | StageHandlerOverallReset
): void {
  normalizeRegister(
    visualFuncs,
    priority,
    visualTask,
    PRIORITY_VISUAL_CHART,
    'visual'
  )
}

function normalizeRegister(
  targetList: StageHandler[],
  priority: number | StageHandler | StageHandlerOverallReset,
  fn: StageHandler | StageHandlerOverallReset,
  defaultPriority: number,
  visualType?: StageHandlerInternal['visualType']
): void {
  if (isFunction(priority) || isObject(priority)) {
    fn = priority as StageHandler | StageHandlerOverallReset
    priority = defaultPriority
  }

  // Already registered
  if (indexOf(registeredTasks, fn) >= 0) {
    return
  }

  registeredTasks.push(fn)

  const stageHandler = Scheduler.wrapStageHandler(fn, visualType)

  stageHandler.__prio = priority
  stageHandler.__raw = fn
  targetList.push(stageHandler)
}

/**
 * @usage
 * registerAction('someAction', 'someEvent', function () { ... });
 * registerAction('someAction', function () { ... });
 * registerAction(
 *     {type: 'someAction', event: 'someEvent', update: 'updateView'},
 *     function () { ... }
 * );
 *
 * @param {(string|Object)} actionInfo
 * @param {string} actionInfo.type
 * @param {string} [actionInfo.event]
 * @param {string} [actionInfo.update]
 * @param {string} [eventName]
 * @param {Function} action
 */
export function registerAction(
  type: string,
  eventName: string,
  action: ActionHandler
): void
export function registerAction(type: string, action: ActionHandler): void
export function registerAction(
  actionInfo: ActionInfo,
  action: ActionHandler
): void
export function registerAction(
  actionInfo: string | ActionInfo,
  eventName: string | ActionHandler,
  action?: ActionHandler
): void {
  if (isFunction(eventName)) {
    action = eventName
    eventName = ''
  }
  const actionType = isObject(actionInfo)
    ? (actionInfo as ActionInfo).type
    : [
        actionInfo,
        (actionInfo = {
          event: eventName,
        } as ActionInfo),
      ][0]

  // Event name is all lowercase
  ;(actionInfo as ActionInfo).event = (
    (actionInfo as ActionInfo).event || (actionType as string)
  ).toLowerCase()
  eventName = (actionInfo as ActionInfo).event

  if (eventActionMap[eventName as string]) {
    // Already registered.
    return
  }

  // Validate action type and event name.
  assert(ACTION_REG.test(actionType as string) && ACTION_REG.test(eventName))

  if (!actions[actionType as string]) {
    actions[actionType as string] = {
      action: action,
      actionInfo: actionInfo as ActionInfo,
    }
  }
  eventActionMap[eventName as string] = actionType as string
}

export default Gantt

export interface GanttType extends Gantt {}
