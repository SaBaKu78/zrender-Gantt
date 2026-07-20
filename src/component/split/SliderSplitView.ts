import { Element, ElementEvent, Group, Image, Rect, RectLike } from 'zrender'
import ExtensionAPI from '../../core/ExtensionAPI'
import GlobalModel from '../../model/Global'
import { LayoutOrient } from '../../util/types'
import SplitView from './SplitView'
import { bind } from 'zrender/src/core/util'
import SplitModel from './SplitModel'
import SliderSplitModel from './SliderSplitModel'
import * as eventTool from 'zrender/src/core/event'
import { applyTransform, traverseElements } from '../../util/graphic'
import * as graphic from '../../util/graphic'
import * as layout from '../../util/layout'

const DEFAULT_SPLIT_GAP = 4
export const DATAZOOM_SPLIT_GAP = 6
const INITIAL_DATAZOOM_SPLIT_GAP = 1
const HORIZONTAL_HANDLE_ICON_WIDTH = 30
const HORIZONTAL_HANDLE_ICON_HEIGHT = 5
const VERTICAL_HANDLE_ICON_WIDTH = 5
const VERTICAL_HANDLE_ICON_HEIGHT = 30
export const DEFAULT_HORIZONTAL_RATIO = 0.8 //默认横向分割线得y占比
export const DEFAULT_VERTICAL_RATIO = 0.2 //默认竖向分割线x占比
const HORIZONTAL = 'horizontal'
const VERTICAL = 'vertical'

interface Displayables {
  sliderGroup: Group
  handle: Rect
  handleIcon: Image
}

export default class SliderSplitView extends SplitView {
  static type = 'split.slider'
  type = SliderSplitView.type

  splitModel: SliderSplitModel

  private _displayables = {} as Displayables

  private _orient: LayoutOrient

  private _hanldeEnd: number

  private _size: number[]

  private _dragging: boolean

  private _horizontalMinHandleEnd: number

  private _horizontalMaxHandleEnd: number

  init(piModel: GlobalModel, api: ExtensionAPI) {
    this.api = api
  }

  render(splitModel: SplitModel, piModel: GlobalModel, api: ExtensionAPI) {
    super.render.apply(this, arguments as any)

    this._orient = splitModel.get('orient')

    this._buildView()
  }

  private _buildView() {
    const group = this.group
    group.removeAll()
    ;(group as any).attr({ z: 99 })
    const sliderGroup = (this._displayables.sliderGroup = new Group())
    const gridRect = this._getGridRect()
    const api = this.api
    if (this._orient === VERTICAL && gridRect) {
      const clipPath = new graphic.Rect({
        shape: {
          x: gridRect.x,
          y: 0,
          width: gridRect.width,
          height: api.getHeight(),
        },
      })
      sliderGroup.setClipPath(clipPath)
    } else if (this._orient === HORIZONTAL) {
      const clipPath = new graphic.Rect({
        shape: {
          x: 0,
          y: 0,
          width: api.getWidth(),
          height: api.getHeight(),
        },
      })
      sliderGroup.setClipPath(clipPath)
    }
    group.add(sliderGroup)
    this._resetLocation()
    this._renderHandle()
  }

  private _getGridRect(): RectLike | null {
    const piModel = this.api.getModel()
    let gridRect = null
    piModel.eachComponent('grid', function (gridModel: any) {
      const grid = gridModel.coordinateSystem
      if (grid) {
        gridRect = grid.getRect()
      }
    })
    return gridRect
  }

  private _resetLocation() {
    const api = this.api
    const splitModel = this.splitModel
    let ratio = splitModel.get('ratio')
    const piSize = { width: api.getWidth(), height: api.getHeight() }
    const gridRect = this._getGridRect()

    if (this._orient === VERTICAL && gridRect) {
      this._hanldeEnd = gridRect.x
      this._size = [gridRect.x, 0]
    } else if (this._orient === HORIZONTAL) {
      const initialHandleEnd =
        this._getHorizontalDataZoomBottom() + INITIAL_DATAZOOM_SPLIT_GAP
      if (this._horizontalMinHandleEnd == null) {
        this._horizontalMinHandleEnd = this._getHorizontalDragMinHandleEnd(gridRect)
      }
      if (this._horizontalMaxHandleEnd == null) {
        this._horizontalMaxHandleEnd = initialHandleEnd
      }

      if (ratio === undefined) {
        this._hanldeEnd = initialHandleEnd
      } else {
        this._hanldeEnd = piSize.height * parseRatio(ratio, this._orient)
      }
      this._hanldeEnd = Math.max(
        this._horizontalMinHandleEnd,
        Math.min(this._hanldeEnd, this._horizontalMaxHandleEnd)
      )
      this._size = [0, this._hanldeEnd]
    } else {
      this._size = [piSize.width * parseRatio(ratio, this._orient), 0]
      this._hanldeEnd = this._size[1]
    }
  }

