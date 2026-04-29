import { ExtensionInstallRegisters } from '../../../extension'
import { inheritDefaultOption } from '../../util/component'
import DataZoomModel, { DataZoomOption } from './DataZoomModel'
import InsideZoomView from './InsideZoomView'
import installCommon from './installCommon'
import { installDataZoomRoamProcessor } from './roams'

interface InsideDataZoomOption extends DataZoomOption {
  /**
   * 是否显隐内置数据缩放器
   */
  disabled?: boolean

  /**
   * Whether disable zoom but only pan.
   */
  zoomLock?: boolean

  zoomOnMouseWheel?: boolean | 'shift' | 'ctrl' | 'alt'

  moveOnMouseMove?: boolean | 'shift' | 'ctrl' | 'alt'

  moveOnMouseWheel?: boolean | 'shift' | 'ctrl' | 'alt'

  preventDefaultMouseMove?: boolean

  /**
   * Inside dataZoom don't support textStyle
   */
  textStyle?: never
}

class InsideZoomModel extends DataZoomModel<InsideDataZoomOption> {
  static readonly type = 'dataZoom.inside'
  type = InsideZoomModel.type
  static defaultOption: InsideDataZoomOption = inheritDefaultOption(
    DataZoomModel.defaultOption,
    {
      disabled: false,
      zoomLock: false,
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: false,
      preventDefaultMouseMove: true,
    }
  )
}

export function install(registers: ExtensionInstallRegisters) {
  installCommon(registers)

  registers.registerComponentModel(InsideZoomModel)
  registers.registerComponentView(InsideZoomView)
  installDataZoomRoamProcessor(registers)
}

export default InsideZoomModel
