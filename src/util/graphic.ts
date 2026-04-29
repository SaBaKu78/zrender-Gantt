import { createFromString, extendFromString } from 'zrender/lib/tool/path'
import { AnimationOptionMixin, Dictionary, ZRRectLike } from './types'

import {
  LinearGradient,
  RadialGradient,
  BoundingRect,
  OrientedBoundingRect,
  Point,
  Element,
  Path,
  Group,
  Image,
  matrix,
  vector,
  Text,
  Circle,
  Ellipse,
  Sector,
  Ring,
  Polygon,
  Polyline,
  Rect,
  Line,
  BezierCurve,
  Arc,
  IncrementalDisplayable,
  CompoundPath,
  Displayable,
  PathProps,
} from 'zrender'
import { extend, isArray, isArrayLike } from 'zrender/lib/core/util'
import Transformable from 'zrender/lib/core/Transformable'
import ZRImage from 'zrender/lib/graphic/Image'

import { initProps, updateProps } from '../animation/basicTransition'
import * as subPixelOptimizeUtil from 'zrender/src/graphic/helper/subPixelOptimize'
import Model from '../model/Model'
import { getPIData } from './innerStore'

export {
  Group,
  Image,
  Text,
  Circle,
  Ellipse,
  Sector,
  Ring,
  Polygon,
  Polyline,
  Rect,
  Line,
  BezierCurve,
  Arc,
  IncrementalDisplayable,
  CompoundPath,
  LinearGradient,
  RadialGradient,
  BoundingRect,
  OrientedBoundingRect,
  Point,
  Path,
}
export { initProps }

const _customShapeMap: Dictionary<{ new (): Path }> = {}

const mathMax = Math.max
const mathMin = Math.min

const extendPathFromString = extendFromString
type SVGPathOption = Parameters<typeof extendPathFromString>[1]
type SVGPathCtor = ReturnType<typeof extendPathFromString>
type SVGPath = InstanceType<SVGPathCtor>

/**
 * Get transform matrix of target (param target),
 * in coordinate of its ancestor (param ancestor)
 *
 * @param target
 * @param [ancestor]
 */
export function getTransform(
  target: Transformable,
  ancestor?: Transformable
): matrix.MatrixArray {
  const mat = matrix.identity([])

  while (target && target !== ancestor) {
    matrix.mul(mat, target.getLocalTransform(), mat)
    target = target.parent
  }

  return mat
}

/**
 * Apply transform to an vertex.
 * @param target [x, y]
 * @param transform Can be:
 *      + Transform matrix: like [1, 0, 0, 1, 0, 0]
 *      + {position, rotation, scale}, the same as `zrender/Transformable`.
 * @param invert Whether use invert matrix.
 * @return [x, y]
 */
export function applyTransform(
  target: vector.VectorArray,
  transform: Transformable | matrix.MatrixArray,
  invert?: boolean
): number[] {
  if (transform && !isArrayLike(transform)) {
    transform = Transformable.getLocalTransform(transform)
  }

  if (invert) {
    transform = matrix.invert([], transform as matrix.MatrixArray)
  }
  return vector.applyTransform([], target, transform as matrix.MatrixArray)
}

/**
 * @param direction 'left' 'right' 'top' 'bottom'
 * @param transform Transform matrix: like [1, 0, 0, 1, 0, 0]
 * @param invert Whether use invert matrix.
 * @return Transformed direction. 'left' 'right' 'top' 'bottom'
 */
export function transformDirection(
  direction: 'left' | 'right' | 'top' | 'bottom',
  transform: matrix.MatrixArray,
  invert?: boolean
): 'left' | 'right' | 'top' | 'bottom' {
  // Pick a base, ensure that transform result will not be (0, 0).
  const hBase =
    transform[4] === 0 || transform[5] === 0 || transform[0] === 0
      ? 1
      : Math.abs((2 * transform[4]) / transform[0])
  const vBase =
    transform[4] === 0 || transform[5] === 0 || transform[2] === 0
      ? 1
      : Math.abs((2 * transform[4]) / transform[2])

  let vertex: vector.VectorArray = [
    direction === 'left' ? -hBase : direction === 'right' ? hBase : 0,
    direction === 'top' ? -vBase : direction === 'bottom' ? vBase : 0,
  ]

  vertex = applyTransform(vertex, transform, invert)

  return Math.abs(vertex[0]) > Math.abs(vertex[1])
    ? vertex[0] > 0
      ? 'right'
      : 'left'
    : vertex[1] > 0
    ? 'bottom'
    : 'top'
}

function traverseElement(el: Element, cb: (el: Element) => boolean | void) {
  let stopped
  // TODO
  // Polyfill for fixing zrender group traverse don't visit it's root issue.
  if (el.isGroup) {
    stopped = cb(el)
  }
  if (!stopped) {
    el.traverse(cb)
  }
}

export function traverseElements(
  els: Element | Element[] | undefined | null,
  cb: (el: Element) => boolean | void
) {
  if (els) {
    if (isArray(els)) {
      for (let i = 0; i < els.length; i++) {
        traverseElement(els[i], cb)
      }
    } else {
      traverseElement(els, cb)
    }
  }
}

