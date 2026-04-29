import Grid from '../../component/gird/Grid'
import { Scale } from '../../component/scale/Scale'
import { DimensionName } from '../../util/types'
import Axis from '../Axis'
import { OptionAxisType } from '../axisCommonTypes'
import CartesianAxisModel, { CartesianAxisPosition } from './AxisModel'

interface Axis2D {
  toGlobalCoord: (coord: number) => number
  toLocalCoord: (coord: number) => number
}

class Axis2D extends Axis {
  readonly position: CartesianAxisPosition

  index: number = 0

  model: CartesianAxisModel

  grid: Grid

  constructor(
    dim: DimensionName,
    scale: Scale,
    coordExtent: [number, number],
    axisType?: OptionAxisType,
    position?: CartesianAxisPosition
  ) {
    super(dim, scale, coordExtent)
    this.type = axisType || 'value'
    this.position = position || 'top'
  }

  getAxesOnZeroOf: () => Axis2D[]

  getGlobalExtent(): [number, number] {
    const ret = this.getExtent()
    ret[0] = this.toGlobalCoord(ret[0])
    ret[1] = this.toGlobalCoord(ret[1])
    return ret
  }

  isHorizontal(): boolean {
    const position = this.position
    return position === 'top' || position === 'bottom'
  }
}

export default Axis2D
