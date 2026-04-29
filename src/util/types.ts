import { AnimationEasing } from 'zrender/src/animation/easing'
import { ImageStyleProps } from 'zrender/src/graphic/Image'
import { LinearGradientObject } from 'zrender/src/graphic/LinearGradient'
import { PathStyleProps } from 'zrender/src/graphic/Path'
import { PatternObject } from 'zrender/src/graphic/Pattern'
import { RadialGradientObject } from 'zrender/src/graphic/RadialGradient'
import { TextStyleProps } from 'zrender/src/graphic/Text'
import { TSpanStyleProps } from 'zrender/src/graphic/TSpan'
import GlobalModel from '../model/Global'
import ExtensionAPI from '../core/ExtensionAPI'
import { TaskPlanCallbackReturn, TaskProgressParams } from '../core/Task'
import SeriesModel from '../model/Series'
import type {
  Dictionary,
  ElementEventName,
  ImageLike,
  TextAlign,
  TextVerticalAlign,
} from 'zrender/src/core/types'
import { Source } from '../data/Source'
import SeriesData from '../data/SeriesData'
import { HashMap } from 'zrender/src/core/util'
import {
  Element,
  ElementEvent,
  ElementTextConfig,
  Group,
  RectLike,
} from 'zrender'
import { createHashMap } from 'zrender/src/core/util'

export type RendererType = 'canvas' | 'svg'

//从zrender拿出来的type
export type ColorString = string
export type ZRColor =
  | ColorString
  | LinearGradientObject
  | RadialGradientObject
  | PatternObject
export type ZRLineType = 'solid' | 'dotted' | 'dashed' | number | number[]

export type ZRFontStyle = 'normal' | 'italic' | 'oblique'
export type ZRFontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number

export type ZREasing = AnimationEasing

export type ZRTextAlign = TextAlign
export type ZRTextVerticalAlign = TextVerticalAlign

export type ZRElementEvent = ElementEvent

export type ZRRectLike = RectLike

export type ZRStyleProps =
  | PathStyleProps
  | ImageStyleProps
  | TSpanStyleProps
  | TextStyleProps
export type ZRElementEventName = ElementEventName | 'globalout'

export type ComponentFullType = string
export type ComponentMainType = string
export type ComponentSubType = Exclude<ComponentOption['type'], undefined>

export type DimensionIndex = number
export type DimensionIndexLoose = DimensionIndex | string
export type DimensionName = string
export type DimensionLoose = DimensionName | DimensionIndexLoose
export type DimensionType = DataStoreDimensionType

export const VISUAL_DIMENSIONS = createHashMap<
  number,
  keyof DataVisualDimensions
>(['tooltip', 'label', 'itemName', 'itemId', 'itemGroupId', 'seriesName'])

export interface DataVisualDimensions {
  // can be set as false to directly to prevent this data
  // dimension from displaying in the default tooltip.
  // see `Series.ts#formatTooltip`.
  tooltip?: DimensionIndex | false
  label?: DimensionIndex
  itemName?: DimensionIndex
  itemId?: DimensionIndex
  itemGroupId?: DimensionIndex
  seriesName?: DimensionIndex
}

export type ParsedValue = ParsedValueNumeric | OrdinalRawValue
export type ParsedValueNumeric = number | OrdinalNumber

export type ScaleDataValue = ParsedValueNumeric | OrdinalRawValue | Date

export interface ScaleTick {
  level?: number
  value: number
}

export interface TimeScaleTick extends ScaleTick {
  level?: number
}

export interface OrdinalScaleTick extends ScaleTick {
  value: number
}

export type OrdinalRawValue = string | number
export type OrdinalNumber = number

export const VER_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==' as const
export const HOR_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC' as const

export interface ComponentTypeInfo {
  main: ComponentMainType // Never null/undefined. `''` represents absence.
  sub: ComponentSubType // Never null/undefined. `''` represents absence.
}

export interface PIElement extends Element {
  onHoverStateChange?: (toState: DisplayState) => void
  highDownSilentOnTouch?: boolean
  hoverState?: 0 | 1 | 2
  selected?: boolean

  z2EmphasisLift?: number
  z2SelectLift?: number
  disableMorphing?: boolean
}

export interface ViewRootGroup extends Group {
  __ComponentInfo?: {
    mainType: string
    index: number
  }
}

export interface PIElementEvent {
  type: ZRElementEventName
  event?: ElementEvent
}

export type ModelOption = any

