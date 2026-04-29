import { each, keys } from 'zrender/src/core/util'
import {
  createScaleByModel,
  getDataDimensionsOnAxis,
  niceScaleExtent,
} from '../../coord/axisHelper'
import Axis2D from '../../coord/cartesian/Axis2D'
import CartesianAxisModel from '../../coord/cartesian/AxisModel'
import { CoordinateSystemMaster } from '../../coord/CoordinateSystem'
import ExtensionAPI from '../../core/ExtensionAPI'
import GlobalModel from '../../model/Global'
import { getLayoutRect, LayoutRect } from '../../util/layout'
import GridModel from './GridModel'
import Cartesian2D from '../../coord/cartesian/Cartesian2D'
import { Dictionary } from 'zrender/src/core/types'
import {
  findAxisModels,
  isCartesian2DSeries,
} from '../../coord/cartesian/cartesianAxisHelper'
import { isObject } from 'zrender/lib/core/util'
import { AxisBaseModel } from '../../coord/AxisBaseModel'
import {
  CategoryAxisBaseOption,
  NumbericAxisBaseOptionCommon,
} from '../../coord/axisCommonTypes'
import SeriesData from '../../data/SeriesData'
import Axis from '../../coord/Axis'

type Cartesian2DDimensionName = 'x' | 'y'

type AxesMap = {
  x: Axis2D[]
  y: Axis2D[]
}
type FinderAxisIndex = { xAxisIndex?: number; yAxisIndex?: number }

class Grid implements CoordinateSystemMaster {
  readonly type: string = 'grid'

  private _rect: LayoutRect
  private _axesMap: AxesMap = {} as AxesMap
  private _axesList: Axis2D[] = []
  private _coordsMap: Dictionary<Cartesian2D> = {}
  private _coordsList: Cartesian2D[] = []

  readonly model: GridModel

  //外部注入得
  name: string

  constructor(gridModel: GridModel, piModel: GlobalModel, api: ExtensionAPI) {
    this._initCartesian(gridModel, piModel, api)
    this.model = gridModel
  }

  private _initCartesian(
    gridModel: GridModel,
    piModel: GlobalModel,
    api: ExtensionAPI
  ) {
    const grid = this
    const axisPositionUsed = {
      left: false,
      right: false,
      top: false,
      bottom: false,
    }
    const axesMap = {
      x: {},
      y: {},
    } as AxesMap

    const axesCount = {
      x: 0,
      y: 0,
    }
    piModel.eachComponent('xAxis', createAxisCreator('x'), this)
    piModel.eachComponent('yAxis', createAxisCreator('y'), this)
    if (!axesCount.x) {
      // Roll back when there no either x or y axis
      this._axesMap = {} as AxesMap
      this._axesList = []
      return
    }

    this._axesMap = axesMap
    each(axesMap.x, (xAxis, xAxisIndex) => {
      each(axesMap.y, (yAxis, yAxisIndex) => {
        const key = 'x' + xAxisIndex + 'y' + yAxisIndex
        const cartesian = new Cartesian2D(key)
        cartesian.master = this
        cartesian.model = gridModel

        this._coordsMap[key] = cartesian
        this._coordsList.push(cartesian)

        cartesian.addAxis(xAxis)
        cartesian.addAxis(yAxis)
      })
    })

    function createAxisCreator(dimName: Cartesian2DDimensionName) {
      return function (axisModel: CartesianAxisModel, idx: number): void {
        if (!isAxisUsedInTheGrid(axisModel, gridModel)) {
          return
        }

        let axisPosition = axisModel.get('position')
        if (dimName === 'x') {
          // Fix position
          if (axisPosition !== 'top' && axisPosition !== 'bottom') {
            // Default bottom of X
            axisPosition = axisPositionUsed.bottom ? 'top' : 'bottom'
          }
        } else {
          // Fix position
          if (axisPosition !== 'left' && axisPosition !== 'right') {
            // Default left of Y
            axisPosition = axisPositionUsed.left ? 'right' : 'left'
          }
        }
        axisPositionUsed[axisPosition] = true
        const axis = new Axis2D(
          dimName,
          createScaleByModel(axisModel),
          [0, 0],
          axisModel.get('type'),
          axisPosition
        )
        const isCategory = axis.type === 'category'
        axis.onBand =
          isCategory &&
          (axisModel as AxisBaseModel<CategoryAxisBaseOption>).get(
            'boundaryGap'
          )
        axis.inverse = axisModel.get('inverse')

        // Inject axis into axisModel
        axisModel.axis = axis

        // Inject axisModel into axis
        axis.model = axisModel

        // Inject grid info axis
        axis.grid = grid

        // Index of axis, can be used as key
        axis.index = idx

        grid._axesList.push(axis)

        axesMap[dimName][idx] = axis
        axesCount[dimName]++
      }
    }
  }

