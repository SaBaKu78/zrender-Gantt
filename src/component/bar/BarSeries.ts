import Cartesian2D from '../../coord/cartesian/Cartesian2D'
import { inheritDefaultOption } from '../../util/component'
import {
  CallbackDataParams,
  DefaultStatesMixinEmphasis,
  ItemStyleOption,
  OptionDataItemObject,
  OptionDataValue,
  SeriesLabelOption,
  StatesOptionMixin,
} from '../../util/types'
import BaseBarSeriesModel, { BaseBarSeriesOption } from './BaseBarSeries'

interface BarStatesMixin {
  emphasis?: DefaultStatesMixinEmphasis
}

export type BarSeriesLabelOption = Omit<SeriesLabelOption, 'position'>

export interface BarStateOption<TCbParams = never> {
  itemStyle?: BarItemStyleOption<TCbParams>
  label?: BarSeriesLabelOption
}

export interface BarDataItemOption
  extends BarStateOption,
    StatesOptionMixin<BarStateOption, BarStatesMixin>,
    OptionDataItemObject<OptionDataValue> {
  cursor?: string
}

export interface BarItemStyleOption<TCbParams = never>
  extends ItemStyleOption<TCbParams> {
  // for polar bars, this is used for sector's cornerRadius
  borderRadius?: (number | string)[] | number | string
}

export interface BarSeriesOption
  extends BaseBarSeriesOption<
      BarStateOption<CallbackDataParams>,
      BarStatesMixin
    >,
    BarStateOption<CallbackDataParams> {
  type?: 'bar'

  coordinateSystem?: 'cartesian2d' | 'polar'
  clip?: boolean
  showBackground?: boolean

  backgroundStyle?: ItemStyleOption & {
    borderRadius?: number | number[]
  }

  data?: (BarDataItemOption | OptionDataValue | OptionDataValue[])[]
}

class BarSeriesModel extends BaseBarSeriesModel<BarSeriesOption> {
  static type = 'series.bar'
  type = BarSeriesModel.type

  static dependencies = ['grid']

  coordinateSystem: Cartesian2D

  static defaultOption: BarSeriesOption = inheritDefaultOption(
    BaseBarSeriesModel.defaultOption,
    {
      clip: true,

      showBackground: false,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
        borderColor: null,
        borderWidth: 0,
        borderType: 'solid',
        borderRadius: 0,
        shadowBlur: 0,
        shadowColor: null,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1,
      },

      select: {
        itemStyle: {
          borderColor: '#212121',
        },
      },
    }
  )
}

export default BarSeriesModel
