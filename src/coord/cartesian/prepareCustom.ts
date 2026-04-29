import Cartesian2D from './Cartesian2D'
import * as zrUtil from 'zrender/src/core/util'

function dataToCoordSize(
  this: Cartesian2D,
  dataSize: number[],
  dataItem: number[]
): number[] {
  // dataItem is necessary in log axis.
  dataItem = dataItem || [0, 0]
  return zrUtil.map(
    ['x', 'y'],
    function (dim, dimIdx) {
      const axis = this.getAxis(dim)
      const val = dataItem[dimIdx]
      const halfSize = dataSize[dimIdx] / 2
      return axis.type === 'category'
        ? axis.getBandWidth()
        : Math.abs(
            axis.dataToCoord(val - halfSize) - axis.dataToCoord(val + halfSize)
          )
    },
    this
  )
}

export default function cartesianPrepareCustom(coordSys: Cartesian2D) {
  const rect = coordSys.master.getRect()

  return {
    coordSys: {
      type: 'cartesian2d',
      x: rect?.x,
      y: rect?.y,
      width: rect?.width,
      height: rect?.height,
    },
    api: {
      coord: function (data: number[]) {
        return coordSys.dataToPoint(data)
      },
      size: zrUtil.bind(dataToCoordSize, coordSys),
    },
  }
}