  private _updateScale(piModel: GlobalModel, gridModel: GridModel): void {
    each(this._axesList, function (axis) {
      axis?.scale?.setExtent(Infinity, -Infinity)
    })

    piModel.eachSeries(function (seriesModel) {
      if (isCartesian2DSeries(seriesModel)) {
        const axesModelMap = findAxisModels(seriesModel)
        const xAxisModel = axesModelMap.xAxisModel
        const yAxisModel = axesModelMap.yAxisModel
        if (
          !isAxisUsedInTheGrid(xAxisModel, gridModel) ||
          !isAxisUsedInTheGrid(yAxisModel, gridModel)
        ) {
          return
        }
        const cartesian = this.getCartesian(
          xAxisModel.componentIndex,
          yAxisModel.componentIndex
        )
        const data = seriesModel.getData()
        const xAxis = cartesian.getAxis('x')
        const yAxis = cartesian.getAxis('y')
        unionExtent(data, xAxis)
        unionExtent(data, yAxis)
      }
    }, this)

    function unionExtent(data: SeriesData, axis: Axis2D): void {
      each(getDataDimensionsOnAxis(data, axis.dim), function (dim) {
        axis.scale.unionExtentFromData(data, dim)
      })
    }
  }

  update(piModel: GlobalModel, api: ExtensionAPI): void {
    const axesMap = this._axesMap
    this._updateScale(piModel, this.model)
    function updateAxisTicks(axes: Record<number, Axis2D>) {
      let alignTo: Axis2D
      const axesIndices = keys(axes)
      const len = axesIndices.length
      if (!len) {
        return
      }
      for (let i = len - 1; i >= 0; i--) {
        const idx = +axesIndices[i] // Convert to number.
        const axis = axes[idx]
        const model = axis.model as AxisBaseModel<NumbericAxisBaseOptionCommon>
        const scale = axis.scale
        // if (
        //   // Only value and log axis without interval support alignTicks.
        //   isIntervalOrLogScale(scale) &&
        //   model.get('alignTicks') &&
        //   model.get('interval') == null
        // ) {
        //   axisNeedsAlign.push(axis)
        // } else {
        niceScaleExtent(scale, model)
        // if (isIntervalOrLogScale(scale)) {
        //   // Can only align to interval or log axis.
        //   alignTo = axis
        // }
        // }
      }
    }

    updateAxisTicks(axesMap.x)
    updateAxisTicks(axesMap.y)
    const onZeroRecords = {} as Dictionary<boolean>

    each(axesMap.x, function (xAxis) {
      fixAxisOnZero(axesMap, 'y', xAxis, onZeroRecords)
    })
    each(axesMap.y, function (yAxis) {
      fixAxisOnZero(axesMap, 'x', yAxis, onZeroRecords)
    })
    this.resize(this.model, api)
  }

  resize(
    gridModel: GridModel,
    api: ExtensionAPI,
    ignoreContainLabel?: boolean
  ): void {
    const boxLayoutParams = gridModel.getBoxLayoutParams()
    const isContainLabel = !ignoreContainLabel && gridModel.get('containLabel')
    const gridRect = getLayoutRect(boxLayoutParams, {
      width: api.getWidth(),
      height: api.getHeight(),
    })

    this._rect = gridRect
    const axesList = this._axesList
    adjustAxes()

    function adjustAxes() {
      each(axesList, function (axis) {
        const isHorizontal = axis.isHorizontal()
        const extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height]
        const idx = axis.inverse ? 1 : 0
        axis.setExtent(extent[idx], extent[1 - idx])
        updateAxisTransform(axis, isHorizontal ? gridRect.x : gridRect.y)
      })
    }
  }

  getRect() {
    return this._rect
  }

  getCartesian(finder: FinderAxisIndex): Cartesian2D
  getCartesian(xAxisIndex?: number, yAxisIndex?: number): Cartesian2D
  getCartesian(xAxisIndex?: number | FinderAxisIndex, yAxisIndex?: number) {
    if (xAxisIndex != null && yAxisIndex != null) {
      const key = 'x' + xAxisIndex + 'y' + yAxisIndex
      return this._coordsMap[key]
    }

    if (isObject(xAxisIndex)) {
      yAxisIndex = (xAxisIndex as FinderAxisIndex).yAxisIndex
      xAxisIndex = (xAxisIndex as FinderAxisIndex).xAxisIndex
    }
    for (let i = 0, coordList = this._coordsList; i < coordList.length; i++) {
      if (
        coordList[i].getAxis('x').index === xAxisIndex ||
        coordList[i].getAxis('y').index === yAxisIndex
      ) {
        return coordList[i]
      }
    }
  }

  getCartesians(): Cartesian2D[] {
    return this._coordsList.slice()
  }

  containPoint(point: number[]): boolean {
    const coord = this._coordsList[0]
    if (coord) {
      return coord.containPoint(point)
    }
  }

  // /core/CoordinateSystem.ts 被调用
  static create(piModel: GlobalModel, api: ExtensionAPI): Grid[] {
    const grids = [] as Grid[]
    piModel.eachComponent('grid', function (gridModel: GridModel, idx) {
      const grid = new Grid(gridModel, piModel, api)
      grid.name = 'grid_' + idx
      //更新网格
      grid.resize(gridModel, api, true)
      gridModel.coordinateSystem = grid
      grids.push(grid)
    })

    piModel.eachSeries(function (seriesModel) {
      if (!isCartesian2DSeries(seriesModel)) {
        return
      }

      const axesModelMap = findAxisModels(seriesModel)
      const xAxisModel = axesModelMap.xAxisModel
      const yAxisModel = axesModelMap.yAxisModel
      const gridModel = xAxisModel.getCoordSysModel()
      const grid = gridModel.coordinateSystem as Grid

      seriesModel.coordinateSystem = grid.getCartesian(
        xAxisModel.componentIndex,
        yAxisModel.componentIndex
      )
    })

    return grids
  }
}

