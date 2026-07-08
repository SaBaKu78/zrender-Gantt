import { ExtensionInstallRegisters } from '../../../extension'
import { install as installUnassignedBoardModel } from './UnassignedBoardModel'
import installUnassignedBoardAction from './unassignedBoardAction'

export function install(registers: ExtensionInstallRegisters) {
  installUnassignedBoardModel(registers)
  installUnassignedBoardAction(registers)
}