export type DisplayState = 'normal' | 'emphasis' | 'blur' | 'select'
export type DisplayStateNonNormal = Exclude<DisplayState, 'normal'>
export type DisplayStateHostOption = {
  emphasis?: Dictionary<any>
  [key: string]: any
}
export type OptionId = string | number
export type OptionName = string | number

export type DecalDashArrayX = number | (number | number[])[]
export type DecalDashArrayY = number | number[]
export interface DecalObject {
  // 'image', 'triangle', 'diamond', 'pin', 'arrow', 'line', 'rect', 'roundRect', 'square', 'circle'
  symbol?: string | string[]

  // size relative to the dash bounding box; valued from 0 to 1
  symbolSize?: number
  // keep the aspect ratio and use the smaller one of width and height as bounding box size
  symbolKeepAspect?: boolean

  // foreground color of the pattern
  color?: string
  // background color of the pattern; default value is 'none' (same as 'transparent') so that the underlying series color is displayed
  backgroundColor?: string

  // dash-gap pattern on x
  dashArrayX?: DecalDashArrayX
  // dash-gap pattern on y
  dashArrayY?: DecalDashArrayY

  // in radians; valued from -Math.PI to Math.PI
  rotation?: number

  // boundary of largest tile width
  maxTileWidth?: number
  // boundary of largest tile height
  maxTileHeight?: number
}

export interface ComponentOption {
  mainType?: string

  type?: string

  id?: OptionId
  name?: OptionName

  z?: number
  zlevel?: number
}

export type BlurScope = 'coordinateSystem' | 'series' | 'global'

export type InnerFocus =
  | DefaultEmphasisFocus
  | ArrayLike<number>
  | Dictionary<ArrayLike<number>>

export interface DefaultStatesMixin {
  // FIXME
  emphasis?: any
  select?: any
  blur?: any
}

export type DefaultEmphasisFocus = 'none' | 'self' | 'series'

export interface DefaultStatesMixinEmphasis {
  /**
   * self: Focus self and blur all others.
   * series: Focus series and blur all other series.
   */
  focus?: DefaultEmphasisFocus
}

export interface StatesMixinBase {
  emphasis?: unknown
  select?: unknown
  blur?: unknown
}

export interface StatesOptionMixin<
  StateOption,
  StatesMixin extends StatesMixinBase
> {
  /**
   * Emphasis states
   */
  emphasis?: StateOption &
    StatesMixin['emphasis'] & {
      /**
       * Scope of blurred element when focus.
       *
       * coordinateSystem: blur others in the same coordinateSystem
       * series: blur others in the same series
       * global: blur all others
       *
       * Default to be coordinate system.
       */
      blurScope?: BlurScope

      /**
       * If emphasis state is disabled.
       */
      disabled?: boolean
    }
  /**
   * Select states
   */
  select?: StateOption &
    StatesMixin['select'] & {
      disabled?: boolean
    }
  /**
   * Blur states.
   */
  blur?: StateOption & StatesMixin['blur']
}

const UNDEFINED = 'undefined'

export const CtorUint32Array =
  typeof Uint32Array === UNDEFINED ? Array : Uint32Array
export const CtorUint16Array =
  typeof Uint16Array === UNDEFINED ? Array : Uint16Array
export const CtorInt32Array =
  typeof Int32Array === UNDEFINED ? Array : Int32Array
export const CtorFloat64Array =
  typeof Float64Array === UNDEFINED ? Array : Float64Array

const dataCtors = {
  float: CtorFloat64Array,
  int: CtorInt32Array,
  ordinal: Array,
  number: Array,
  time: CtorFloat64Array,
} as const

export type DataStoreDimensionType = keyof typeof dataCtors

export type DimensionDefinition = {
  type?: DataStoreDimensionType
  name?: DimensionName
  displayName?: string
}

export type DimensionDefinitionLoose =
  | DimensionDefinition['name']
  | DimensionDefinition

export type OptionDataValue = string | number | Date

export const SOURCE_FORMAT_ORIGINAL = 'original' as const
export const SOURCE_FORMAT_ARRAY_ROWS = 'arrayRows' as const
export const SOURCE_FORMAT_OBJECT_ROWS = 'objectRows' as const
export const SOURCE_FORMAT_KEYED_COLUMNS = 'keyedColumns' as const
export const SOURCE_FORMAT_TYPED_ARRAY = 'typedArray' as const
export const SOURCE_FORMAT_UNKNOWN = 'unknown' as const