  private _getHorizontalDragMinHandleEnd(gridRect: RectLike | null): number {
    return gridRect ? gridRect.y : 0
  }

  private _getHorizontalDataZoomTop(): number | null {
    const api = this.api
    const piSize = { width: api.getWidth(), height: api.getHeight() }
    let trackTop: number | null = null

    api.getModel().eachComponent('dataZoom', function (dataZoomModel: any) {
      if (
        dataZoomModel.subType !== 'slider' ||
        dataZoomModel.getOrient() !== HORIZONTAL ||
        dataZoomModel.get('show') === false
      ) {
        return
      }

      const layoutRect = layout.getLayoutRect(
        layout.getLayoutParams(dataZoomModel.option),
        piSize
      )
      trackTop = layoutRect.y
    })

    return trackTop
  }

  private _getHorizontalDataZoomBottom(): number {
    const api = this.api
    const piSize = { width: api.getWidth(), height: api.getHeight() }
    let trackBottom = piSize.height

    api.getModel().eachComponent('dataZoom', function (dataZoomModel: any) {
      if (
        dataZoomModel.subType !== 'slider' ||
        dataZoomModel.getOrient() !== HORIZONTAL ||
        dataZoomModel.get('show') === false
      ) {
        return
      }

      const layoutRect = layout.getLayoutRect(
        layout.getLayoutParams(dataZoomModel.option),
        piSize
      )
      if (dataZoomModel.get('brushSelect')) {
        trackBottom =
          layoutRect.y + (dataZoomModel.get('moveHandleSize') || 0) - 0.5
      } else {
        trackBottom = layoutRect.y + layoutRect.height
      }
    })

    return trackBottom
  }

  _renderHandle() {
    const sliderGroup = this._displayables.sliderGroup
    const splitModel = this.splitModel
    const api = this.api
    const zlevel = this.splitModel.get('zlevel') || 0

    let iconStr = splitModel.get('handleIcon')
    const bRect = new Rect({
      shape: {
        x: 0,
        y: 0,
        width: this._orient === HORIZONTAL ? api.getWidth() : DEFAULT_SPLIT_GAP,
        height:
          this._orient === HORIZONTAL ? DEFAULT_SPLIT_GAP : api.getHeight(),
      },
      style: {
        fill: splitModel.get('backgroundColor'),
      },
      cursor: getCursor(this._orient),
      zlevel: zlevel,
      z2: 10000,
    })

    bRect.attr({
      x: this._orient === VERTICAL ? this._size[0] : 0,
      y: this._orient === HORIZONTAL ? this._size[1] : 0,
    })

    const handleIcon = new Image({
      style: {
        image: iconStr,
        width:
          this._orient === HORIZONTAL
            ? HORIZONTAL_HANDLE_ICON_WIDTH
            : VERTICAL_HANDLE_ICON_WIDTH,
        height:
          this._orient === HORIZONTAL
            ? HORIZONTAL_HANDLE_ICON_HEIGHT
            : VERTICAL_HANDLE_ICON_HEIGHT,
      },
      cursor: getCursor(this._orient),
      zlevel: zlevel,
      z2: 10001,
    })
    handleIcon.attr(this._getHandleIconPosition(this._hanldeEnd))
    if (this._orient !== HORIZONTAL) {
      sliderGroup.add(bRect)
    }
    sliderGroup.add(handleIcon)
    sliderGroup.attr({
      draggable: true,
      drift: bind(this._onDragMove, this),
      ondragend: bind(this._onDrageEnd, this),
    })
    this._displayables.handle = bRect
    this._displayables.handleIcon = handleIcon
  }

