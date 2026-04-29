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

const DEFAULT_SPLIT_GAP = 4
export const DEFAULT_HORIZONTAL_RATIO = 0.8 //默认横向分割线得y占比
export const DEFAULT_VERTICAL_RATIO = 0.2 //默认竖向分割线x占比
const HORIZONTAL = 'horizontal'
const VERTICAL = 'vertical'
const BOUNDARY = 50

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
    const sliderGroup = (this._displayables.sliderGroup = new Group())
    group.add(sliderGroup)
    this._resetLocation()
    this._renderHandle()
  }

  private _resetLocation() {
    const api = this.api
    const splitModel = this.splitModel
    const ratio = splitModel.get('ratio')
    const piSize = { width: api.getWidth(), height: api.getHeight() }
    this._size =
      this._orient === HORIZONTAL
        ? [0, piSize.height * parseRatio(ratio, this._orient)]
        : [piSize.width * parseRatio(ratio, this._orient), 0]
    this._hanldeEnd =
      this._orient === HORIZONTAL ? this._size[0] : this._size[1]
  }

  _renderHandle() {
    const sliderGroup = this._displayables.sliderGroup
    const splitModel = this.splitModel
    const api = this.api

    let iconStr = splitModel.get('handleIcon')
    const bRect = new Rect({
      shape: {
        x: this._size[0],
        y: this._size[1],
        width: this._orient === HORIZONTAL ? api.getWidth() : DEFAULT_SPLIT_GAP,
        height:
          this._orient === HORIZONTAL ? DEFAULT_SPLIT_GAP : api.getHeight(),
      },
      style: {
        fill: splitModel.get('backgroundColor'),
      },
      cursor: getCursor(this._orient),
    })

    const handleIcon = new Image({
      style: {
        image: iconStr,
      },
      cursor: getCursor(this._orient),
    })
    handleIcon.attr({
      x:
        this._orient === HORIZONTAL
          ? bRect.getBoundingRect().width / 2 - handleIcon.getWidth() / 2
          : this._size[0],
      y:
        this._orient === HORIZONTAL
          ? this._size[1]
          : bRect.getBoundingRect().height / 2 - handleIcon.getHeight() / 2,
    })
    sliderGroup.add(bRect)
    sliderGroup.add(handleIcon)
    sliderGroup.attr({
      draggable: true,
      drift: bind(this._onDragMove, this),
      ondragend: bind(this._onDrageEnd, this),
    })
    this._displayables.handle = bRect
    this._displayables.handleIcon = handleIcon
  }

  private updateInterval(delta: number): boolean {
    this._hanldeEnd += delta
    return true
  }

  private _updateView() {
    const handleEnds = this._hanldeEnd
    this._displayables.handle.attr({
      x: this._orient === HORIZONTAL ? 0 : handleEnds,
      y: this._orient === HORIZONTAL ? handleEnds : 0,
    })
    this._displayables.handleIcon.attr({
      x:
        this._orient === HORIZONTAL
          ? this._displayables.handle.getBoundingRect().width / 2
          : this._size[0] + handleEnds,
      y:
        this._orient === HORIZONTAL
          ? this._size[1] + handleEnds
          : this._displayables.handle.getBoundingRect().height / 2,
    })
    this.api.dispatchAction({
      type: 'updateLayerout',
      data: {
        orient: this._orient,
        displayables: this._displayables.sliderGroup,
      },
    })
  }

  private _onDragMove(dx: number, dy: number, event: ElementEvent) {
    this._dragging = true

    eventTool.stop(event.event)

    const barTransform = this._displayables.sliderGroup.getLocalTransform()
    const vertex = applyTransform([dx, dy], barTransform, true)
    this.updateInterval(this._orient === HORIZONTAL ? vertex[1] : vertex[0])
    if (this._boundaryDefinition()) return
    this._updateView()
  }

  private _onDrageEnd() {
    this._dragging = false
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
      ? this._size[1] + this._hanldeEnd <= 0 ||
          this._size[1] + this._hanldeEnd >= this.api.getHeight() - BOUNDARY
      : this._size[0] + this._hanldeEnd <= 0 ||
          this._size[0] + this._hanldeEnd >= this.api.getWidth() - BOUNDARY
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
function parseRatio(ratio: number | string, orient: LayoutOrient): number {
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