export type SourceFormat =
  | typeof SOURCE_FORMAT_ORIGINAL
  | typeof SOURCE_FORMAT_ARRAY_ROWS
  | typeof SOURCE_FORMAT_OBJECT_ROWS
  | typeof SOURCE_FORMAT_KEYED_COLUMNS
  | typeof SOURCE_FORMAT_TYPED_ARRAY
  | typeof SOURCE_FORMAT_UNKNOWN

export const SERIES_LAYOUT_BY_COLUMN = 'column' as const
export const SERIES_LAYOUT_BY_ROW = 'row' as const

export type SeriesLayoutBy =
  | typeof SERIES_LAYOUT_BY_COLUMN
  | typeof SERIES_LAYOUT_BY_ROW

export type OptionSourceHeader = boolean | 'auto' | number

export type SeriesDataType = 'main' | 'node' | 'edge'

export type OptionSourceData<
  VAL extends OptionDataValue = OptionDataValue,
  ORIITEM extends OptionDataItemOriginal<VAL> = OptionDataItemOriginal<VAL>
> =
  | OptionSourceDataOriginal<VAL, ORIITEM>
  | OptionSourceDataObjectRows<VAL>
  | OptionSourceDataArrayRows<VAL>
  | OptionSourceDataKeyedColumns<VAL>
  | OptionSourceDataTypedArray

export type OptionDataItemOriginal<
  VAL extends OptionDataValue = OptionDataValue
> = VAL | VAL[] | OptionDataItemObject<VAL>

export type OptionSourceDataOriginal<
  VAL extends OptionDataValue = OptionDataValue,
  ORIITEM extends OptionDataItemOriginal<VAL> = OptionDataItemOriginal<VAL>
> = ArrayLike<ORIITEM>

export type OptionSourceDataObjectRows<
  VAL extends OptionDataValue = OptionDataValue
> = Array<Dictionary<VAL>>

export type OptionSourceDataArrayRows<
  VAL extends OptionDataValue = OptionDataValue
> = Array<Array<VAL>>

export type OptionSourceDataKeyedColumns<
  VAL extends OptionDataValue = OptionDataValue
> = Dictionary<ArrayLike<VAL>>

export type OptionSourceDataTypedArray = ArrayLike<number>

export type OptionDataItem =
  | OptionDataValue
  | Dictionary<OptionDataValue>
  | OptionDataValue[]
  // FIXME: In some case (markpoint in geo (geo-map.html)), dataItem is {coord: [...]}
  | OptionDataItemObject<OptionDataValue>

export interface OptionEncodeVisualDimensions {
  tooltip?: OptionEncodeValue
  label?: OptionEncodeValue
  itemName?: OptionEncodeValue
  itemId?: OptionEncodeValue
  seriesName?: OptionEncodeValue
  itemGroupId?: OptionEncodeValue
}

export interface OptionEncode extends OptionEncodeVisualDimensions {
  [coordDim: string]: OptionEncodeValue | undefined
}

export type EncodeDefaulter = (source: Source, dimCount: number) => OptionEncode

export interface CallbackDataParams {
  // component main type
  componentType: string
  // component sub type
  componentSubType: string
  componentIndex: number
  // series component sub type
  seriesType?: string
  // series component index (the alias of `componentIndex` for series)
  seriesIndex?: number
  seriesId?: string
  seriesName?: string
  name: string
  dataIndex: number
  data: OptionDataItem
  dataType?: SeriesDataType
  value: OptionDataItem | OptionDataValue
  color?: ZRColor
  borderColor?: string
  dimensionNames?: DimensionName[]
  // encode?: DimensionUserOuputEncode;
  // marker?: TooltipMarker;
  // status?: DisplayState;
  dimensionIndex?: number
  percent?: number // Only for chart like 'pie'

  // Param name list for mapping `a`, `b`, `c`, `d`, `e`
  $vars: string[]
}

export interface DecalObject {
  // 'image', 'triangle', 'diamond', 'pin', 'arrow', 'line', 'rect', 'roundRect', 'square', 'circle'
  symbol?: string | string[]

  // size relative to the dash bounding box; valued from 0 to 1
  symbolSize?: number
  // keep the aspect ratio and use the smaller one of width and height as bounding box size
  symbolKeepAspect?: boolean

  // foreground color of the pattern
  color?: string
  // background color of the pattern; default value is 'none' (same as 'transparent') so that the underlying series color is displayed
  backgroundColor?: string

