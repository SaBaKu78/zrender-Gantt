import { ExtensionInstallRegisters } from '../../../extension'
import { install as installLiquidGlassLayerModel } from './LiquidGlassLayerModel'

export function install(registers: ExtensionInstallRegisters) {
  installLiquidGlassLayerModel(registers)
}
