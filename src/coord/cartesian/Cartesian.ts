import { DimensionName } from '../../util/types'
import Axis from '../Axis'
import * as zrUtil from 'zrender/src/core/util'

class Cartesian<AxisT extends Axis> {
  readonly type: string = 'cartesian'

  readonly name: string

  private _dimList: DimensionName[] = []

  private _axes: { [dimName: string]: AxisT } = {}

  constructor(name: string) {
    this.name = name || ' '
  }

  getAxis(dim: DimensionName): AxisT {
    return this._axes[dim]
  }

  getAxes(): AxisT[] {
    return zrUtil.map(
      this._dimList,
      function (dim) {
        return this._axes[dim]
      },
      this
    )
  }

  getAxesByScale(scaleType: string): AxisT[] {
    scaleType = scaleType.toLowerCase()
    return zrUtil.filter(this.getAxes(), function (axis) {
      return axis.scale.type === scaleType
    })
  }

  addAxis(axis: AxisT): void {
    const dim = axis.dim

    this._axes[dim] = axis
    this._dimList.push(dim)
  }
}

export default Cartesian
