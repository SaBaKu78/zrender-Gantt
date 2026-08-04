import { ExtensionInstallRegisters } from '../../../extension'
import ComponentModel from '../../model/Component'
import { ComponentOption } from '../../util/types'
import LiquidGlassLayerView from './LiquidGlassLayerView'

export interface LiquidGlassLayerOption extends ComponentOption {
  show?: boolean
  width?: number
  height?: number
  left?: number
  top?: number
  zIndex?: number
  title?: string
}

export default class LiquidGlassLayerModel extends ComponentModel<LiquidGlassLayerOption> {
  static type = 'liquidGlassLayer'
  type = LiquidGlassLayerModel.type

  static defaultOption: LiquidGlassLayerOption = {
    show: false,
    width: 210,
    height: 150,
    left: 24,
    top: 24,
    zIndex: 40,
    title: '',
  }
}

export function install(registers: ExtensionInstallRegisters) {
  registers.registerComponentModel(LiquidGlassLayerModel)
  registers.registerComponentView(LiquidGlassLayerView)
}
