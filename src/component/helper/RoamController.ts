import Eventful from 'zrender/src/core/Eventful'
import { bind, Bind3, clone, defaults, isString } from 'zrender/src/core/util'
import { RoamOptionMixin, ZRElementEvent } from '../../util/types'
import * as eventTool from 'zrender/src/core/event'
import { ZRenderType } from 'zrender'
import * as interactionMutex from './interactionMutex'

export type RoamType = RoamOptionMixin['roam']

interface RoamOption {
  zoomOnMouseWheel?: boolean | 'ctrl' | 'shift' | 'alt'
  moveOnMouseMove?: boolean | 'ctrl' | 'shift' | 'alt'
  moveOnMouseWheel?: boolean | 'ctrl' | 'shift' | 'alt'
  /**
   * If fixed the page when pan
   */
  preventDefaultMouseMove?: boolean
}

type RoamEventType = keyof RoamEventParams

type RoamBehavior = 'zoomOnMouseWheel' | 'moveOnMouseMove' | 'moveOnMouseWheel'

export interface RoamEventParams {
  zoom: {
    scale: number
    originX: number
    originY: number

    isAvailableBehavior: Bind3<
      typeof isAvailableBehavior,
      null,
      RoamBehavior,
      ZRElementEvent
    >
  }

  scrollMove: {
    scrollDelta: number
    originX: number
    originY: number

    isAvailableBehavior: Bind3<
      typeof isAvailableBehavior,
      null,
      RoamBehavior,
      ZRElementEvent
    >
  }

  pan: {
    dx: number
    dy: number
    oldX: number
    oldY: number
    newX: number
    newY: number

    isAvailableBehavior: Bind3<
      typeof isAvailableBehavior,
      null,
      RoamBehavior,
      ZRElementEvent
    >
  }
}

