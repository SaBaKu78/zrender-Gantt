import { ExtensionInstallRegisters } from '../../../extension'
import { install as installResourceFilterModel } from './ResourceFilterModel'

export function install(registers: ExtensionInstallRegisters) {
  installResourceFilterModel(registers)
}
