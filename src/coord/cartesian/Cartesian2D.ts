import { BoundingRect } from 'zrender'
import Grid from '../../component/gird/Grid'
import GridModel from '../../component/gird/GridModel'
import { DimensionName, ScaleDataValue } from '../../util/types'
import { CoordinateSystem, CoordinateSystemMaster } from '../CoordinateSystem'
import Axis2D from './Axis2D'
import Cartesian from './Cartesian'
import { applyTransform } from 'zrender/lib/core/vector'

export const cartesian2DDimensions = ['x', 'y']

class Cartesian2D extends Cartesian<Axis2D> implements CoordinateSystem {
  readonly type = 'cartesian2d'

  readonly dimensions = cartesian2DDimensions

  private _transform: number[]

  model: GridModel

  master: Grid

  /**
   * Base axis will be used on stacking.
   */
  getBaseAxis(): Axis2D {
    return (
      this.getAxesByScale('ordinal')[0] ||
      this.getAxesByScale('time')[0] ||
      this.getAxis('x')
    )
  }

  containPoint(point: number[]): boolean {
    const axisX = this.getAxis('x')
    const axisY = this.getAxis('y')
    return (
      axisX.contain(axisX.toLocalCoord(point[0])) &&
      axisY.contain(axisY.toLocalCoord(point[1]))
    )
  }

  getArea(): Cartesian2DArea {
    const xExtent = this.getAxis('x').getGlobalExtent()
    const yExtent = this.getAxis('y').getGlobalExtent()
    const x = Math.min(xExtent[0], xExtent[1])
    const y = Math.min(yExtent[0], yExtent[1])
    const width = Math.max(xExtent[0], xExtent[1]) - x
    const height = Math.max(yExtent[0], yExtent[1]) - y
    return new BoundingRect(x, y, width, height)
  }

  dataToPoint(
    data: ScaleDataValue[],
    clamp?: boolean,
    out?: number[]
  ): number[] {
    out = out || []
    const xVal = data[0]
    const yVal = data[1]
    // Fast path
    if (
      this._transform &&
      // It's supported that if data is like `[Inifity, 123]`, where only Y pixel calculated.
      xVal != null &&
      isFinite(xVal as number) &&
      yVal != null &&
      isFinite(yVal as number)
    ) {
      return applyTransform(out, data as number[], this._transform)
    }
    const xAxis = this.getAxis('x')
    const yAxis = this.getAxis('y')
    out[0] = xAxis.toGlobalCoord(xAxis.dataToCoord(xVal, clamp))
    out[1] = yAxis.toGlobalCoord(yAxis.dataToCoord(yVal, clamp))
    return out
  }

  getOtherAxis(axis: Axis2D): Axis2D {
    return this.getAxis(axis.dim === 'x' ? 'y' : 'x')
  }
}

interface Cartesian2DArea extends BoundingRect {}

export default Cartesian2D
