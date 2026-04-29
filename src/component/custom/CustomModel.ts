import { GeneralTask, OverallTask } from '../../core/Scheduler'
import { createSeriesData } from '../../data/helper/createSeriesData'
import { SourceManager } from '../../data/helper/SourceManager'
import SeriesData from '../../data/SeriesData'
import GlobalModel from '../../model/Global'
import SeriesModel from '../../model/Series'
import {
  Dictionary,
  ItemStyleOption,
  LabelOption,
  OptionDataValue,
  SeriesDataType,
  SeriesOption,
  ZRStyleProps,
} from '../../util/types'
import * as modelUtil from '../../util/model'
import { Circle, Line, Rect } from '../../util/graphic'
import { PathProps } from 'zrender/src/graphic/Path'
import { TransformProp } from 'zrender/src/core/Transformable'
import Displayable from 'zrender/src/graphic/Displayable'
import { ImageStyleProps } from 'zrender/src/graphic/Image'
import { TextStyleProps } from 'zrender/src/graphic/Text'
import { CoordinateSystem } from '../../coord/CoordinateSystem'
import { Element, GroupProps, ImageProps, TextProps } from 'zrender'
import { TransitionOptionMixin } from '../../animation/customGraphicTransition'

export type CustomExtraElementInfo = Dictionary<unknown>

const inner = modelUtil.makeInner<
  {
    data: SeriesData
    dataBeforeProcessed: SeriesData
    sourceManager: SourceManager
  },
  SeriesModel
>()

interface CustomSeriesOption extends SeriesOption {
  type?: 'custom'
  coordinateSystem?: string
  renderItem?: any
  itemStyle?: ItemStyleOption
  label?: LabelOption
  emphasis?: {
    itemStyle?: ItemStyleOption
    label?: LabelOption
  }
  clip?: boolean
}

export const customInnerStore = modelUtil.makeInner<
  {
    info: CustomExtraElementInfo
    customPathData: string
    customGraphicType: string
    customImagePath: CustomImageOption['style']['image']
    // customText: string;
    txConZ2Set: number
    option: CustomElementOption
  },
  Element
>()

interface BuiltinShapes {
  circle: Partial<Circle['shape']>
  rect: Partial<Rect['shape']>
  line: Partial<Line['shape']>
}

interface CustomSVGPathShapeOption {
  // SVG Path, like 'M0,0 L0,-20 L70,-1 L70,0 Z'
  pathData?: string
  // "d" is the alias of `pathData` follows the SVG convention.
  d?: string
  layout?: 'center' | 'cover'
  x?: number
  y?: number
  width?: number
  height?: number
}

export interface CustomBaseElementOption
  extends Partial<
    Pick<Element, TransformProp | 'silent' | 'ignore' | 'textConfig'>
  > {
  type: string
  id?: string
  name?: string
  info?: CustomExtraElementInfo
}

export interface CustomDisplayableOption
  extends CustomBaseElementOption,
    Partial<Pick<Displayable, 'zlevel' | 'z' | 'z2' | 'invisible'>> {
  style?: ZRStyleProps
  styleEmphasis?: ZRStyleProps | false
}

type ShapeMorphingOption = {
  /**
   * If do shape morphing animation when type is changed.
   * Only available on path.
   */
  morph?: boolean
}

export interface CustomBaseZRPathOption<
  T extends PathProps['shape'] = PathProps['shape']
> extends CustomDisplayableOption,
    ShapeMorphingOption,
    TransitionOptionMixin<PathProps & { shape: T }> {
  shape?: T & TransitionOptionMixin<T>
  style?: PathProps['style']
}

export interface CustomSVGPathOption
  extends CustomBaseZRPathOption<CustomSVGPathShapeOption> {
  type: 'path'
}

export interface CustomImageOption
  extends CustomDisplayableOption,
    TransitionOptionMixin<ImageProps> {
  type: 'image'
  style?: ImageStyleProps & TransitionOptionMixin<ImageStyleProps>
}

interface CustomBuiltinPathOption<T extends keyof BuiltinShapes>
  extends CustomBaseZRPathOption<BuiltinShapes[T]> {
  type: T
}

type CreateCustomBuiltinPathOption<T extends keyof BuiltinShapes> =
  T extends any ? CustomBuiltinPathOption<T> : never

export type CustomPathOption =
  | CreateCustomBuiltinPathOption<keyof BuiltinShapes>
  | CustomSVGPathOption

export interface CustomTextOption
  extends CustomDisplayableOption,
    TransitionOptionMixin<TextProps> {
  type: 'text'
  style?: TextStyleProps
}

export interface CustomGroupOption
  extends CustomBaseElementOption,
    TransitionOptionMixin<GroupProps> {
  type: 'group'
  width?: number
  height?: number
  children: CustomElementOption[]
  $mergeChildren?: false | 'byIndex' | 'byName'
  diffChildrenByName?: boolean
}

export type CustomElementOption =
  | CustomPathOption
  | CustomImageOption
  | CustomTextOption
  | CustomGroupOption

export type CustomRootElementOption = CustomElementOption & {}

export interface CustomDisplayableOptionOnState
  extends Partial<Pick<Displayable, TransformProp | 'textConfig' | 'z2'>> {
  // `false` means remove emphasis trigger.
  style?: ZRStyleProps | false
}

export interface CustomImageOptionOnState
  extends CustomDisplayableOptionOnState {
  style?: ImageStyleProps
}

export type CustomElementOptionOnState =
  | CustomDisplayableOptionOnState
  | CustomImageOptionOnState

export interface CustomSeriesRenderItemParamsCoordSys {
  type: string
  // And extra params for each coordinate systems.
}
export interface CustomSeriesRenderItemCoordinateSystemAPI {
  coord(data: OptionDataValue | OptionDataValue[], clamp?: boolean): number[]
  size?(
    dataSize: OptionDataValue | OptionDataValue[],
    dataItem?: OptionDataValue | OptionDataValue[]
  ): number | number[]
}

export type PrepareCustomInfo = (coordSys: CoordinateSystem) => {
  coordSys: CustomSeriesRenderItemParamsCoordSys
  api: CustomSeriesRenderItemCoordinateSystemAPI
}

export interface CustomSeriesRenderItemParams {
  context: Dictionary<unknown>
  dataIndex: number
  seriesId: string
  seriesName: string
  seriesIndex: number
  coordSys: CustomSeriesRenderItemParamsCoordSys
}

class CustomSeriesModel extends SeriesModel<CustomSeriesOption> {
  static type = 'series.custom'
  readonly type = CustomSeriesModel.type

  static defaultOption: CustomSeriesOption = {
    coordinateSystem: 'cartesian2d',
    z: 2,
    clip: false,
  }

  currentZLevel: number
  currentZ: number

  getInitialData(option: CustomSeriesOption, piModel: GlobalModel): SeriesData {
    return createSeriesData(null, this)
  }
}

export default CustomSeriesModel
