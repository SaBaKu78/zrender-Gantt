import { CoordinateSystemHostModel } from '../core/CoordinateSystem'
import Model from '../model/Model'
import Axis from './Axis'
import { AxisBaseOption, ValueAxisBaseOption } from './axisCommonTypes'

interface AxisModelCommonMixin<Opt extends AxisBaseOption>
  extends Pick<Model<Opt>, 'option'> {
  axis: Axis
}

class AxisModelCommonMixin<Opt extends AxisBaseOption> {
  getNeedCrossZero(): boolean {
    const option = this.option as ValueAxisBaseOption
    return !option.scale
  }

  getCoordSysModel(): CoordinateSystemHostModel {
    return
  }
}

export { AxisModelCommonMixin }
