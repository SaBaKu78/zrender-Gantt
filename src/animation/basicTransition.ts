import { Element, ElementAnimateConfig, ElementProps } from 'zrender'
import Model from '../model/Model'
import {
  AnimationDelayCallbackParam,
  AnimationOption,
  AnimationOptionMixin,
  PayloadAnimationPart,
} from '../util/types'
import { AnimationEasing } from 'zrender/lib/animation/easing'
import { isFunction, isObject, retrieve2 } from 'zrender/lib/core/util'

type AnimateOrSetPropsOption = {
  dataIndex?: number
  cb?: () => void
  during?: (percent: number) => void
  removeOpt?: AnimationOption
  isFrom?: boolean
}

export function getAnimationConfig(
  animationType: 'enter' | 'update' | 'leave',
  animatableModel: Model<AnimationOptionMixin>,
  dataIndex: number,
  // Extra opts can override the option in animatable model.
  extraOpts?: Pick<ElementAnimateConfig, 'easing' | 'duration' | 'delay'>,
  // TODO It's only for pictorial bar now.
  extraDelayParams?: unknown
): Pick<ElementAnimateConfig, 'easing' | 'duration' | 'delay'> | null {
  let animationPayload: PayloadAnimationPart
  // Check if there is global animation configuration from dataZoom/resize can override the config in option.
  // If animation is enabled. Will use this animation config in payload.
  // If animation is disabled. Just ignore it.
  if (animatableModel && animatableModel.piModel) {
    const updatePayload = animatableModel.piModel.getUpdatePayload()
    animationPayload = (updatePayload &&
      updatePayload.animation) as PayloadAnimationPart
  }
  const animationEnabled =
    animatableModel && animatableModel.isAnimationEnabled()

  const isUpdate = animationType === 'update'

  if (animationEnabled) {
    let duration: number | Function
    let easing: AnimationEasing
    let delay: number | Function
    if (extraOpts) {
      duration = retrieve2(extraOpts.duration, 200)
      easing = retrieve2(extraOpts.easing, 'cubicOut')
      delay = 0
    } else {
      duration = animatableModel.getShallow(
        isUpdate ? 'animationDurationUpdate' : 'animationDuration'
      )
      easing = animatableModel.getShallow(
        isUpdate ? 'animationEasingUpdate' : 'animationEasing'
      )
      delay = animatableModel.getShallow(
        isUpdate ? 'animationDelayUpdate' : 'animationDelay'
      )
    }
    // animation from payload has highest priority.
    if (animationPayload) {
      animationPayload.duration != null &&
        (duration = animationPayload.duration)
      animationPayload.easing != null && (easing = animationPayload.easing)
      animationPayload.delay != null && (delay = animationPayload.delay)
    }
    if (isFunction(delay)) {
      delay = delay(dataIndex as number, extraDelayParams)
    }
    if (isFunction(duration)) {
      duration = duration(dataIndex as number)
    }
    const config = {
      duration: (duration as number) || 0,
      delay: delay as number,
      easing,
    }

    return config
  } else {
    return null
  }
}

export function initProps<Props extends ElementProps>(
  el: Element<Props>,
  props: Props,
  animatableModel?: Model<AnimationOptionMixin>,
  dataIndex?:
    | AnimateOrSetPropsOption['dataIndex']
    | AnimateOrSetPropsOption['cb']
    | AnimateOrSetPropsOption,
  cb?: AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption['during'],
  during?: AnimateOrSetPropsOption['during']
) {
  animateOrSetProps('enter', el, props, animatableModel, dataIndex, cb, during)
}

function animateOrSetProps<Props>(
  animationType: 'enter' | 'update' | 'leave',
  el: Element<Props>,
  props: Props,
  animatableModel?: Model<AnimationOptionMixin> & {
    getAnimationDelayParams?: (
      el: Element<Props>,
      dataIndex: number
    ) => AnimationDelayCallbackParam
  },
  dataIndex?:
    | AnimateOrSetPropsOption['dataIndex']
    | AnimateOrSetPropsOption['cb']
    | AnimateOrSetPropsOption,
  cb?: AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption['during'],
  during?: AnimateOrSetPropsOption['during']
) {
  let isFrom = false
  let removeOpt: AnimationOption
  if (isFunction(dataIndex)) {
    during = cb
    cb = dataIndex
    dataIndex = null
  } else if (isObject(dataIndex)) {
    cb = dataIndex.cb
    during = dataIndex.during
    isFrom = dataIndex.isFrom
    removeOpt = dataIndex.removeOpt
    dataIndex = dataIndex.dataIndex
  }

  const isRemove = animationType === 'leave'

  if (!isRemove) {
    // Must stop the remove animation.
    el.stopAnimation('leave')
  }

  const animationConfig = getAnimationConfig(
    animationType,
    animatableModel,
    dataIndex as number,
    isRemove ? removeOpt || {} : null,
    animatableModel && animatableModel.getAnimationDelayParams
      ? animatableModel.getAnimationDelayParams(el, dataIndex as number)
      : null
  )
  if (animationConfig && animationConfig.duration > 0) {
    const duration = animationConfig.duration
    const animationDelay = animationConfig.delay
    const animationEasing = animationConfig.easing

    const animateConfig: ElementAnimateConfig = {
      duration: duration as number,
      delay: (animationDelay as number) || 0,
      easing: animationEasing,
      done: cb,
      force: !!cb || !!during,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !isRemove,
      scope: animationType,
      during: during,
    }

    isFrom
      ? el.animateFrom(props, animateConfig)
      : el.animateTo(props, animateConfig)
  } else {
    el.stopAnimation()
    // If `isFrom`, the props is the "from" props.
    !isFrom && el.attr(props)
    // Call during at least once.
    during && during(1)
    cb && (cb as AnimateOrSetPropsOption['cb'])()
  }
}

function updateProps<Props extends ElementProps>(
  el: Element<Props>,
  props: Props,
  // TODO: TYPE AnimatableModel
  animatableModel?: Model<AnimationOptionMixin>,
  dataIndex?:
    | AnimateOrSetPropsOption['dataIndex']
    | AnimateOrSetPropsOption['cb']
    | AnimateOrSetPropsOption,
  cb?: AnimateOrSetPropsOption['cb'] | AnimateOrSetPropsOption['during'],
  during?: AnimateOrSetPropsOption['during']
) {
  animateOrSetProps('update', el, props, animatableModel, dataIndex, cb, during)
}

/**
 * If element is removed.
 * It can determine if element is having remove animation.
 */
export function isElementRemoved(el: Element) {
  if (!el.__zr) {
    return true
  }
  for (let i = 0; i < el.animators.length; i++) {
    const animator = el.animators[i]
    if (animator.scope === 'leave') {
      return true
    }
  }
  return false
}

export { updateProps }
