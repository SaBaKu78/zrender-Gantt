import { ExtensionInstallRegisters } from '../../../extension'
import ComponentModel from '../../model/Component'
import {
  BorderOptionMixin,
  BoxLayoutOptionMixin,
  ComponentOption,
  LabelOption,
  ZRColor,
  ZRTextAlign,
  ZRTextVerticalAlign,
} from '../../util/types'
import TitleView from './TitleView'

export interface TitleOption
  extends ComponentOption,
    BoxLayoutOptionMixin,
    BorderOptionMixin {
  mainType?: 'title'
  show?: boolean

  text?: string
  /**
   * Link to url
   */
  link?: string
  target?: 'self' | 'blank'

  subtext?: string
  sublink?: string
  subtarget?: 'self' | 'blank'

  textAlign?: ZRTextAlign
  textVerticalAlign?: ZRTextVerticalAlign

  /**
   * @deprecated Use textVerticalAlign instead
   */
  textBaseline?: ZRTextVerticalAlign

  backgroundColor?: ZRColor
  /**
   * Padding between text and border.
   * Support to be a single number or an array.
   */
  padding?: number | number[]
  /**
   * Gap between text and subtext
   */
  itemGap?: number

  textStyle?: LabelOption

  subtextStyle?: LabelOption

  /**
   * If trigger mouse or touch event
   */
  triggerEvent?: boolean

  /**
   * Radius of background border.
   */
  borderRadius?: number | number[]
}

export default class TitleModel extends ComponentModel<TitleOption> {
  static type = 'title' as const

  type = TitleModel.type

  static defaultOption: TitleOption = {
    // zlevel: 0,
    z: 6,
    show: true,

    text: '',
    target: 'blank',
    subtext: '',

    subtarget: 'blank',

    left: 0,
    top: 0,

    backgroundColor: 'rgba(0,0,0,0)',

    borderColor: '#ccc',

    borderWidth: 0,

    padding: 5,

    itemGap: 10,
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#464646',
    },
    subtextStyle: {
      fontSize: 12,
      color: '#6E7079',
    },
  }
}

export function install(registers: ExtensionInstallRegisters) {
  {
    registers.registerComponentModel(TitleModel)
    registers.registerComponentView(TitleView)
  }
}
