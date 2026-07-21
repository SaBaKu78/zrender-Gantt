import { Easing, Group, Tween } from '@tweenjs/tween.js'

type TweenTarget = Record<string, any>
type ElementLike = Record<string, any>

export interface ZTweenElementProps {
  /** 动画目标元素的 shape 属性，例如 x、y、width、height、r。 */
  shape?: TweenTarget
  /** 动画目标元素的 style 属性，例如 opacity、lineWidth、fill、stroke。 */
  style?: TweenTarget
  /** 动画目标元素的位移属性，格式为 [x, y]。 */
  position?: number[]
  /** 动画目标元素的缩放属性，格式为 [scaleX, scaleY]。 */
  scale?: number[]
  /** 动画目标元素的旋转角度，单位使用 zrender 的 rotation 值。 */
  rotation?: number
}

export interface ZTweenOptions<T extends TweenTarget> {
  /** 动画持续时间，单位毫秒，默认 300。 */
  duration?: number
  /** 动画延迟开始时间，单位毫秒。 */
  delay?: number
  /** 缓动函数，默认 Easing.Quadratic.Out。 */
  easing?: (amount: number) => number
  /** 循环控制。true 表示无限循环，number 表示循环次数。 */
  loop?: boolean | number
  /** tweenjs 原生重复次数。优先级高于 loop。 */
  repeat?: number
  /** 每次重复之间的等待时间，单位毫秒。 */
  repeatDelay?: number
  /** 是否往返播放。true 表示正向播放后再反向回到起点。 */
  yoyo?: boolean
  /** 动画开始时触发。 */
  onStart?: (target: T) => void
  /** 动画每帧更新时触发。elapsed 为当前动画进度。 */
  onUpdate?: (target: T, elapsed: number) => void
  /** 动画完整结束时触发。循环动画不会自然触发，除非循环次数有限。 */
  onComplete?: (target: T) => void
  /** 动画被 stop 时触发。 */
  onStop?: (target: T) => void
}

export interface FadePresetOptions extends ZTweenOptions<TweenTarget> {
  /** 淡入开始透明度，fadeIn 默认 0。 */
  fromOpacity?: number
  /** 目标透明度，fadeIn 默认 1，fadeOut 默认 0。 */
  toOpacity?: number
}

export interface PulsePresetOptions extends ZTweenOptions<TweenTarget> {
  /** 脉冲最低透明度，默认 0.35，数值越小闪烁越明显。 */
  minOpacity?: number
  /** 停止动画时是否恢复到开始前透明度，默认 true。 */
  restore?: boolean
}

export interface BreathePresetOptions extends ZTweenOptions<TweenTarget> {
  /** 呼吸幅度，默认 0.04，表示放大到原始缩放的 1.04 倍。 */
  amplitude?: number
  /** 自定义目标横向缩放值。设置后优先级高于 amplitude。 */
  scaleX?: number
  /** 自定义目标纵向缩放值。设置后优先级高于 amplitude。 */
  scaleY?: number
  /** 停止动画时是否恢复到开始前缩放，默认 true。 */
  restore?: boolean
}

export interface ScanXPresetOptions extends ZTweenOptions<TweenTarget> {
  /** 扫描线起始 x 坐标。设置后会覆盖 scanX 方法入参 fromX。 */
  fromX?: number
  /** 扫描线结束 x 坐标。设置后会覆盖 scanX 方法入参 toX。 */
  toX?: number
}

export interface HighlightPresetOptions extends ZTweenOptions<TweenTarget> {
  /** 高亮时线宽增加量，默认 1。 */
  lineWidthDelta?: number
  /** 高亮时目标透明度，默认 0.72。 */
  opacity?: number
  /** 停止动画时是否恢复到开始前线宽和透明度，默认 true。 */
  restore?: boolean
}

export class ZTweenManager {
  private _group = new Group()

