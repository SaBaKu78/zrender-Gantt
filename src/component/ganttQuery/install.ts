import { ExtensionInstallRegisters } from '../../../extension'
import { install as installGanttQueryModel } from './GanttQueryModel'

export function install(registers: ExtensionInstallRegisters) {
  installGanttQueryModel(registers)
}
