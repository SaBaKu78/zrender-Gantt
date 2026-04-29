import ComponentModel from '../model/Component'
import Axis from './Axis'
import { AxisBaseOptionCommon } from './axisCommonTypes'
import { AxisModelCommonMixin } from './axisModelCommonMixin'
import { AxisModelExtendedInCreator } from './axisModelCreator'

export interface AxisBaseModel<
  T extends AxisBaseOptionCommon = AxisBaseOptionCommon
> extends ComponentModel<T>,
    AxisModelCommonMixin<T>,
    AxisModelExtendedInCreator {
  axis: Axis
}
