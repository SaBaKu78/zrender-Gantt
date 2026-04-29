import { ExtensionInstallRegisters } from '../../../extension'
import axisModelCreator from '../../coord/axisModelCreator'
import CartesianAxisModel, {
  CartesianAxisOption,
} from '../../coord/cartesian/AxisModel'
import { CartesianXAxisView, CartesianYAxisView } from './CartesianAxisView'

const extraOption: CartesianAxisOption = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0,
}

export function install(registers: ExtensionInstallRegisters) {
  axisModelCreator<CartesianAxisOption, typeof CartesianAxisModel>(
    registers,
    'x',
    CartesianAxisModel,
    extraOption
  )
  axisModelCreator<CartesianAxisOption, typeof CartesianAxisModel>(
    registers,
    'y',
    CartesianAxisModel,
    extraOption
  )

  registers.registerComponentView(CartesianXAxisView)
  registers.registerComponentView(CartesianYAxisView)

  registers.registerPreprocessor(function (option) {
    // Only create grid when need
    if (option.xAxis && option.yAxis && !option.grid) {
      option.grid = {}
    }
  })
}
