import { ExtensionInstallRegisters } from '../../../extension'
import ComponentModel from '../../model/Component'
import { ComponentOption, ZRColor } from '../../util/types'
import UnassignedBoardView from './UnassignedBoardView'

export interface UnassignedBoardOption extends ComponentOption {
  show?: boolean
  backgroundColor?: ZRColor
  borderColor?: ZRColor
  borderWidth?: number
  itemGap?: number
  padding?: number[]
  data?: any[]
}

export default class UnassignedBoardModel extends ComponentModel<UnassignedBoardOption> {
  static type = 'unassignedBoard'
  type = UnassignedBoardModel.type

  static defaultOption: UnassignedBoardOption = {
    show: true,
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    itemGap: 8,
    padding: [16, 16, 16, 16],
  }
}

export function install(registers: ExtensionInstallRegisters) {
  registers.registerComponentModel(UnassignedBoardModel)
  registers.registerComponentView(UnassignedBoardView)
}