  private _getHandleIconPosition(handleEnd: number) {
    return this._orient === HORIZONTAL
      ? {
          x: this.api.getWidth() / 2 - HORIZONTAL_HANDLE_ICON_WIDTH / 2,
          y:
            handleEnd +
            DEFAULT_SPLIT_GAP / 2 -
            HORIZONTAL_HANDLE_ICON_HEIGHT / 2,
        }
      : {
          x:
            handleEnd +
            DEFAULT_SPLIT_GAP / 2 -
            VERTICAL_HANDLE_ICON_WIDTH / 2,
          y: this.api.getHeight() / 2 - VERTICAL_HANDLE_ICON_HEIGHT / 2,
        }
  }

  private updateInterval(delta: number): boolean {
    this._hanldeEnd += delta
    if (this._orient === HORIZONTAL) {
      this._hanldeEnd = Math.max(
        this._horizontalMinHandleEnd,
        Math.min(this._hanldeEnd, this._horizontalMaxHandleEnd)
      )
    }
    return true
  }

  private _updateView() {
    const handleEnds = this._hanldeEnd
    this._displayables.handle.attr({
      x: this._orient === VERTICAL ? handleEnds : 0,
      y: this._orient === HORIZONTAL ? handleEnds : 0,
    })
    this._displayables.handleIcon.attr(
      this._getHandleIconPosition(handleEnds)
    )
  }

  private _onDragMove(dx: number, dy: number, event: ElementEvent) {
    this._dragging = true

    eventTool.stop(event.event)

    const barTransform = this._displayables.sliderGroup.getLocalTransform()
    const vertex = applyTransform([dx, dy], barTransform, true)
    const delta = this._orient === HORIZONTAL ? vertex[1] : vertex[0]

    this.updateInterval(delta)
    if (this._boundaryDefinition()) return
    this._updateView()

    if (this._orient === VERTICAL) {
      const newX = this._hanldeEnd
      this.api.dispatchAction({
        type: 'updateYAxisPosition',
        data: { x: newX }
      })
    } else {
      const newY = this._hanldeEnd
      const ratio = newY / this.api.getHeight()
      ;(this.splitModel as any).option.ratio = ratio
      this.api.dispatchAction({
        type: 'updateUnassignedBoardPosition',
        data: { y: newY }
      })
    }
  }

  private _onDrageEnd() {
    this._dragging = false
    if (this._orient === VERTICAL) {
      const newX = this._hanldeEnd
      this.api.dispatchAction({
        type: 'updateYAxisPosition',
        data: { x: newX }
      })
    } else {
      const newY = this._hanldeEnd
      const ratio = newY / this.api.getHeight()
      ;(this.splitModel as any).option.ratio = ratio
      this.api.dispatchAction({
        type: 'updateUnassignedBoardPosition',
        data: { y: newY }
      })
    }
  }

  private _findCoordRect(): RectLike {
    let rect: RectLike

    if (!rect) {
      const width = this.api.getWidth()
      const height = this.api.getHeight()
      rect = {
        x: width,
        y: height,
        width,
        height,
      }
    }
    return rect
  }

  private _boundaryDefinition(): boolean {
    return this._orient === HORIZONTAL
      ? false
      : this._hanldeEnd <= 0 ||
          this._hanldeEnd >= this.api.getWidth() - DEFAULT_SPLIT_GAP
  }

  eachRendered(cb: (el: Element) => boolean | void) {
    traverseElements(this.group, cb)
  }

  getOrient() {
    return this._orient
  }

  getPos() {
    return this._displayables?.sliderGroup?.getBoundingRect()
  }
}

//处理占比字段
export function parseRatio(ratio: number | string, orient: LayoutOrient): number {
  let value = ratio
  if (typeof value === 'string') {
    if (value.endsWith('%')) {
      return parseFloat(value.slice(0, -1)) / 100
    }
  } else if (typeof value === 'number') {
    if (value <= 1 && value >= 0) {
      return value
    } else if (value > 1) {
      const digits = Math.floor(Math.log10(value)) + 1
      return value / Math.pow(10, digits)
    } else {
      value =
        orient === HORIZONTAL
          ? DEFAULT_HORIZONTAL_RATIO
          : DEFAULT_VERTICAL_RATIO
    }
  }
  return orient === HORIZONTAL
    ? DEFAULT_HORIZONTAL_RATIO
    : DEFAULT_VERTICAL_RATIO
}

function getCursor(orient: LayoutOrient) {
  return orient == 'vertical' ? 'col-resize' : 'row-resize'
}
