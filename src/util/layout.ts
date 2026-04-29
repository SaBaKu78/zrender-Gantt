import BoundingRect from 'zrender/src/core/BoundingRect'
import * as zrUtil from 'zrender/src/core/util'
import { BoxLayoutOptionMixin, ComponentLayoutMode, Dictionary } from './types'
import { each } from 'zrender/lib/core/util'
import * as formatUtil from './format'
import { parsePercent } from './number'

export const LOCATION_PARAMS = [
  'left',
  'right',
  'top',
  'bottom',
  'width',
  'height',
] as const

export const HV_NAMES = [
  ['width', 'left', 'right'],
  ['height', 'top', 'bottom'],
] as const

type BoxLayoutKeys = keyof BoxLayoutOptionMixin

export interface LayoutRect extends BoundingRect {
  margin: number[]
}

export function fetchLayoutMode(ins: any): ComponentLayoutMode {
  const layoutMode = ins.layoutMode || ins.constructor.layoutMode
  return zrUtil.isObject(layoutMode)
    ? layoutMode
    : layoutMode
    ? { type: layoutMode }
    : null
}

export function getLayoutParams(
  source: BoxLayoutOptionMixin
): BoxLayoutOptionMixin {
  return copyLayoutParams({}, source)
}

export function copyLayoutParams(
  target: BoxLayoutOptionMixin,
  source: BoxLayoutOptionMixin
): BoxLayoutOptionMixin {
  source &&
    target &&
    each(LOCATION_PARAMS, function (name: BoxLayoutKeys) {
      source.hasOwnProperty(name) && (target[name] = source[name])
    })
  return target
}

export function mergeLayoutParam<T extends BoxLayoutOptionMixin>(
  targetOption: T,
  newOption: T,
  opt?: ComponentLayoutMode
) {
  let ignoreSize = opt && opt.ignoreSize
  !zrUtil.isArray(ignoreSize) && (ignoreSize = [ignoreSize, ignoreSize])

  const hResult = merge(HV_NAMES[0], 0)
  const vResult = merge(HV_NAMES[1], 1)

  copy(HV_NAMES[0], targetOption, hResult)
  copy(HV_NAMES[1], targetOption, vResult)

  function merge(names: (typeof HV_NAMES)[number], hvIdx: number) {
    const newParams: BoxLayoutOptionMixin = {}
    let newValueCount = 0
    const merged: BoxLayoutOptionMixin = {}
    let mergedValueCount = 0
    const enoughParamNumber = 2

    each(names, function (name: BoxLayoutKeys) {
      merged[name] = targetOption[name]
    })
    each(names, function (name: BoxLayoutKeys) {
      // Consider case: newOption.width is null, which is
      // set by user for removing width setting.
      hasProp(newOption, name) &&
        (newParams[name] = merged[name] = newOption[name])
      hasValue(newParams, name) && newValueCount++
      hasValue(merged, name) && mergedValueCount++
    })

    if ((ignoreSize as [boolean, boolean])[hvIdx]) {
      // Only one of left/right is premitted to exist.
      if (hasValue(newOption, names[1])) {
        merged[names[2]] = null
      } else if (hasValue(newOption, names[2])) {
        merged[names[1]] = null
      }
      return merged
    }

    // Case: newOption: {width: ..., right: ...},
    // or targetOption: {right: ...} and newOption: {width: ...},
    // There is no conflict when merged only has params count
    // little than enoughParamNumber.
    if (mergedValueCount === enoughParamNumber || !newValueCount) {
      return merged
    }
    // Case: newOption: {width: ..., right: ...},
    // Than we can make sure user only want those two, and ignore
    // all origin params in targetOption.
    else if (newValueCount >= enoughParamNumber) {
      return newParams
    } else {
      // Chose another param from targetOption by priority.
      for (let i = 0; i < names.length; i++) {
        const name = names[i]
        if (!hasProp(newParams, name) && hasProp(targetOption, name)) {
          newParams[name] = targetOption[name]
          break
        }
      }
      return newParams
    }
  }

  function hasProp(obj: object, name: string): boolean {
    return obj.hasOwnProperty(name)
  }

  function hasValue(obj: Dictionary<any>, name: string): boolean {
    return obj[name] != null && obj[name] !== 'auto'
  }

  function copy(
    names: readonly string[],
    target: Dictionary<any>,
    source: Dictionary<any>
  ) {
    each(names, function (name) {
      target[name] = source[name]
    })
  }
}

/**
 * Parse position info.
 */
export function getLayoutRect(
  positionInfo: BoxLayoutOptionMixin & {
    aspect?: number // aspect is width / height
  },
  containerRect: { width: number; height: number },
  margin?: number | number[]
): LayoutRect {
  margin = formatUtil.normalizeCssArray(margin || 0)

  const containerWidth = containerRect.width
  const containerHeight = containerRect.height

  let left = parsePercent(positionInfo.left, containerWidth)
  let top = parsePercent(positionInfo.top, containerHeight)
  const right = parsePercent(positionInfo.right, containerWidth)
  const bottom = parsePercent(positionInfo.bottom, containerHeight)
  let width = parsePercent(positionInfo.width, containerWidth)
  let height = parsePercent(positionInfo.height, containerHeight)

  const verticalMargin = margin[2] + margin[0]
  const horizontalMargin = margin[1] + margin[3]
  const aspect = positionInfo.aspect

  // If width is not specified, calculate width from left and right
  if (isNaN(width)) {
    width = containerWidth - right - horizontalMargin - left
  }
  if (isNaN(height)) {
    height = containerHeight - bottom - verticalMargin - top
  }

  if (aspect != null) {
    // If width and height are not given
    // 1. Graph should not exceeds the container
    // 2. Aspect must be keeped
    // 3. Graph should take the space as more as possible
    // FIXME
    // Margin is not considered, because there is no case that both
    // using margin and aspect so far.
    if (isNaN(width) && isNaN(height)) {
      if (aspect > containerWidth / containerHeight) {
        width = containerWidth * 0.8
      } else {
        height = containerHeight * 0.8
      }
    }

    // Calculate width or height with given aspect
    if (isNaN(width)) {
      width = aspect * height
    }
    if (isNaN(height)) {
      height = width / aspect
    }
  }

  // If left is not specified, calculate left from right and width
  if (isNaN(left)) {
    left = containerWidth - right - width - horizontalMargin
  }
  if (isNaN(top)) {
    top = containerHeight - bottom - height - verticalMargin
  }

  // Align left and top
  switch (positionInfo.left || positionInfo.right) {
    case 'center':
      left = containerWidth / 2 - width / 2 - margin[3]
      break
    case 'right':
      left = containerWidth - width - horizontalMargin
      break
  }
  switch (positionInfo.top || positionInfo.bottom) {
    case 'middle':
    case 'center':
      top = containerHeight / 2 - height / 2 - margin[0]
      break
    case 'bottom':
      top = containerHeight - height - verticalMargin
      break
  }
  // If something is wrong and left, top, width, height are calculated as NaN
  left = left || 0
  top = top || 0
  if (isNaN(width)) {
    // Width may be NaN if only one value is given except width
    width = containerWidth - horizontalMargin - left - (right || 0)
  }
  if (isNaN(height)) {
    // Height may be NaN if only one value is given except height
    height = containerHeight - verticalMargin - top - (bottom || 0)
  }

  const rect = new BoundingRect(
    left + margin[3],
    top + margin[0],
    width,
    height
  ) as LayoutRect
  rect.margin = margin
  return rect
}
