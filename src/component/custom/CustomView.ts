import { RectLike } from 'zrender/src/core/BoundingRect'
import ExtensionAPI from '../../core/ExtensionAPI'
import SeriesData from '../../data/SeriesData'
import GlobalModel from '../../model/Global'
import {
  Dictionary,
  DimensionLoose,
  DisplayState,
  DisplayStateNonNormal,
  InnerDecalObject,
  ParsedValue,
  Payload,
  PIElement,
  ViewRootGroup,
} from '../../util/types'
import ChartView from '../../view/Chart'
import CustomSeriesModel, {
  CustomBaseZRPathOption,
  CustomDisplayableOption,
  CustomElementOption,
  CustomElementOptionOnState,
  CustomGroupOption,
  CustomImageOption,
  customInnerStore,
  CustomRootElementOption,
  CustomSeriesRenderItemParams,
  CustomSVGPathOption,
  PrepareCustomInfo,
} from './CustomModel'
import * as graphicUtil from '../../util/graphic'
import { defaults, hasOwn, indexOf } from 'zrender/src/core/util'

import prepareCartesian2d from '../../coord/cartesian/prepareCustom'
import {
  Displayable,
  Element,
  ElementTextConfig,
  Path,
  PathStyleProps,
  PatternObject,
  TextStyleProps,
} from 'zrender'
import {
  applyLeaveTransition,
  applyUpdateTransition,
  ElementRootTransitionProp,
} from '../../animation/customGraphicTransition'
import { stopPreviousKeyframeAnimationAndRestore } from '../../animation/customGraphicKeyframeAnimation'
import { createOrUpdatePatternFromDecal } from '../../util/decal'
import { setDefaultStateProxy } from '../../util/states'
import DataDiffer from '../../data/DataDiffer'
import SeriesModel from '../../model/Series'
import { createClipPath } from './helper/createClipPathFromCoordSys'

const DEFAULT_TRANSITION: ElementRootTransitionProp[] = ['x', 'y']

const EMPHASIS = 'emphasis' as const
const NORMAL = 'normal' as const
const BLUR = 'blur' as const
const SELECT = 'select' as const
const STATES = [NORMAL, EMPHASIS, BLUR, SELECT] as const
const GROUP_DIFF_PREFIX = 'p\0\0'

const prepareCustoms: Dictionary<PrepareCustomInfo> = {
  cartesian2d: prepareCartesian2d,
}

type AttachedTxInfo = {
  isLegacy: boolean
  normal: {
    cfg: ElementTextConfig
    conOpt: CustomElementOption | false
  }
  emphasis: {
    cfg: ElementTextConfig
    conOpt: CustomElementOptionOnState
  }
  blur: {
    cfg: ElementTextConfig
    conOpt: CustomElementOptionOnState
  }
  select: {
    cfg: ElementTextConfig
    conOpt: CustomElementOptionOnState
  }
}
const attachedTxInfoTmp = {
  normal: {},
  emphasis: {},
  blur: {},
  select: {},
} as AttachedTxInfo

class CustomSeriesView extends ChartView {
  static type = 'custom'
  readonly type = CustomSeriesView.type

  private _data: SeriesData
  private _progressiveEls: Element[]

