import { ExtensionInstallRegisters } from '../../../extension'
import ComponentModel from '../../model/Component'
import { ComponentOption } from '../../util/types'
import ResourceFilterView from './ResourceFilterView'

export type ResourceFilterResource = [string, string | number]

export interface ResourceFilterOption extends ComponentOption {
  show?: boolean
  resources?: ResourceFilterResource[]
  value?: string | number
  allValue?: string
  storageKey?: string
  onChange?: (params: {
    filter: { resourceId?: string | number }
    visibleResources: ResourceFilterResource[]
  }) => void
}

export default class ResourceFilterModel extends ComponentModel<ResourceFilterOption> {
  static type = 'resourceFilter'
  type = ResourceFilterModel.type

  static defaultOption: ResourceFilterOption = {
    show: true,
    resources: [],
    allValue: '__ALL__',
    storageKey: 'gantt.resourceFilter',
  }
}

export function install(registers: ExtensionInstallRegisters) {
  registers.registerComponentModel(ResourceFilterModel)
  registers.registerComponentView(ResourceFilterView)
}
