import AxisView from './AxisView'
import * as graphic from '../../util/graphic'
import ExtensionAPI from '../../core/ExtensionAPI'
import GlobalModel from '../../model/Global'
import { Payload } from '../../util/types'
import CartesianAxisModel from '../../coord/cartesian/AxisModel'
import * as cartesianAxisHelper from '../../coord/cartesian/cartesianAxisHelper'
import AxisBuilder, { AxisBuilderCfg } from './AxisBuilder'
import { isIntervalOrLogScale } from '../scale/helper'
import * as zrUtil from 'zrender/src/core/util'
import GridModel from '../gird/GridModel'
import { Line } from 'zrender'

const axisBuilderAttrs = ['axisLine', 'axisTickLabel', 'axisName'] as const

const selfBuilderAttrs = ['splitArea', 'splitLine', 'minorSplitLine'] as const

class CartesianAxisView extends AxisView {
  static type = 'cartesianAxis'
  type = CartesianAxisView.type

  private _axisGroup: graphic.Group

  render(
    axisModel: CartesianAxisModel,
    piModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void {
    this.group.removeAll()
    const oldAxisGroup = this._axisGroup
    this._axisGroup = new graphic.Group()
    this.group.add(this._axisGroup)
    if (!axisModel.get('show')) {
      return
    }

    const gridModel = axisModel.getCoordSysModel()
    const layout = cartesianAxisHelper.layout(gridModel, axisModel)
    const axisBuilder = new AxisBuilder(
      axisModel,
      zrUtil.extend(
        {
          handleAutoShown(elementType) {
            const cartesians = gridModel.coordinateSystem.getCartesians()
            for (let i = 0; i < cartesians.length; i++) {
              if (
                isIntervalOrLogScale(
                  cartesians[i].getOtherAxis(axisModel.axis).scale
                )
              ) {
                // Still show axis tick or axisLine if other axis is value / log
                return true
              }
            }
            // Not show axisTick or axisLine if other axis is category / time
            return false
          },
        } as AxisBuilderCfg,
        layout
      )
    )
    zrUtil.each(axisBuilderAttrs, axisBuilder.add, axisBuilder)
    this._axisGroup.add(axisBuilder.getGroup())

    zrUtil.each(
      selfBuilderAttrs,
      function (name) {
        if (axisModel.get([name, 'show'])) {
          axisElementBuilders[name](this, this._axisGroup, axisModel, gridModel)
        }
      },
      this
    )
    const isInitialSortFromBarRacing =
      payload && payload.type === 'changeAxisOrder' && payload.isInitSort

    if (!isInitialSortFromBarRacing) {
      graphic.groupTransition(oldAxisGroup, this._axisGroup, axisModel)
    }

    super.render(axisModel, piModel, api, payload)
  }
}

interface AxisElementBuilder {
  (
    axisView: CartesianAxisView,
    axisGroup: graphic.Group,
    axisModel: CartesianAxisModel,
    gridModel: GridModel
  ): void
}

const axisElementBuilders: Record<
  (typeof selfBuilderAttrs)[number],
  AxisElementBuilder
> = {
  splitLine(axisView, axisGroup, axisModel, gridModel) {
    const axis = axisModel.axis
    const grid = gridModel.coordinateSystem
    const rect = grid.getRect()
    const ticksCoords = axis.getTicksCoords()

    if (axis.dim === 'x') {
      ticksCoords.forEach(function (tickCoord) {
        const x = rect.x + tickCoord.coord
        axisGroup.add(new Line({
          shape: {
            x1: x,
            y1: rect.y,
            x2: x,
            y2: rect.y + rect.height,
          },
          style: {
            stroke: '#E2E8ED',
            lineWidth: 1,
          },
          z2: 0,
          silent: true,
        }))
      })
    } else {
      // y 轴水平线已在 ResourceRenderItem 中处理
    }
  },
  minorSplitLine(axisView, axisGroup, axisModel, gridModel) {
    const axis = axisModel.axis
    if (axis.dim !== 'x') return

    const grid = gridModel.coordinateSystem
    const rect = grid.getRect()
    const ticksCoords = axis.getTicksCoords()

    for (let i = 0; i < ticksCoords.length - 1; i++) {
      const midX = rect.x + (ticksCoords[i].coord + ticksCoords[i + 1].coord) / 2
      axisGroup.add(new Line({
        shape: {
          x1: midX,
          y1: rect.y,
          x2: midX,
          y2: rect.y + rect.height,
        },
        style: {
          stroke: '#E2E8ED',
          lineWidth: 1,
          lineDash: [4, 4],
        },
        z2: 0,
        silent: true,
      }))
    }
  },
  splitArea(axisView, axisGroup, axisModel, gridModel) {},
}

export class CartesianXAxisView extends CartesianAxisView {
  static type = 'xAxis'
  type = CartesianXAxisView.type
}
export class CartesianYAxisView extends CartesianAxisView {
  static type = 'yAxis'
  type = CartesianXAxisView.type
}

export default CartesianAxisView