/**
 * Check if the axis is used in the specified grid.
 */
function isAxisUsedInTheGrid(
  axisModel: CartesianAxisModel,
  gridModel: GridModel
): boolean {
  return axisModel.getCoordSysModel() === gridModel
}

function updateAxisTransform(axis: Axis2D, coordBase: number) {
  const axisExtent = axis.getExtent()
  const axisExtentSum = axisExtent[0] + axisExtent[1]

  // Fast transform
  axis.toGlobalCoord =
    axis.dim === 'x'
      ? function (coord) {
          return coord + coordBase
        }
      : function (coord) {
          return axisExtentSum - coord + coordBase
        }
  axis.toLocalCoord =
    axis.dim === 'x'
      ? function (coord) {
          return coord - coordBase
        }
      : function (coord) {
          return axisExtentSum - coord + coordBase
        }
}

export function ifAxisCrossZero(axis: Axis) {
  const dataExtent = axis.scale.getExtent()
  const min = dataExtent[0]
  const max = dataExtent[1]
  return !((min > 0 && max > 0) || (min < 0 && max < 0))
}

function fixAxisOnZero(
  axesMap: AxesMap,
  otherAxisDim: Cartesian2DDimensionName,
  axis: Axis2D,
  // Key: see `getOnZeroRecordKey`
  onZeroRecords: Dictionary<boolean>
): void {
  axis.getAxesOnZeroOf = function () {
    // TODO: onZero of multiple axes.
    return otherAxisOnZeroOf ? [otherAxisOnZeroOf] : []
  }

  // onZero can not be enabled in these two situations:
  // 1. When any other axis is a category axis.
  // 2. When no axis is cross 0 point.
  const otherAxes = axesMap[otherAxisDim]

  let otherAxisOnZeroOf: Axis2D
  const axisModel = axis.model
  const onZero = axisModel.get(['axisLine', 'onZero'])
  const onZeroAxisIndex = axisModel.get(['axisLine', 'onZeroAxisIndex'])
  if (!onZero) {
    return
  }
  // If target axis is specified.
  if (onZeroAxisIndex != null) {
    if (canOnZeroToAxis(otherAxes[onZeroAxisIndex])) {
      otherAxisOnZeroOf = otherAxes[onZeroAxisIndex]
    }
  } else {
    // Find the first available other axis.
    for (const idx in otherAxes) {
      if (
        otherAxes.hasOwnProperty(idx) &&
        canOnZeroToAxis(otherAxes[idx]) &&
        // Consider that two Y axes on one value axis,
        // if both onZero, the two Y axes overlap.
        !onZeroRecords[getOnZeroRecordKey(otherAxes[idx])]
      ) {
        otherAxisOnZeroOf = otherAxes[idx]
        break
      }
    }
  }

  if (otherAxisOnZeroOf) {
    onZeroRecords[getOnZeroRecordKey(otherAxisOnZeroOf)] = true
  }

  function getOnZeroRecordKey(axis: Axis2D) {
    return axis.dim + '_' + axis.index
  }
}

function canOnZeroToAxis(axis: Axis2D): boolean {
  return (
    axis &&
    axis.type !== 'category' &&
    axis.type !== 'time' &&
    ifAxisCrossZero(axis)
  )
}

export default Grid