  // dash-gap pattern on x
  dashArrayX?: DecalDashArrayX
  // dash-gap pattern on y
  dashArrayY?: DecalDashArrayY

  // in radians; valued from -Math.PI to Math.PI
  rotation?: number

  // boundary of largest tile width
  maxTileWidth?: number
  // boundary of largest tile height
  maxTileHeight?: number
}

export interface InnerDecalObject extends DecalObject {
  // Mark dirty when object may be changed.
  // The record in WeakMap will be deleted.
  dirty?: boolean
}

export type ComponentLayoutMode = {
  // Only support 'box' now.
  type?: 'box'
  ignoreSize?: boolean | boolean[]
}

export type OptionEncodeValue = DimensionLoose | DimensionLoose[]

export type OptionDataItemObject<T> = {
  id?: OptionId
  name?: OptionName
  groupId?: OptionId
  value?: T[] | T
  selected?: boolean
}

export interface UniversalTransitionOption {
  enabled?: boolean
  delay?: (index: number, count: number) => number
  divideShape?: 'clone' | 'split'
  seriesKey?: string | string[]
}

export interface SeriesOption<
  StateOption = unknown,
  StatesMixin extends StatesMixinBase = DefaultStatesMixin
> extends ComponentOption,
    AnimationOptionMixin,
    StatesOptionMixin<StateOption, StatesMixin> {
  mainType?: 'series'
  silent?: boolean
  dataGroupId?: OptionId
  data?: unknown

  progressive?: number | false
  progressiveThreshold?: number
  progressiveChunkMode?: 'mod'
  selectedMap?: Dictionary<boolean> | 'all'
  coordinateSystem?: string

  universalTransition?: boolean | UniversalTransitionOption
  selectedMode?: 'single' | 'multiple' | 'series' | boolean
}

export interface SeriesOnCartesinaOptionMixin {
  xAxisIndex?: number
  yAxisIndex?: number

  xAxisId?: string
  yAxisId?: string
}

export interface SeriesLargeOptionMixin {
  large?: boolean
  largeThreshold?: number
}

export interface SeriesStackOptionMixin {
  stack?: string
  stackStrategy?: 'samesign' | 'all' | 'positive' | 'negative'
}

export interface SeriesEncodeOptionMixin {
  datasetIndex?: number
  datasetId?: string | number
  seriesLayoutBy?: SeriesLayoutBy
  sourceHeader?: OptionSourceHeader
  dimensions?: DimensionDefinitionLoose[]
  encode?: OptionEncode
}

export type SeriesEncodableModel = SeriesModel<
  SeriesOption & SeriesEncodeOptionMixin
>

export interface ColorPaletteOptionMixin {
  color?: ZRColor | ZRColor[]
  colorLayer?: ZRColor[][]
}

export interface BoxLayoutOptionMixin {
  width?: number | string
  height?: number | string
  top?: number | string
  right?: number | string
  bottom?: number | string
  left?: number | string
}

export interface BorderOptionMixin {
  borderColor?: ZRColor
  borderWidth?: number
  borderType?: ZRLineType
  borderCap?: CanvasLineCap
  borderJoin?: CanvasLineJoin
  borderDashOffset?: number
  borderMiterLimit?: number
}

export type AnimationDelayCallbackParam = {
  count: number
  index: number
}
export type AnimationDurationCallback = (idx: number) => number
export type AnimationDelayCallback = (
  idx: number,
  params?: AnimationDelayCallbackParam
) => number

export interface AnimationOption {
  duration?: number
  easing?: AnimationEasing
  delay?: number
  // additive?: boolean
}

export interface AnimationOptionMixin {
  /**
   * If enable animation
   */
  animation?: boolean
  /**
   * Disable animation when the number of elements exceeds the threshold
   */
  animationThreshold?: number
  // For init animation
  /**
   * Duration of initialize animation.
   * Can be a callback to specify duration of each element
   */
  animationDuration?: number | AnimationDurationCallback
  /**
   * Easing of initialize animation
   */
  animationEasing?: AnimationEasing
  /**
   * Delay of initialize animation
   * Can be a callback to specify duration of each element
   */
  animationDelay?: number | AnimationDelayCallback
  // For update animation
  /**
   * Delay of data update animation.
   * Can be a callback to specify duration of each element
   */
  animationDurationUpdate?: number | AnimationDurationCallback
  /**
   * Easing of data update animation.
   */
  animationEasingUpdate?: AnimationEasing
  /**
   * Delay of data update animation.
   * Can be a callback to specify duration of each element
   */
  animationDelayUpdate?: number | AnimationDelayCallback
}

