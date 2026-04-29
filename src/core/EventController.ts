import { ZRenderType } from 'zrender/src/zrender'
import Eventful from 'zrender/lib/core/Eventful'
import { bind, Bind3, clone, defaults, isString } from 'zrender/src/core/util'
import { ZRElementEvent } from '../util/types'
import * as eventTool from 'zrender/src/core/event'

export type CtrType = boolean | 'pan' | 'move'

interface EventOption {
  zoomOnMouseWheel?: boolean | 'ctrl' | 'shift' | 'alt'
  moveOnMouseMove?: boolean | 'ctrl' | 'shift' | 'alt'
  moveOnMouseWheel?: boolean | 'ctrl' | 'shift' | 'alt'
  /**
   * If fixed the page when pan
   */
  preventDefaultMouseMove?: boolean
}

type EventType = keyof EventParams

type EventBehavior = 'moveOnMouseMove'

export interface EventParams {
  'pan': {
    dx: number
    dy: number
    oldX: number
    oldY: number
    newX: number
    newY: number
    isAvailableBehavior: Bind3<
      typeof isAvailableBehavior,
      null,
      EventBehavior,
      ZRElementEvent
    >
  }
}

class EventController extends Eventful<{
  [key in keyof EventParams]: (params: EventParams[key]) => void | undefined
}> {
  pointerChecker: (e: ZRElementEvent, x: number, y: number) => boolean

  private _zr: ZRenderType

  private _opt: Required<EventOption>

  private _dragging: boolean

  private _x: number

  private _y: number

  readonly enable: (
    this: this,
    controlType: CtrType,
    opt?: EventOption
  ) => void

  readonly disable: () => void

  constructor(zr: ZRenderType) {
    super()

    this._zr = zr
    const mousedownHanlder = bind(this._mousedownHanlder, this)

    const mousemoveHanlder = bind(this._mousemoveHanlder, this)

    const mouseupHanlder = bind(this._mouseupHanlder, this)

    this.enable = function (controlType, opt) {
      this.disable()

      this._opt = defaults(clone(opt) || {}, {
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        // By default, wheel do not trigger move.
        moveOnMouseWheel: false,
        preventDefaultMouseMove: true,
      })

      if (
        controlType == null ||
        controlType === 'move' ||
        controlType === 'pan'
      ) {
        controlType = true
      }

      if (controlType === true) {
        zr.on('mousedown', mousedownHanlder)
        zr.on('mousemove', mousemoveHanlder)
        zr.on('mouseup', mouseupHanlder)
      }
    }

    this.disable = function () {
      zr.off('mousedown', mousedownHanlder)
      zr.off('mousemove', mousemoveHanlder)
      zr.off('mouseup', mouseupHanlder)
    }
  }

  dispose() {
    this.disable()
  }

  isDragging() {
    return this._dragging
  }

  setPointerChecker(pointerChecker: EventController['pointerChecker']) {
    this.pointerChecker = pointerChecker
  }

  private _mousedownHanlder(e: ZRElementEvent) {
    if (eventTool.isMiddleOrRightButtonOnMouseUpDown(e)) {
      return
    }

    let el = e.target
    while (el) {
      if (el.draggable) {
        return
      }
      // check if host is draggable
      el = el.__hostTarget || el.parent
    }

    const x = e.offsetX
    const y = e.offsetY
    //TODO：鼠标是否点击于有效范围内否则不开启
    this._x = x
    this._y = y
    this._dragging = true
  }

  private _mousemoveHanlder(e: ZRElementEvent) {
    if (
      !this._dragging ||
      !isAvailableBehavior('moveOnMouseMove', e, this._opt) ||
      e.gestureEvent === 'pinch'
    ) {
      return
    }
    const x = e.offsetX
    const y = e.offsetY

    const oldX = this._x
    const oldY = this._y

    const dx = x - oldX
    const dy = y - oldY

    this._x = x
    this._y = y

    this._opt.preventDefaultMouseMove && eventTool.stop(e.event)

    trigger(this, 'pan', 'moveOnMouseMove', e, {
      dx: dx, dy: dy, oldX: oldX, oldY: oldY, newX: x, newY: y, isAvailableBehavior: null
    })
  }

  private _mouseupHanlder(e: ZRElementEvent) {
    if (!eventTool.isMiddleOrRightButtonOnMouseUpDown(e)) {
      this._dragging = false
    }
  }
}

function isAvailableBehavior(
  behaviorToCheck: EventBehavior,
  e: ZRElementEvent,
  settings: Pick<EventOption, EventBehavior>
) {
  const setting = settings[behaviorToCheck]
  return (
    !behaviorToCheck ||
    (setting &&
      (!isString(setting) ||
        e.event[(setting + 'Key') as 'shiftKey' | 'ctrlKey' | 'altKey']))
  )
}

function trigger<T extends EventType>(
  controller: EventController,
  eventName: T,
  behaviorToCheck: EventBehavior,
  e: ZRElementEvent,
  contollerEvent: EventParams[T]
) {
  contollerEvent.isAvailableBehavior = bind(isAvailableBehavior, null, behaviorToCheck, e)
  ;(controller as any).trigger(eventName, contollerEvent)
}
export default EventController
