import { ExtensionInstallRegisters } from '../../../extension'
import ComponentModel from '../../model/Component'
import { ComponentOption } from '../../util/types'
import GanttQueryView from './GanttQueryView'

export interface GanttQueryOption extends ComponentOption {
  show?: boolean
  placeholder?: string
  value?: string
  width?: number
  top?: number
  right?: number
  conditions?: string[]
}

export default class GanttQueryModel extends ComponentModel<GanttQueryOption> {
  static type = 'ganttQuery'
  type = GanttQueryModel.type

  static defaultOption: GanttQueryOption = {
    show: true,
    placeholder: 'Search',
    value: '',
    width: 280,
    top: 34,
    right: 96,
    conditions: ['\u4efb\u52a1\u540d', '\u8d44\u6e90\u540d', '\u822a\u73ed\u53f7', '\u8fdb\u51fa\u6e2f'],
  }
}

export function install(registers: ExtensionInstallRegisters) {
  registers.registerComponentModel(GanttQueryModel)
  registers.registerComponentView(GanttQueryView)
}