export interface RoamOptionMixin {
  /**
   * If enable roam. can be specified 'scale' or 'move'
   */
  roam?: boolean | 'pan' | 'move' | 'zoom' | 'scale'
  /**
   * Current center position.
   */
  center?: (number | string)[]
  /**
   * Current zoom level. Default is 1
   */
  zoom?: number

  scaleLimit?: {
    min?: number
    max?: number
  }
}

export { Dictionary }

export type LayoutOrient = 'vertical' | 'horizontal'
export type HorizontalAlign = 'left' | 'center' | 'right'
export type VerticalAlign = 'top' | 'middle' | 'bottom'

export interface PIActionEvent extends PIEventData {
  // event type
  type: string
  componentType?: string
  componentIndex?: number
  seriesIndex?: number
  escapeConnect?: boolean
  batch?: PIEventData
}

export interface PIEventData {
  // TODO use unknown
  [key: string]: any
}

export interface EventQueryItem {
  // TODO use unknown
  [key: string]: any
}

interface PayloadItem {
  excludeSeriesId?: OptionId | OptionId[]
  animation?: PayloadAnimationPart
  // TODO use unknown
  [other: string]: any
}

export interface Payload extends PayloadItem {
  type: string
  escapeConnect?: boolean
  [other: string]: any
}

export interface HighlightPayload extends Payload {
  type: 'highlight'
  notBlur?: boolean
}

export interface DownplayPayload extends Payload {
  type: 'downplay'
  notBlur?: boolean
}

export interface PayloadAnimationPart {
  duration?: number
  easing?: AnimationEasing
  delay?: number
}

export interface SelectChangedPayload extends Payload {
  type: 'selectchanged'
  escapeConnect: boolean
  isFromClick: boolean
  fromAction: 'select' | 'unselect' | 'toggleSelected'
  fromActionPayload: Payload
  selected: {
    seriesIndex: number
    dataType?: SeriesDataType
    dataIndex: number[]
  }[]
}

export interface ActionInfo {
  // action type
  type: string
  // If not provided, use the same string of `type`.
  event?: string
  // update method
  update?: string
}
export interface ActionHandler {
  (
    payload: Payload,
    piModel: GlobalModel,
    api: ExtensionAPI
  ): void | PIEventData
}

export interface OptionPreprocessor {
  (option: GanttUnitOption, isTheme: boolean): void
}

export interface NormalizedEventQuery {
  cptQuery: EventQueryItem
  dataQuery: EventQueryItem
  otherQuery: EventQueryItem
}

export type GanttUnitOption = {
  // Exclude these reserved word for `ECOption` to avoid to infer to "any".
  baseOption?: unknown
  options?: unknown
  media?: unknown

  timeline?: ComponentOption | ComponentOption[]
  backgroundColor?: ZRColor
  darkMode?: boolean | 'auto'
  textStyle?: Pick<
    LabelOption,
    'color' | 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'
  >
  useUTC?: boolean

  [key: string]:
    | ComponentOption
    | ComponentOption[]
    | Dictionary<unknown>
    | unknown

  stateAnimation?: AnimationOption
} & AnimationOptionMixin &
  ColorPaletteOptionMixin

export interface GanttBaseOption extends GanttUnitOption {
  baseOption?: GanttUnitOption
}

export interface ShadowOptionMixin {
  shadowBlur?: number
  shadowColor?: ColorString
  shadowOffsetX?: number
  shadowOffsetY?: number
}

export interface TextCommonOption extends ShadowOptionMixin {
  color?: string
  fontStyle?: ZRFontStyle
  fontWeight?: ZRFontWeight
  fontFamily?: string
  fontSize?: number | string
  align?: HorizontalAlign
  verticalAlign?: VerticalAlign
  // @deprecated
  baseline?: VerticalAlign

  opacity?: number

  lineHeight?: number
  backgroundColor?:
    | ColorString
    | {
        image: ImageLike | string
      }
  borderColor?: string
  borderWidth?: number
  borderType?: ZRLineType
  borderDashOffset?: number
  borderRadius?: number | number[]
  padding?: number | number[]

  width?: number | string // Percent
  height?: number
  textBorderColor?: string
  textBorderWidth?: number
  textBorderType?: ZRLineType
  textBorderDashOffset?: number

  textShadowBlur?: number
  textShadowColor?: string
  textShadowOffsetX?: number
  textShadowOffsetY?: number

  tag?: string
}

