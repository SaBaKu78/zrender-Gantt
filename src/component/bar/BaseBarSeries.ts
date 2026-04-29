import SeriesModel from '../../model/Series'
import {
  DefaultStatesMixin,
  SeriesOnCartesinaOptionMixin,
  SeriesOption,
  StatesMixinBase,
} from '../../util/types'

export interface BaseBarSeriesOption<
  StateOption,
  ExtraStateOption extends StatesMixinBase = DefaultStatesMixin
> extends SeriesOption<StateOption, ExtraStateOption>,
    SeriesOnCartesinaOptionMixin {
  barMinHeight?: number
  /**
   * Min angle of bar. Available on polar coordinate system.
   */
  barMinAngle?: number

  /**
   * Max width of bar. Defaults to 1 on cartesian coordinate system. Otherwise it's null.
   */
  barMaxWidth?: number

  barMinWidth?: number

  /**
   * Bar width. Will be calculated automatically.
   * Can be pixel width or percent string.
   */
  barWidth?: number | string

  /**
   * Gap between each bar inside category. Default to be 30%. Can be an aboslute pixel value
   */
  barGap?: string | number

  /**
   * Gap between each category. Default to be 20%. can be an absolute pixel value.
   */
  barCategoryGap?: string | number

  large?: boolean
  largeThreshold?: number
}

class BaseBarSeriesModel<
  Opts extends BaseBarSeriesOption<unknown> = BaseBarSeriesOption<unknown>
> extends SeriesModel<Opts> {
  static type = 'series.__base_bar__'
  type = BaseBarSeriesModel.type

  static defaultOption: BaseBarSeriesOption<unknown, unknown> = {
    z: 2,
  }
}

SeriesModel.registerClass(BaseBarSeriesModel)

export default BaseBarSeriesModel
