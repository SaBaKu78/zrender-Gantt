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
import * as layout from '../../util/layout'

const axisBuilderAttrs = ['axisLine', 'axisTickLabel', 'axisName'] as const

const selfBuilderAttrs = ['splitArea', 'splitLine', 'minorSplitLine'] as const

class CartesianAxisView extends AxisView {
  static type = 'cartesianAxis'
  type = CartesianAxisView.type

  private _axisGroup: graphic.Group
  private _nowLineTimer: ReturnType<typeof setInterval> | null = null

  render(
    axisModel: CartesianAxisModel,
    piModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void {
    ;(this as any).api = api
    if (this._nowLineTimer) {
      clearInterval(this._nowLineTimer)
      this._nowLineTimer = null
    }
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
    if (axisModel.axis.dim === 'x' && axisModel.axis.type === 'time') {
      this.renderTimelineHeader(axisModel, gridModel, api)
    }
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

    if (axisModel.axis.dim === 'x' && axisModel.axis.type === 'time') {
      this.renderNowLine(axisModel, gridModel)
    }
    const isInitialSortFromBarRacing =
      payload && payload.type === 'changeAxisOrder' && payload.isInitSort

    if (!isInitialSortFromBarRacing) {
      graphic.groupTransition(oldAxisGroup, this._axisGroup, axisModel)
    }

    super.render(axisModel, piModel, api, payload)
  }

  dispose(): void {
    if (this._nowLineTimer) {
      clearInterval(this._nowLineTimer)
      this._nowLineTimer = null
    }
    this._nowLine = null
    super.dispose.apply(this, arguments as any)
  }

  private _nowLine: Line | null = null

  private renderTimelineHeader(
    axisModel: CartesianAxisModel,
    gridModel: GridModel,
    api: ExtensionAPI
  ): void {
    const grid = gridModel.coordinateSystem
    const rect = grid.getRect()
    const headerTop = Math.max(0, rect.y - 56)
    const headerBottom = rect.y
    const headerHeight = Math.max(0, headerBottom - headerTop)
    const headerGroup = new graphic.Group({ silent: true })

    headerGroup.add(new graphic.Rect({
      shape: { x: 0, y: headerTop, width: api.getWidth(), height: headerBottom - headerTop },
      style: { fill: '#F8FAFC' },
      z2: -10,
      silent: true,
    }))
    headerGroup.add(new graphic.Line({
      shape: { x1: 0, y1: headerBottom, x2: api.getWidth(), y2: headerBottom },
      style: { stroke: '#D8E0E8', lineWidth: 1 },
      z2: 1,
      silent: true,
    }))
    headerGroup.add(new graphic.Line({
      shape: { x1: rect.x, y1: headerTop, x2: rect.x, y2: headerBottom },
      style: { stroke: '#D8E0E8', lineWidth: 1 },
      z2: 1,
      silent: true,
    }))

    const extent = axisModel.axis.scale.getExtent()
    const firstDate = new Date(Number(extent[0]))
    const weekday = ['日', '一', '二', '三', '四', '五', '六']
    const dateText = Number.isFinite(firstDate.getTime())
      ? `${firstDate.getMonth() + 1}月${firstDate.getDate()}日 · 周${weekday[firstDate.getDay()]}`
      : ''

    headerGroup.add(new graphic.Text({
      style: {
        x: 16,
        y: headerTop + headerHeight / 2,
        text: '资源',
        fill: '#64748B',
        fontSize: 12,
        align: 'left',
        verticalAlign: 'middle',
      },
      z2: 8,
      silent: true,
    }))
    headerGroup.add(new graphic.Text({
      style: {
        x: rect.x + 12,
        y: headerTop + 14,
        text: dateText,
        fill: '#64748B',
        fontSize: 12,
        align: 'left',
        verticalAlign: 'middle',
      },
      z2: 8,
      silent: true,
    }))

    this._axisGroup.add(headerGroup)
  }

  private renderNowLine(
    axisModel: CartesianAxisModel,
    gridModel: GridModel
  ): void {
    const axis = axisModel.axis
    const grid = gridModel.coordinateSystem
    const rect = grid.getRect()
    const endY = getVerticalSplitLineEndY(this.api, rect)
    const line = new Line({
      shape: {
        x1: rect.x,
        y1: rect.y,
        x2: rect.x,
        y2: endY,
      },
      style: {
        stroke: '#2563EB',
        lineWidth: 2,
        opacity: 0.88,
      },
      z2: 6,
      silent: true,
    })

    const updatePosition = (): void => {
      const now = Date.now()
      const extent = axis.scale.getExtent()
      const min = Math.min(extent[0], extent[1])
      const max = Math.max(extent[0], extent[1])
      const visible = now >= min && now <= max
      line.ignore = !visible
      if (visible) {
        const x = axis.toGlobalCoord(axis.dataToCoord(now))
        line.setShape({ x1: x, x2: x })
      }
      line.dirty()
      this.api.getZr().refresh()
    }

    this._nowLine = line
    this._axisGroup.add(line)
    updatePosition()
    this._nowLineTimer = setInterval(updatePosition, 1000)
    // line
    //   .animate('style', true)
    //   .when(900, { opacity: 0.58 })
    //   .when(1800, { opacity: 0.88 })
    //   .start()
  }
}


function getVerticalSplitLineEndY(
  api: ExtensionAPI,
  gridRect: { y: number; height: number }
): number {
  const piSize = { width: api.getWidth(), height: api.getHeight() }
  let endY = gridRect.y + gridRect.height

  api.getModel().eachComponent('dataZoom', function (dataZoomModel: any) {
    if (
      dataZoomModel.subType !== 'slider' ||
      dataZoomModel.getOrient() !== 'horizontal' ||
      dataZoomModel.get('show') === false
    ) {
      return
    }

    const layoutRect = layout.getLayoutRect(
      layout.getLayoutParams(dataZoomModel.option),
      piSize
    )
    endY = Math.max(endY, layoutRect.y)
  })

  return Math.min(endY, piSize.height)
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
    const endY = getVerticalSplitLineEndY(axisView.api, rect)

    if (axis.dim === 'x') {
      ticksCoords.forEach(function (tickCoord) {
        const x = rect.x + tickCoord.coord
        const tickTime = new Date(tickCoord.tickValue as number)
        const isHour = Number.isFinite(tickTime.getTime()) && tickTime.getMinutes() === 0
        axisGroup.add(new Line({
          shape: {
            x1: x,
            y1: rect.y,
            x2: x,
            y2: endY,
          },
          style: {
            stroke: isHour ? '#B8C6D5' : '#E0E6ED',
            lineWidth: isHour ? 1.5 : 1,
            lineDash: null,
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
    const endY = getVerticalSplitLineEndY(axisView.api, rect)

    for (let i = 0; i < ticksCoords.length - 1; i++) {
      const midX = rect.x + (ticksCoords[i].coord + ticksCoords[i + 1].coord) / 2
      axisGroup.add(new Line({
        shape: {
          x1: midX,
          y1: rect.y,
          x2: midX,
          y2: endY,
        },
        style: {
          stroke: '#EDF1F5',
          lineWidth: 1,
          lineDash: null,
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