export interface LabelFormatterCallback<T = CallbackDataParams> {
  (params: T): string
}

export interface LabelOption extends TextCommonOption {
  /**
   * If show label
   */
  show?: boolean
  // TODO: TYPE More specified 'inside', 'insideTop'....
  // x, y can be both percent string or number px.
  position?: ElementTextConfig['position']
  distance?: number
  rotate?: number
  offset?: number[]

  /**
   * Min margin between labels. Used when label has layout.
   */
  // It's minMargin instead of margin is for not breaking the previous code using margin.
  minMargin?: number

  overflow?: TextStyleProps['overflow']
  ellipsis?: TextStyleProps['ellipsis']

  silent?: boolean
  precision?: number | 'auto'
  valueAnimation?: boolean

  // TODO: TYPE not all label support formatter
  // formatter?: string | ((params: CallbackDataParams) => string)

  rich?: Dictionary<TextCommonOption>
}

export interface SeriesLabelOption<
  T extends CallbackDataParams = CallbackDataParams
> extends LabelOption {
  formatter?: string | LabelFormatterCallback<T>
}

export interface ShadowOptionMixin {
  shadowBlur?: number
  shadowColor?: ColorString
  shadowOffsetX?: number
  shadowOffsetY?: number
}

export type SymbolSizeCallback<T> = (
  rawValue: any,
  params: T
) => number | number[]
export type SymbolCallback<T> = (rawValue: any, params: T) => string
export type SymbolRotateCallback<T> = (rawValue: any, params: T) => number
export type SymbolOffsetCallback<T> = (
  rawValue: any,
  params: T
) => string | number | (string | number)[]

export interface SymbolOptionMixin<T = never> {
  /**
   * type of symbol, like `cirlce`, `rect`, or custom path and image.
   */
  symbol?: string | (T extends never ? never : SymbolCallback<T>)
  /**
   * Size of symbol.
   */
  symbolSize?:
    | number
    | number[]
    | (T extends never ? never : SymbolSizeCallback<T>)

  symbolRotate?: number | (T extends never ? never : SymbolRotateCallback<T>)

  symbolKeepAspect?: boolean

  symbolOffset?:
    | string
    | number
    | (string | number)[]
    | (T extends never ? never : SymbolOffsetCallback<T>)
}

export interface ItemStyleOption<TCbParams = never>
  extends ShadowOptionMixin,
    BorderOptionMixin {
  color?:
    | ZRColor
    | (TCbParams extends never ? never : (params: TCbParams) => ZRColor)
  opactiy?: number
  decal?: DecalObject | 'none'
}

export interface LineStyleOption<Clr = ZRColor> extends ShadowOptionMixin {
  width?: number
  color?: Clr
  opacity?: number
  type?: ZRLineType
  dashOffset?: number
}

export interface AreaStyleOption<Clr = ZRColor> extends ShadowOptionMixin {
  color?: Clr
  opacity?: number
}

export interface StageHandler {
  createOnAllSeries?: boolean
  seriesType?: string
  performRawSeries?: boolean
  getTargetSeries?: (
    ecModel: GlobalModel,
    api: ExtensionAPI
  ) => HashMap<SeriesModel>
  plan?: StageHandlerPlan
  overallReset?: StageHandlerOverallReset
  reset?: StageHandlerReset
}

export interface StageHandlerReset {
  (
    seriesModel: SeriesModel,
    ecModel: GlobalModel,
    api: ExtensionAPI,
    payload?: Payload
  ): StageHandlerProgressExecutor | StageHandlerProgressExecutor[] | void
}

export interface StageHandlerInternal extends StageHandler {
  uid: string
  visualType?: 'layout' | 'visual'
  __prio: number
  __raw: StageHandler | StageHandlerOverallReset
  isVisual?: boolean
  isLayout?: boolean
}

export interface StageHandlerOverallReset {
  (piModel: GlobalModel, api: ExtensionAPI, payload?: Payload): void
}

export type StageHandlerProgressParams = TaskProgressParams
export interface StageHandlerProgressExecutor {
  dataEach?: (data: SeriesData, idx: number) => void
  progress?: (params: StageHandlerProgressParams, data: SeriesData) => void
}

export type StageHandlerPlanReturn = TaskPlanCallbackReturn
export interface StageHandlerPlan {
  (
    seriesModel: SeriesModel,
    ecModel: GlobalModel,
    api: ExtensionAPI,
    payload?: Payload
  ): StageHandlerPlanReturn
}
