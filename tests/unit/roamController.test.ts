import { afterEach, describe, expect, it, vi } from 'vitest'

async function createController() {
  // ZRender resolves browser globals when its modules are first loaded.
  // Force its Node branch in this non-DOM unit test.
  vi.stubGlobal('navigator', undefined)
  const [{ default: Eventful }, { default: RoamController }] =
    await Promise.all([
      import('zrender/src/core/Eventful'),
      import('../../src/component/helper/RoamController'),
    ])
  return new RoamController(new Eventful() as any)
}

function createWheelEvent(wheelDelta: number) {
  return {
    wheelDelta,
    offsetX: 10,
    offsetY: 10,
    event: {
      shiftKey: false,
      ctrlKey: false,
      altKey: false,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    },
    gestureEvent: null,
    target: null,
  }
}

function createPointerEvent(x: number, y: number) {
  return {
    offsetX: x,
    offsetY: y,
    event: {
      shiftKey: false,
      ctrlKey: false,
      altKey: false,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    },
    gestureEvent: null,
    target: null,
  }
}

describe('RoamController wheel rAF coalescing', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('coalesces wheel movement to one event per animation frame', async () => {
    let scheduledFrame: FrameRequestCallback | null = null
    const requestFrame = vi.fn((callback: FrameRequestCallback) => {
      scheduledFrame = callback
      return 1
    })
    vi.stubGlobal('requestAnimationFrame', requestFrame)
    vi.stubGlobal('cancelAnimationFrame', vi.fn())

    const controller = await createController()
    controller.enable('scale', {
      zoomOnMouseWheel: false,
      moveOnMouseWheel: true,
    })
    controller.setPointerChecker(() => true)

    const movements: number[] = []
    controller.on('scrollMove', (event) => {
      movements.push(event.scrollDelta)
    })

    const wheelEvent = createWheelEvent(-4)
    const handleWheel = (controller as any)._mousewheelHandler.bind(
      controller,
    )

    handleWheel(wheelEvent)
    handleWheel(wheelEvent)
    handleWheel(wheelEvent)

    expect(requestFrame).toHaveBeenCalledTimes(1)
    expect(movements).toEqual([])

    ;(scheduledFrame as FrameRequestCallback)(0)

    expect(movements).toHaveLength(1)
    expect(movements[0]).toBeCloseTo(-1.2)

    handleWheel(createWheelEvent(4))
    ;(scheduledFrame as FrameRequestCallback)(16)

    expect(movements).toHaveLength(2)
    expect(movements[1]).toBeCloseTo(0.4)
    controller.dispose()
  })

  it('cancels a pending wheel frame when disabled', async () => {
    const cancelFrame = vi.fn()
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn(() => 7),
    )
    vi.stubGlobal('cancelAnimationFrame', cancelFrame)

    const controller = await createController()
    controller.enable('scale', {
      zoomOnMouseWheel: false,
      moveOnMouseWheel: true,
    })
    controller.setPointerChecker(() => true)

    ;(controller as any)._mousewheelHandler(createWheelEvent(-4))
    controller.disable()

    expect(cancelFrame).toHaveBeenCalledWith(7)
  })

  it('coalesces pointer pan movement to one event per animation frame', async () => {
    let scheduledFrame: FrameRequestCallback | null = null
    const requestFrame = vi.fn((callback: FrameRequestCallback) => {
      scheduledFrame = callback
      return 1
    })
    vi.stubGlobal('requestAnimationFrame', requestFrame)
    vi.stubGlobal('cancelAnimationFrame', vi.fn())

    const controller = await createController()
    controller.enable('pan')

    const pans: Array<{ oldX: number; newX: number }> = []
    controller.on('pan', (event) => {
      pans.push({ oldX: event.oldX, newX: event.newX })
    })

    ;(controller as any)._dragging = true
    ;(controller as any)._x = 10
    ;(controller as any)._y = 10
    const move = (controller as any)._mousemoveHandler.bind(controller)

    move(createPointerEvent(20, 20))
    move(createPointerEvent(30, 30))

    expect(requestFrame).toHaveBeenCalledTimes(1)
    expect(pans).toEqual([])

    ;(scheduledFrame as FrameRequestCallback)(0)

    expect(pans).toEqual([{ oldX: 10, newX: 30 }])
    controller.dispose()
  })

  it('flushes pending pan when the pointer is released', async () => {
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn(() => 9),
    )
    const cancelFrame = vi.fn()
    vi.stubGlobal('cancelAnimationFrame', cancelFrame)

    const controller = await createController()
    controller.enable('pan')

    const pans: number[] = []
    controller.on('pan', (event) => {
      pans.push(event.newX)
    })

    ;(controller as any)._dragging = true
    ;(controller as any)._x = 10
    ;(controller as any)._y = 10
    ;(controller as any)._mousemoveHandler(
      createPointerEvent(40, 30),
    )
    ;(controller as any)._mouseupHandler({ which: 1 })

    expect(cancelFrame).toHaveBeenCalledWith(9)
    expect(pans).toEqual([40])
    controller.dispose()
  })
})