  readonly presets = {
    fadeIn: (
      element: ElementLike,
      options: FadePresetOptions = {}
    ) => {
      this._setElementStyle(element, { opacity: options.fromOpacity ?? 0 })
      return this.animateElement(
        element,
        { style: { opacity: options.toOpacity ?? 1 } },
        { duration: 240, ...options }
      )
    },

    fadeOut: (
      element: ElementLike,
      options: FadePresetOptions = {}
    ) => {
      return this.animateElement(
        element,
        { style: { opacity: options.toOpacity ?? 0 } },
        { duration: 240, ...options }
      )
    },

    pulse: (
      element: ElementLike,
      options: PulsePresetOptions = {}
    ) => {
      const opacity = this._getElementStyle(element).opacity ?? 1
      return this.animateElement(
        element,
        { style: { opacity: options.minOpacity ?? 0.35 } },
        {
          duration: 700,
          loop: true,
          yoyo: true,
          easing: Easing.Sinusoidal.InOut,
          ...options,
          onStop: (target) => {
            if (options.restore !== false) {
              this._setElementStyle(element, { opacity })
            }
            options.onStop?.(target)
          },
        }
      )
    },

    breathe: (
      element: ElementLike,
      options: BreathePresetOptions = {}
    ) => {
      const scale = element.scale ? element.scale.slice() : [1, 1]
      const amplitude = options.amplitude ?? 0.04
      const scaleX = options.scaleX ?? scale[0] * (1 + amplitude)
      const scaleY = options.scaleY ?? scale[1] * (1 + amplitude)
      return this.animateElement(
        element,
        { scale: [scaleX, scaleY] },
        {
          duration: 900,
          loop: true,
          yoyo: true,
          easing: Easing.Sinusoidal.InOut,
          ...options,
          onStop: (target) => {
            if (options.restore !== false) {
              this._setElementAttrs(element, { scale })
            }
            options.onStop?.(target)
          },
        }
      )
    },

    scanX: (
      element: ElementLike,
      fromX: number,
      toX: number,
      options: ScanXPresetOptions = {}
    ) => {
      const startX = options.fromX ?? fromX
      const endX = options.toX ?? toX
      this._setElementShape(element, { x: startX })
      return this.animateElement(
        element,
        { shape: { x: endX } },
        {
          duration: 1000,
          loop: true,
          easing: Easing.Linear.None,
          ...options,
        }
      )
    },

    highlight: (
      element: ElementLike,
      options: HighlightPresetOptions = {}
    ) => {
      const style = this._getElementStyle(element)
      const lineWidth = style.lineWidth ?? 1
      const opacity = style.opacity ?? 1
      return this.animateElement(
        element,
        {
          style: {
            lineWidth: lineWidth + (options.lineWidthDelta ?? 1),
            opacity: options.opacity ?? 0.72,
          },
        },
        {
          duration: 260,
          repeat: 1,
          yoyo: true,
          easing: Easing.Quadratic.Out,
          ...options,
          onStop: (target) => {
            if (options.restore !== false) {
              this._setElementStyle(element, { lineWidth, opacity })
            }
            options.onStop?.(target)
          },
        }
      )
    },
  }

  constructor(private _requestFrame?: () => void) {}

  animate<T extends TweenTarget>(
    target: T,
    to: Partial<T>,
    options: ZTweenOptions<T> = {}
  ): Tween<T> {
    const tween = new Tween(target, this._group)
      .to(to, options.duration ?? 300)
      .easing(options.easing ?? Easing.Quadratic.Out)

    if (options.delay) {
      tween.delay(options.delay)
    }

    const repeat = this._getRepeatCount(options)
    if (repeat > 0 || repeat === Infinity) {
      tween.repeat(repeat)
    }

    if (options.repeatDelay != null) {
      tween.repeatDelay(options.repeatDelay)
    }

    if (options.yoyo) {
      tween.yoyo(true)
    }

    if (options.onStart) {
      tween.onStart(() => options.onStart(target))
    }

    if (options.onUpdate) {
      tween.onUpdate((object, elapsed) => options.onUpdate(object as T, elapsed))
    }

    if (options.onComplete) {
      tween.onComplete((object) => options.onComplete(object as T))
    }

    if (options.onStop) {
      tween.onStop((object) => options.onStop(object as T))
    }

    tween.start()
    this._requestFrame?.()
    return tween
  }

  animateElement(
    element: ElementLike,
    props: ZTweenElementProps,
    options: ZTweenOptions<TweenTarget> = {}
  ): Tween<TweenTarget> {
    const state = this._createElementTweenState(element, props)
    const to = state.to

    return this.animate(state.current, to, {
      ...options,
      onUpdate: (target, elapsed) => {
        this._applyElementTweenState(element, target, state)
        options.onUpdate?.(target, elapsed)
      },
      onComplete: (target) => {
        this._applyElementTweenState(element, target, state)
        options.onComplete?.(target)
      },
    })
  }

  private _getRepeatCount<T extends TweenTarget>(
    options: ZTweenOptions<T>
  ): number {
    if (options.repeat != null) {
      return options.repeat
    }

    if (options.loop === true) {
      return Infinity
    }

    if (typeof options.loop === 'number') {
      return Math.max(0, options.loop)
    }

    return 0
  }

