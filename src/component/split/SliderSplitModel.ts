import { ExtensionInstallRegisters } from '../../../extension'
import { inheritDefaultOption } from '../../util/component'
import { ZRColor } from '../../util/types'
import SliderSplitView from './SliderSplitView'
import SplitModel, { SplitOption } from './SplitModel'

export interface SliderSplitOption extends SplitOption {
  show?: boolean

  backgroundColor?: ZRColor

  handleIcon?: string

  ratio?: number | string
}

export default class SliderSplitModel extends SplitModel<SliderSplitOption> {
  static type = 'split.slider'
  type = SliderSplitModel.type

  static defaultOption: SliderSplitOption = inheritDefaultOption(
    SplitModel.defaultOption,
    {
      show: true,
      backgroundColor: '#eee',
    } as SliderSplitOption
  )
}

export function install(registers: ExtensionInstallRegisters) {
  registers.registerComponentModel(SliderSplitModel)
  registers.registerComponentView(SliderSplitView)
  registers.registerSubTypeDefaulter('split', function () {
    return 'slider'
  })
}