/**
 * Create a path element from path data string
 * @param pathData
 * @param opts
 * @param rect
 * @param layout 'center' or 'cover' default to be cover
 */
export function makePath(
  pathData: string,
  opts: SVGPathOption,
  rect: ZRRectLike,
  layout?: 'center' | 'cover'
): SVGPath {
  const path = createFromString(pathData, opts)
  if (rect) {
    if (layout === 'center') {
      rect = centerGraphic(rect, path.getBoundingRect())
    }
    resizePath(path, rect)
  }
  return path
}

/**
 * Create a image element from image url
 * @param imageUrl image url
 * @param opts options
 * @param rect constrain rect
 * @param layout 'center' or 'cover'. Default to be 'cover'
 */
export function makeImage(
  imageUrl: string,
  rect: ZRRectLike,
  layout?: 'center' | 'cover'
) {
  const zrImg = new ZRImage({
    style: {
      image: imageUrl,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    },
    onload(img) {
      if (layout === 'center') {
        const boundingRect = {
          width: img.width,
          height: img.height,
        }
        zrImg.setStyle(centerGraphic(rect, boundingRect))
      }
    },
  })
  return zrImg
}

/**
 * Get position of centered element in bounding box.
 *
 * @param  rect         element local bounding box
 * @param  boundingRect constraint bounding box
 * @return element position containing x, y, width, and height
 */
function centerGraphic(
  rect: ZRRectLike,
  boundingRect: {
    width: number
    height: number
  }
): ZRRectLike {
  // Set rect to center, keep width / height ratio.
  const aspect = boundingRect.width / boundingRect.height
  let width = rect.height * aspect
  let height
  if (width <= rect.width) {
    height = rect.height
  } else {
    width = rect.width
    height = width / aspect
  }
  const cx = rect.x + rect.width / 2
  const cy = rect.y + rect.height / 2

  return {
    x: cx - width / 2,
    y: cy - height / 2,
    width: width,
    height: height,
  }
}

/**
 * Resize a path to fit the rect
 * @param path
 * @param rect
 */
export function resizePath(path: SVGPath, rect: ZRRectLike): void {
  if (!path.applyTransform) {
    return
  }

  const pathRect = path.getBoundingRect()

  const m = pathRect.calculateTransform(rect)

  path.applyTransform(m)
}

/**
 * Sub pixel optimize line for canvas
 */
export function subPixelOptimizeLine(
  shape: {
    x1: number
    y1: number
    x2: number
    y2: number
  },
  lineWidth: number
) {
  subPixelOptimizeUtil.subPixelOptimizeLine(shape, shape, { lineWidth })
  return shape
}

export function registerShape(name: string, ShapeClass: { new (): Path }) {
  _customShapeMap[name] = ShapeClass
}

export function getShapeClass(name: string): { new (): Path } {
  if (_customShapeMap.hasOwnProperty(name)) {
    return _customShapeMap[name]
  }
}

export function groupTransition(
  g1: Group,
  g2: Group,
  animatableModel: Model<AnimationOptionMixin>
) {
  if (!g1 || !g2) {
    return
  }

  function getElMap(g: Group) {
    const elMap: Dictionary<Displayable> = {}
    g.traverse(function (el: Element) {
      if (isNotGroup(el) && el.anid) {
        elMap[el.anid] = el
      }
    })
    return elMap
  }
  function getAnimatableProps(el: Displayable) {
    const obj: PathProps = {
      x: el.x,
      y: el.y,
      rotation: el.rotation,
    }
    if (isPath(el)) {
      obj.shape = extend({}, el.shape)
    }
    return obj
  }
  const elMap1 = getElMap(g1)

  g2.traverse(function (el) {
    if (isNotGroup(el) && el.anid) {
      const oldEl = elMap1[el.anid]
      if (oldEl) {
        const newProp = getAnimatableProps(el)
        el.attr(getAnimatableProps(oldEl))
        updateProps(el, newProp, animatableModel, getPIData(el).dataIndex)
      }
    }
  })
}

function isNotGroup(el: Element): el is Displayable {
  return !el.isGroup
}

function isPath(el: Displayable): el is Path {
  return (el as Path).shape != null
}

/**
 * Return a new clipped rect. If rect size are negative, return undefined.
 */
export function clipRectByRect(
  targetRect: ZRRectLike,
  rect: ZRRectLike
): ZRRectLike {
  const x = mathMax(targetRect.x, rect.x)
  const x2 = mathMin(targetRect.x + targetRect.width, rect.x + rect.width)
  const y = mathMax(targetRect.y, rect.y)
  const y2 = mathMin(targetRect.y + targetRect.height, rect.y + rect.height)

  // If the total rect is cliped, nothing, including the border,
  // should be painted. So return undefined.
  if (x2 >= x && y2 >= y) {
    return {
      x: x,
      y: y,
      width: x2 - x,
      height: y2 - y,
    }
  }
}

registerShape('rect', Rect)