  render(
    customSeriesModel: CustomSeriesModel,
    piModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void {
    this._progressiveEls = null
    const oldData = this._data
    const data = customSeriesModel.getData()
    const group = this.group
    const renderItem = makeRenderItem(customSeriesModel, data, piModel, api)
    if (!oldData) {
      group.removeAll()
    }
    data
      .diff(oldData)
      .add(function (newIdx) {

        createOrUpdateItem(
          api,
          null,
          newIdx,
          renderItem(newIdx, payload),
          customSeriesModel,
          group,
          data
        )
      })
      .remove(function (oldIdx) {
        const el = oldData.getItemGraphicEl(oldIdx)
        el &&
          applyLeaveTransition(
            el,
            customInnerStore(el).option,
            customSeriesModel
          )
      })
      .update(function (newIdx, oldIdx) {
        const oldEl = oldData.getItemGraphicEl(oldIdx)

        createOrUpdateItem(
          api,
          oldEl,
          newIdx,
          renderItem(newIdx, payload),
          customSeriesModel,
          group,
          data
        )
      })
      .execute()
    const clipPath = customSeriesModel.get('clip', true)
      ? createClipPath(
          customSeriesModel.coordinateSystem,
          false,
          customSeriesModel
        )
      : null
    if (clipPath) {
      group.setClipPath(clipPath)
    } else {
      group.removeClipPath()
    }

    this._data = data
  }
}

function makeRenderItem(
  customSeries: CustomSeriesModel,
  data: SeriesData<CustomSeriesModel>,
  piModel: GlobalModel,
  api: ExtensionAPI
) {
  const renderItem = customSeries.get('renderItem')
  const coordSys = customSeries.coordinateSystem
  let prepareResult = {} as ReturnType<PrepareCustomInfo>
  if (coordSys) {
    prepareResult = coordSys.prepareCustoms
      ? coordSys.prepareCustoms(coordSys)
      : prepareCustoms[coordSys.type](coordSys)
  }
  const userAPI = defaults(
    {
      getWidth: api.getWidth,
      getHeight: api.getHeight,
      getZr: api.getZr,
      value: value,
    },
    prepareResult?.api || {}
  )
  const userParams: CustomSeriesRenderItemParams = {
    context: {},
    seriesId: customSeries.id,
    seriesName: customSeries.name,
    seriesIndex: customSeries.seriesIndex,
    coordSys: prepareResult.coordSys,
  } as CustomSeriesRenderItemParams

  let currDataIndexInside: number

  function value(dim?: DimensionLoose, dataIndexInside?: number): ParsedValue {
    dataIndexInside == null && (dataIndexInside = currDataIndexInside)
    return data
      .getStore()
      .get(data.getDimensionIndex(dim || 0), dataIndexInside)
  }
  return function (
    dataIndexInside: number,
    payload: Payload
  ): CustomElementOption {
    currDataIndexInside = dataIndexInside
    return (
      renderItem &&
      renderItem(
        defaults(
          {
            dataIndexInside: dataIndexInside,
            dataIndex: data.getRawIndex(dataIndexInside),
            actionType: payload ? payload.type : null,
          },
          userParams
        ),
        userAPI
      )
    )
  }
}

function createOrUpdateItem(
  api: ExtensionAPI,
  existsEl: Element,
  dataIndex: number,
  elOption: CustomRootElementOption,
  seriesModel: CustomSeriesModel,
  group: ViewRootGroup,
  data: SeriesData<CustomSeriesModel>
) {
  if (!elOption) {
    group.remove(existsEl)
    return
  }
  const el = doCreateOrUpdateEl(
    api,
    existsEl,
    dataIndex,
    elOption,
    seriesModel,
    group
  )
  el && data.setItemGraphicEl(dataIndex, el)

  //TODO
  return el
}

function doCreateOrUpdateEl(
  api: ExtensionAPI,
  existsEl: Element,
  dataIndex: number,
  elOption: CustomElementOption,
  seriesModel: CustomSeriesModel,
  group: ViewRootGroup
): Element {
  let toBeReplacedIdx = -1
  const oldEl = existsEl
  if (existsEl && doesElNeedRecreate(existsEl, elOption, seriesModel)) {
    toBeReplacedIdx = indexOf(group.childrenRef(), existsEl)
    existsEl = null
  }

  const isInit = !existsEl
  let el = existsEl
  if (!el) {
    el = createEl(elOption)
    if (oldEl) {
      copyElement(oldEl, el)
    }
  } else {
    el.clearStates()
  }

  if ((elOption as CustomBaseZRPathOption).morph === false) {
    ;(el as PIElement).disableMorphing = true
  } else if ((el as PIElement).disableMorphing) {
    ;(el as PIElement).disableMorphing = false
  }

  attachedTxInfoTmp.normal.cfg =
    attachedTxInfoTmp.normal.conOpt =
    attachedTxInfoTmp.emphasis.cfg =
    attachedTxInfoTmp.emphasis.conOpt =
    attachedTxInfoTmp.blur.cfg =
    attachedTxInfoTmp.blur.conOpt =
    attachedTxInfoTmp.select.cfg =
    attachedTxInfoTmp.select.conOpt =
      null
  attachedTxInfoTmp.isLegacy = false

  updateElNormal(
    api,
    el,
    dataIndex,
    elOption,
    attachedTxInfoTmp,
    seriesModel,
    isInit
  )
  hasOwn(elOption, 'info') && (customInnerStore(el).info = elOption.info)
  for (let i = 0; i < STATES.length; i++) {
    const stateName = STATES[i]
    if (stateName !== NORMAL) {
      const otherStateOpt = retrieveStateOption(elOption, stateName)
      const otherStyleOpt = retrieveStyleOptionOnState(
        elOption,
        otherStateOpt,
        stateName
      )
      updateElOnState(
        stateName,
        el,
        otherStateOpt,
        otherStyleOpt,
        attachedTxInfoTmp
      )
    }
  }

  updateZ(el, elOption, seriesModel)

  if (elOption.type === 'group') {
    mergeChildren(
      api,
      el as graphicUtil.Group,
      dataIndex,
      elOption as CustomGroupOption,
      seriesModel
    )
  }
  if (toBeReplacedIdx >= 0) {
    group.replaceAt(el, toBeReplacedIdx)
  } else {
    group.add(el)
  }
  return el
}

function mergeChildren(
  api: ExtensionAPI,
  el: graphicUtil.Group,
  dataIndex: number,
  elOption: CustomGroupOption,
  seriesModel: CustomSeriesModel
): void {
  const newChildren = elOption.children
  const newLen = newChildren ? newChildren.length : 0
  const mergeChildren = elOption.$mergeChildren
  // `diffChildrenByName` has been deprecated.
  const byName = mergeChildren === 'byName' || elOption.diffChildrenByName
  const notMerge = mergeChildren === false

  // For better performance on roam update, only enter if necessary.
  if (!newLen && !byName && !notMerge) {
    return
  }
  if (byName) {
    diffGroupChildren({
      api: api,
      oldChildren: el.children() || [],
      newChildren: (newChildren as CustomElementOption[]) || [],
      dataIndex: dataIndex,
      seriesModel: seriesModel,
      group: el,
    })
    return
  }

  notMerge && el.removeAll()

  // Mapping children of a group simply by index, which
  // might be better performance.
  let index = 0
  for (; index < newLen; index++) {
    const newChild = newChildren[index]
    const oldChild = el.childAt(index)
    if (newChild) {
      if (newChild.ignore == null) {
        // The old child is set to be ignored if null (see comments
        // below). So we need to set ignore to be false back.
        newChild.ignore = false
      }
      doCreateOrUpdateEl(
        api,
        oldChild,
        dataIndex,
        newChild as CustomElementOption,
        seriesModel,
        el
      )
    } else {
      // If the new element option is null, it means to remove the old
      // element. But we cannot really remove the element from the group
      // directly, because the element order may not be stable when this
      // element is added back. So we set the element to be ignored.
      oldChild.ignore = true
    }
  }
  for (let i = el.childCount() - 1; i >= index; i--) {
    const child = el.childAt(i)
    removeChildFromGroup(el, child, seriesModel)
  }
}

function removeChildFromGroup(
  group: graphicUtil.Group,
  child: Element,
  seriesModel: SeriesModel
) {
  // Do not support leave elements that are not mentioned in the latest
  // `renderItem` return. Otherwise users may not have a clear and simple
  // concept that how to control all of the elements.
  child &&
    applyLeaveTransition(child, customInnerStore(group).option, seriesModel)
}

type DiffGroupContext = {
  api: ExtensionAPI
  oldChildren: Element[]
  newChildren: CustomElementOption[]
  dataIndex: number
  seriesModel: CustomSeriesModel
  group: graphicUtil.Group
}

function diffGroupChildren(context: DiffGroupContext) {
  new DataDiffer(
    context.oldChildren,
    context.newChildren,
    getKey,
    getKey,
    context
  )
    .add(processAddUpdate)
    .update(processAddUpdate)
    .remove(processRemove)
    .execute()
}

function getKey(item: Element, idx: number): string {
  const name = item && item.name
  return name != null ? name : GROUP_DIFF_PREFIX + idx
}

function processAddUpdate(
  this: DataDiffer<DiffGroupContext>,
  newIndex: number,
  oldIndex?: number
): void {
  const context = this.context
  const childOption = newIndex != null ? context.newChildren[newIndex] : null
  const child = oldIndex != null ? context.oldChildren[oldIndex] : null

  doCreateOrUpdateEl(
    context.api,
    child,
    context.dataIndex,
    childOption,
    context.seriesModel,
    context.group
  )
}

function processRemove(
  this: DataDiffer<DiffGroupContext>,
  oldIndex: number
): void {
  const context = this.context
  const child = context.oldChildren[oldIndex]
  child &&
    applyLeaveTransition(
      child,
      customInnerStore(child).option,
      context.seriesModel
    )
}

function doesElNeedRecreate(
  el: Element,
  elOption: CustomElementOption,
  seriesModel: CustomSeriesModel
): boolean {
  const elInner = customInnerStore(el)
  const elOptionType = elOption.type
  const elOptionShape = (elOption as CustomBaseZRPathOption)?.shape
  const elOptionStyle = (elOption as CustomDisplayableOption)?.style
  return (
    seriesModel.isUniversalTransitionEnabled() ||
    (elOptionType != null && elOptionType !== elInner.customGraphicType) ||
    (elOptionType === 'path' &&
      hasOwnPathData(elOptionShape as CustomSVGPathOption['shape']) &&
      getPathData(elOptionShape as CustomSVGPathOption['shape']) !==
        elInner.customPathData) ||
    (elOptionType === 'image' &&
      hasOwn(elOptionStyle, 'image') &&
      (elOptionStyle as CustomImageOption['style']).image !==
        elInner.customImagePath)
  )
}

function createEl(elOption: CustomElementOption): Element {
  const graphicType = elOption.type
  let el

  // Those graphic elements are not shapes. They should not be
  // overwritten by users, so do them first.
  if (graphicType === 'path') {
    const shape = (elOption as CustomSVGPathOption).shape
    // Using pathRect brings convenience to users sacle svg path.
    const pathRect =
      shape.width != null && shape.height != null
        ? ({
            x: shape.x || 0,
            y: shape.y || 0,
            width: shape.width,
            height: shape.height,
          } as RectLike)
        : null
    const pathData = getPathData(shape)
    // Path is also used for icon, so layout 'center' by default.
    el = graphicUtil.makePath(
      pathData,
      null,
      pathRect,
      shape.layout || 'center'
    )
    customInnerStore(el).customPathData = pathData
  } else if (graphicType === 'image') {
    el = new graphicUtil.Image({})
    customInnerStore(el).customImagePath = (
      elOption as CustomImageOption
    ).style.image
  } else if (graphicType === 'text') {
    el = new graphicUtil.Text({})
    // customInnerStore(el).customText = (elOption.style as TextStyleProps).text;
  } else if (graphicType === 'group') {
    el = new graphicUtil.Group()
  } else {
    const Clz = graphicUtil.getShapeClass(graphicType)
    el = new Clz()
  }
  customInnerStore(el).customGraphicType = graphicType
  el.name = elOption.name

  // Compat ec4: the default z2 lift is 1. If changing the number,
  // some cases probably be broken: hierarchy layout along z, like circle packing,
  // where emphasis only intending to modify color/border rather than lift z2.
  ;(el as PIElement).z2EmphasisLift = 1
  ;(el as PIElement).z2SelectLift = 1

  return el
}

interface InnerCustomZRPathOptionStyle extends PathStyleProps {
  __decalPattern: PatternObject
}

function updateElNormal(
  api: ExtensionAPI,
  el: Element,
  dataIndex: number,
  elOption: CustomElementOption,
  attachedTxInfo: AttachedTxInfo,
  seriesModel: CustomSeriesModel,
  isInit: boolean
): void {
  stopPreviousKeyframeAnimationAndRestore(el)

  const txCfgOpt = attachedTxInfo && attachedTxInfo.normal.cfg
  if (txCfgOpt) {
    // PENDING: whether use user object directly rather than clone?
    // TODO:5.0 textConfig transition animation?
    el.setTextConfig(txCfgOpt)
  }

  // Default transition ['x', 'y']
  if (elOption && elOption.transition == null) {
    elOption.transition = DEFAULT_TRANSITION
  }

  // Do some normalization on style.
  const styleOpt = elOption && (elOption as CustomDisplayableOption).style

  if (styleOpt) {
    if (el.type === 'text') {
      const textOptionStyle = styleOpt as TextStyleProps
      // Compatible with ec4: if `textFill` or `textStroke` exists use them.
      hasOwn(textOptionStyle, 'textFill') &&
        (textOptionStyle.fill = (textOptionStyle as any).textFill)
      hasOwn(textOptionStyle, 'textStroke') &&
        (textOptionStyle.stroke = (textOptionStyle as any).textStroke)
    }

    let decalPattern
    const decalObj = isPath(el)
      ? (styleOpt as CustomBaseZRPathOption['style']).decal
      : null
    if (api && decalObj) {
      ;(decalObj as InnerDecalObject).dirty = true
      decalPattern = createOrUpdatePatternFromDecal(decalObj, api)
    }
    // Always overwrite in case user specify this prop.
    ;(styleOpt as InnerCustomZRPathOptionStyle).__decalPattern = decalPattern
  }

  if (isDisplayable(el)) {
    if (styleOpt) {
      const decalPattern = (styleOpt as InnerCustomZRPathOptionStyle)
        .__decalPattern
      if (decalPattern) {
        ;(styleOpt as PathStyleProps).decal = decalPattern
      }
    }
  }

  //更新元素shape，style，animation在这
  applyUpdateTransition(el, elOption, seriesModel, {
    dataIndex,
    isInit,
    clearStyle: true,
  })

  // applyKeyframeAnimation(el, elOption.keyframeAnimation, seriesModel)
}

function updateElOnState(
  state: DisplayStateNonNormal,
  el: Element,
  elStateOpt: CustomElementOptionOnState,
  styleOpt: CustomElementOptionOnState['style'],
  attachedTxInfo: AttachedTxInfo
): void {
  const elDisplayable = el.isGroup ? null : (el as Displayable)
  const txCfgOpt = attachedTxInfo && attachedTxInfo[state].cfg

  // PENDING:5.0 support customize scale change and transition animation?

  if (elDisplayable) {
    // By default support auto lift color when hover whether `emphasis` specified.
    const stateObj = elDisplayable.ensureState(state)
    if (styleOpt === false) {
      const existingEmphasisState = elDisplayable.getState(state)
      if (existingEmphasisState) {
        existingEmphasisState.style = null
      }
    } else {
      // style is needed to enable default emphasis.
      stateObj.style = styleOpt || null
    }
    // If `elOption.styleEmphasis` or `elOption.emphasis.style` is `false`,
    // remove hover style.
    // If `elOption.textConfig` or `elOption.emphasis.textConfig` is null/undefined, it does not
    // make sense. So for simplicity, we do not ditinguish `hasOwnProperty` and null/undefined.
    if (txCfgOpt) {
      stateObj.textConfig = txCfgOpt
    }

    setDefaultStateProxy(elDisplayable)
  }
}

function updateZ(
  el: Element,
  elOption: CustomElementOption,
  seriesModel: CustomSeriesModel
): void {
  // Group not support textContent and not support z yet.
  if (el.isGroup) {
    return
  }

  const elDisplayable = el as Displayable
  const currentZ = seriesModel.currentZ
  const currentZLevel = seriesModel.currentZLevel
  // Always erase.
  elDisplayable.z = currentZ
  elDisplayable.zlevel = currentZLevel
  // z2 must not be null/undefined, otherwise sort error may occur.
  const optZ2 = (elOption as CustomDisplayableOption).z2
  optZ2 != null && (elDisplayable.z2 = optZ2 || 0)

  for (let i = 0; i < STATES.length; i++) {
    updateZForEachState(elDisplayable, elOption, STATES[i])
  }
}

function updateZForEachState(
  elDisplayable: Displayable,
  elOption: CustomDisplayableOption,
  state: DisplayState
): void {
  const isNormal = state === NORMAL
  const elStateOpt = isNormal
    ? elOption
    : retrieveStateOption(
        elOption as CustomElementOption,
        state as DisplayStateNonNormal
      )
  const optZ2 = elStateOpt ? elStateOpt.z2 : null
  let stateObj
  if (optZ2 != null) {
    // Do not `ensureState` until required.
    stateObj = isNormal ? elDisplayable : elDisplayable.ensureState(state)
    stateObj.z2 = optZ2 || 0
  }
}

function retrieveStateOption(
  elOption: CustomElementOption,
  state: DisplayStateNonNormal
): CustomElementOptionOnState {
  return !state
    ? elOption
    : elOption
    ? (elOption as CustomDisplayableOption)[state]
    : null
}

function retrieveStyleOptionOnState(
  stateOptionNormal: CustomElementOption,
  stateOption: CustomElementOptionOnState,
  state: DisplayStateNonNormal
): CustomElementOptionOnState['style'] {
  let style = stateOption && stateOption.style
  if (style == null && state === EMPHASIS && stateOptionNormal) {
    style = (stateOptionNormal as CustomDisplayableOption).styleEmphasis
  }
  return style
}

function isPath(el: Element): el is Path {
  return el instanceof Path
}

function isDisplayable(el: Element): el is Displayable {
  return el instanceof Displayable
}

function copyElement(sourceEl: Element, targetEl: Element) {
  targetEl.copyTransform(sourceEl)
  if (isDisplayable(targetEl) && isDisplayable(sourceEl)) {
    targetEl.setStyle(sourceEl.style)
    targetEl.z = sourceEl.z
    targetEl.z2 = sourceEl.z2
    targetEl.zlevel = sourceEl.zlevel
    targetEl.invisible = sourceEl.invisible
    targetEl.ignore = sourceEl.ignore

    if (isPath(targetEl) && isPath(sourceEl)) {
      targetEl.setShape(sourceEl.shape)
    }
  }
}

function getPathData(shape: CustomSVGPathOption['shape']): string {
  // "d" follows the SVG convention.
  return shape && (shape.pathData || shape.d)
}

function hasOwnPathData(shape: CustomSVGPathOption['shape']): boolean {
  return shape && (hasOwn(shape, 'pathData') || hasOwn(shape, 'd'))
}

export default CustomSeriesView
