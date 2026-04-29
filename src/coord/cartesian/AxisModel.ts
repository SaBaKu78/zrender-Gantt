import { AxisBaseOption } from '../axisCommonTypes'
import * as zrUtil from 'zrender/src/core/util'
import { AxisModelCommonMixin } from '../axisModelCommonMixin'
import ComponentModel from '../../model/Component'
import { AxisBaseModel } from '../AxisBaseModel'
import Axis2D from './Axis2D'
import { AxisModelExtendedInCreator } from '../axisModelCreator'
import GridModel from '../../component/gird/GridModel'
import { SINGLE_REFERRING } from '../../util/model'

export type CartesianAxisPosition = 'top' | 'bottom' | 'left' | 'right'
export type CartesianAxisOption = AxisBaseOption & {
  gridIndex?: number
  gridId?: string
  position?: CartesianAxisPosition
  // Offset is for multiple axis on the same position.
  offset?: number
}

export class CartesianAxisModel
  extends ComponentModel<CartesianAxisOption>
  implements AxisBaseModel<CartesianAxisOption>
{
  static type = 'cartesian2dAxis'

  axis: Axis2D

  getCoordSysModel(): GridModel {
    return this.getReferringComponents('grid', SINGLE_REFERRING)
      .models[0] as GridModel
  }
}

export interface CartesianAxisModel
  extends AxisModelCommonMixin<CartesianAxisOption>,
    AxisModelExtendedInCreator {}
zrUtil.mixin(CartesianAxisModel, AxisModelCommonMixin)

export default CartesianAxisModel