  add(...tweens: Tween[]): void {
    this._group.add(...tweens)
    this._requestFrame?.()
  }

  remove(...tweens: Tween[]): void {
    this._group.remove(...tweens)
  }

  stop(tween: Tween): void {
    tween.stop()
    this._group.remove(tween)
  }

  stopAll(): void {
    this._group.getAll().forEach((tween) => tween.stop())
    this._group.removeAll()
  }

  update(time?: number): void {
    this._group.update(time)
  }

  hasActive(): boolean {
    return !this._group.allStopped()
  }

  private _createElementTweenState(
    element: ElementLike,
    props: ZTweenElementProps
  ): {
    current: TweenTarget
    to: TweenTarget
    shapeKeys: string[]
    styleKeys: string[]
    positionLength: number
    scaleLength: number
    hasRotation: boolean
  } {
    const current: TweenTarget = {}
    const to: TweenTarget = {}
    const shape = this._getElementShape(element)
    const style = this._getElementStyle(element)
    const shapeKeys = Object.keys(props.shape || {})
    const styleKeys = Object.keys(props.style || {})
    const positionLength = props.position?.length || 0
    const scaleLength = props.scale?.length || 0
    const hasRotation = props.rotation != null

    shapeKeys.forEach((key) => {
      const stateKey = `shape.${key}`
      current[stateKey] = shape[key] ?? 0
      to[stateKey] = props.shape[key]
    })

    styleKeys.forEach((key) => {
      const stateKey = `style.${key}`
      current[stateKey] = style[key] ?? 0
      to[stateKey] = props.style[key]
    })

    for (let i = 0; i < positionLength; i++) {
      const stateKey = `position.${i}`
      current[stateKey] = element.position?.[i] ?? 0
      to[stateKey] = props.position[i]
    }

    for (let i = 0; i < scaleLength; i++) {
      const stateKey = `scale.${i}`
      current[stateKey] = element.scale?.[i] ?? 1
      to[stateKey] = props.scale[i]
    }

    if (hasRotation) {
      current.rotation = element.rotation ?? 0
      to.rotation = props.rotation
    }

    return {
      current,
      to,
      shapeKeys,
      styleKeys,
      positionLength,
      scaleLength,
      hasRotation,
    }
  }

  private _applyElementTweenState(
    element: ElementLike,
    target: TweenTarget,
    state: {
      shapeKeys: string[]
      styleKeys: string[]
      positionLength: number
      scaleLength: number
      hasRotation: boolean
    }
  ): void {
    if (state.shapeKeys.length) {
      const shape: TweenTarget = {}
      state.shapeKeys.forEach((key) => {
        shape[key] = target[`shape.${key}`]
      })
      this._setElementShape(element, shape)
    }

    if (state.styleKeys.length) {
      const style: TweenTarget = {}
      state.styleKeys.forEach((key) => {
        style[key] = target[`style.${key}`]
      })
      this._setElementStyle(element, style)
    }

    const attrs: TweenTarget = {}
    if (state.positionLength) {
      attrs.position = []
      for (let i = 0; i < state.positionLength; i++) {
        attrs.position[i] = target[`position.${i}`]
      }
    }

    if (state.scaleLength) {
      attrs.scale = []
      for (let i = 0; i < state.scaleLength; i++) {
        attrs.scale[i] = target[`scale.${i}`]
      }
    }

    if (state.hasRotation) {
      attrs.rotation = target.rotation
    }

    if (Object.keys(attrs).length) {
      this._setElementAttrs(element, attrs)
    }
  }

  private _getElementShape(element: ElementLike): TweenTarget {
    return element.shape || {}
  }

  private _getElementStyle(element: ElementLike): TweenTarget {
    return element.style || {}
  }

  private _setElementShape(element: ElementLike, shape: TweenTarget): void {
    if (element.setShape) {
      element.setShape(shape)
    } else {
      element.shape = { ...(element.shape || {}), ...shape }
    }
  }

  private _setElementStyle(element: ElementLike, style: TweenTarget): void {
    if (element.setStyle) {
      element.setStyle(style)
    } else {
      element.style = { ...(element.style || {}), ...style }
    }
  }

  private _setElementAttrs(element: ElementLike, attrs: TweenTarget): void {
    if (element.attr) {
      element.attr(attrs)
    } else {
      Object.assign(element, attrs)
    }
  }
}

export { Easing, Tween }

export default ZTweenManager