class RoamController extends Eventful<{
  [key in keyof RoamEventParams]: (
    params: RoamEventParams[key],
  ) => void | undefined
}> {
  pointerChecker: (e: ZRElementEvent, x: number, y: number) => boolean

  private _zr: ZRenderType

  private _opt: Required<RoamOption>

  private _dragging: boolean

  private _x: number

  private _y: number

  readonly enable: (
    this: this,
    controlType?: RoamType,
    opt?: RoamOption,
  ) => void

  readonly disable: () => void

  constructor(zr: ZRenderType) {
    super()

    this._zr = zr

    const mousedownHandler = bind(this._mousedownHandler, this)
    const mousemoveHandler = bind(this._mousemoveHandler, this)
    const mouseupHandler = bind(this._mouseupHandler, this)
    const mousewheelHandler = bind(this._mousewheelHandler, this)

    this.enable = function (controlType, opt) {
      // Disable previous first
      this.disable()

      this._opt = defaults(clone(opt) || {}, {
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        // By default, wheel do not trigger move.
        moveOnMouseWheel: false,
        preventDefaultMouseMove: true,
      })

      if (controlType == null) {
        controlType = true
      }

      if (
        controlType === true ||
        controlType === 'move' ||
        controlType === 'pan'
      ) {
        zr.on('mousedown', mousedownHandler)
        zr.on('mousemove', mousemoveHandler)
        zr.on('mouseup', mouseupHandler)
      }
      if (
        controlType === true ||
        controlType === 'scale' ||
        controlType === 'zoom'
      ) {
        zr.on('mousewheel', mousewheelHandler)
        // zr.on('pinch', pinchHandler)
      }
    }

    this.disable = function () {
      zr.off('mousedown', mousedownHandler)
      zr.off('mousemove', mousemoveHandler)
      zr.off('mouseup', mouseupHandler)
      zr.off('mousewheel', mousewheelHandler)
      // zr.off('pinch', pinchHandler)
    }
  }

  isDragging() {
    return this._dragging
  }

  setPointerChecker(pointerChecker: RoamController['pointerChecker']) {
    this.pointerChecker = pointerChecker
  }

  dispose() {
    this.disable()
  }

  private _mousedownHandler(e: ZRElementEvent) {
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
    // Only check on mosedown, but not mousemove.
    // Mouse can be out of target when mouse moving.
    if (this.pointerChecker && this.pointerChecker(e, x, y)) {
      this._x = x
      this._y = y
      this._dragging = true
    }
  }

  private _mousemoveHandler(e: ZRElementEvent) {
    if (
      !this._dragging ||
      !isAvailableBehavior('moveOnMouseMove', e, this._opt) ||
      e.gestureEvent === 'pinch' ||
      interactionMutex.isTaken(this._zr, 'globalPan')
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
      dx: dx,
      dy: dy,
      oldX: oldX,
      oldY: oldY,
      newX: x,
      newY: y,
      isAvailableBehavior: null,
    })
  }

  private _mouseupHandler(e: ZRElementEvent) {
    if (!eventTool.isMiddleOrRightButtonOnMouseUpDown(e)) {
      this._dragging = false
    }
  }

  private _mousewheelHandler(e: ZRElementEvent) {
    const shouldZoom = isAvailableBehavior('zoomOnMouseWheel', e, this._opt)
    const shouldMove = isAvailableBehavior('moveOnMouseWheel', e, this._opt)
    const wheelDelta = e.wheelDelta
    const absWheelDeltaDelta = Math.abs(wheelDelta)
    const originX = e.offsetX
    const originY = e.offsetY
    // wheelDelta maybe -0 in chrome mac.
    if (wheelDelta === 0 || (!shouldZoom && !shouldMove)) {
      return
    }

    if (shouldZoom) {
      const factor =
        absWheelDeltaDelta > 3 ? 1.4 : absWheelDeltaDelta > 1 ? 1.2 : 1.1
      const scale = wheelDelta > 0 ? factor : 1 / factor
      checkPointerAndTrigger(this, 'zoom', 'zoomOnMouseWheel', e, {
        scale: scale,
        originX: originX,
        originY: originY,
        isAvailableBehavior: null,
      })
    }

    if (shouldMove) {
      const absDelta = Math.abs(wheelDelta)
      // wheelDelta of mouse wheel is bigger than touch pad.
      const scrollDelta =
        (wheelDelta > 0 ? 1 : -1) *
        (absDelta > 3 ? 0.4 : absDelta > 1 ? 0.15 : 0.05)
      checkPointerAndTrigger(this, 'scrollMove', 'moveOnMouseWheel', e, {
        scrollDelta: scrollDelta,
        originX: originX,
        originY: originY,
        isAvailableBehavior: null,
      })
    }
  }
}

function isAvailableBehavior(
  behaviorToCheck: RoamBehavior,
  e: ZRElementEvent,
  settings: Pick<RoamOption, RoamBehavior>,
) {
  const setting = settings[behaviorToCheck]
  return (
    !behaviorToCheck ||
    (setting &&
      (!isString(setting) ||
        e.event[(setting + 'Key') as 'shiftKey' | 'ctrlKey' | 'altKey']))
  )
}

function trigger<T extends RoamEventType>(
  controller: RoamController,
  eventName: T,
  behaviorToCheck: RoamBehavior,
  e: ZRElementEvent,
  contollerEvent: RoamEventParams[T],
) {
  // Also provide behavior checker for event listener, for some case that
  // multiple components share one listener.
  contollerEvent.isAvailableBehavior = bind(
    isAvailableBehavior,
    null,
    behaviorToCheck,
    e,
  )
  // TODO should not have type issue.
  ;(controller as any).trigger(eventName, contollerEvent)
}

function checkPointerAndTrigger<T extends 'scrollMove' | 'zoom'>(
  controller: RoamController,
  eventName: T,
  behaviorToCheck: RoamBehavior,
  e: ZRElementEvent,
  contollerEvent: RoamEventParams[T],
) {
  if (
    controller.pointerChecker &&
    controller.pointerChecker(e, contollerEvent.originX, contollerEvent.originY)
  ) {
    eventTool.stop(e.event)

    trigger(controller, eventName, behaviorToCheck, e, contollerEvent)
  }
}

export default RoamController
