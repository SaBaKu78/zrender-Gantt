import { ExtensionInstallRegisters, use } from '../../../extension'
import { install as installDataZoomSlider } from './SliderZoomModel'
import { install as installDataZoomInside } from './InsideZoomModel'

export function install(registers: ExtensionInstallRegisters) {
  use(installDataZoomInside)
  use(installDataZoomSlider)
}
