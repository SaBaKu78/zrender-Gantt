import { Element, Group, Line, PathStyleProps } from 'zrender'
import { AxisBaseModel } from '../../coord/AxisBaseModel'
import {
  defaults,
  each,
  extend,
  isNumber,
  isString,
} from 'zrender/lib/core/util'
import { applyTransform as v2ApplyTransform } from 'zrender/lib/core/vector'
import * as graphic from '../../util/graphic'
import { createSymbol, normalizeSymbolOffset } from '../../util/symbol'
import * as matrixUtil from 'zrender/src/core/matrix'
import { isFunction, isObject, retrieve } from 'zrender/src/core/util'
import OrdinalScale from '../scale/Ordinal'
import Model from '../../model/Model'
import { AxisBaseOption } from '../../coord/axisCommonTypes'
import { ZRTextAlign, ZRTextVerticalAlign } from '../../util/types'
import { isRadianAroundZero, remRadian } from '../../util/number'
import { createTextStyle } from '../../label/labelStyle'
import { getPIData } from '../../util/innerStore'
import { shouldShowAllLabels } from '../../coord/axisHelper'

const PI = Math.PI

type AxisIndexKey =
  | 'xAxisIndex'
  | 'yAxisIndex'
  | 'radiusAxisIndex'
  | 'angleAxisIndex'
  | 'singleAxisIndex'

type AxisEventData = {
  componentType: string
  componentIndex: number
  targetType: 'axisName' | 'axisLabel'
  name?: string
  value?: string | number
  dataIndex?: number
  tickIndex?: number
} & {
  [key in AxisIndexKey]?: number
}

export interface AxisBuilderCfg {
  position?: number[]
  axisName?: string //default get from axisModel.
  rotation?: number
  labelDirection?: number
  labelOffset?: number

  strokeContainThreshold?: number
  axisLabelShow?: boolean
  labelRotate?: number

  tickDirection?: number
  handleAutoShown?(elementType: 'axisLine' | 'axisTick'): boolean
}

interface TickCoord {
  coord: number
  tickValue?: number
}

class AxisBuilder {
  axisModel: AxisBaseModel

  opt: AxisBuilderCfg

  readonly group = new Group()

  private _transformGroup: Group

  constructor(axisModel: AxisBaseModel, opt?: AxisBuilderCfg) {
    this.axisModel = axisModel
    this.opt = opt

    defaults(opt, {
      labelOffset: 0,
      nameDirection: 1,
      tickDirection: 1,
      labelDirection: 1,
      silent: true,
      handleAutoShown: () => true,
    } as AxisBuilderCfg)

    //坐标轴得具体position
    const transformGroup = new Group({
      x: opt.position[0],
      y: opt.position[1],
      rotation: opt.rotation,
    })
    transformGroup.updateTransform()

    this._transformGroup = transformGroup
  }

  add(name: keyof typeof builders) {
    builders[name](this.opt, this.axisModel, this.group, this._transformGroup)
  }

  getGroup() {
    return this.group
  }

  static makeAxisEventDataBase(axisModel: AxisBaseModel) {
    const eventData = {
      componentType: axisModel.mainType,
      componentIndex: axisModel.componentIndex,
    } as AxisEventData
    eventData[(axisModel.mainType + 'Index') as AxisIndexKey] =
      axisModel.componentIndex
    return eventData
  }

  static innerTextLayout(
    axisRotation: number,
    textRotation: number,
    direction: number
  ) {
    const rotationDiff = remRadian(textRotation - axisRotation)
    let textAlign
    let textVerticalAlign

    if (isRadianAroundZero(rotationDiff)) {
      // Label is parallel with axis line.
      textVerticalAlign = direction > 0 ? 'top' : 'bottom'
      textAlign = 'center'
    } else if (isRadianAroundZero(rotationDiff - PI)) {
      // Label is inverse parallel with axis line.
      textVerticalAlign = direction > 0 ? 'bottom' : 'top'
      textAlign = 'center'
    } else {
      textVerticalAlign = 'middle'

      if (rotationDiff > 0 && rotationDiff < PI) {
        textAlign = direction > 0 ? 'right' : 'left'
      } else {
        textAlign = direction > 0 ? 'left' : 'right'
      }
    }

    return {
      rotation: rotationDiff,
      textAlign: textAlign as ZRTextAlign,
      textVerticalAlign: textVerticalAlign as ZRTextVerticalAlign,
    }
  }

  static isLabelSilent(axisModel: AxisBaseModel): boolean {
    const tooltipOpt = axisModel.get('tooltip')
    return (
      axisModel.get('silent') ||
      // Consider mouse cursor, add these restrictions.
      !(axisModel.get('triggerEvent') || (tooltipOpt && tooltipOpt.show))
    )
  }
}

interface AxisElementsBuilder {
  (
    opt: AxisBuilderCfg,
    axisModel: AxisBaseModel,
    group: Group,
    transformGroup: Group
  ): void
}

const builders: Record<
  'axisLine' | 'axisTickLabel' | 'axisName',
  AxisElementsBuilder
> = {
  axisLine(opt, axisModel, group, transformGroup) {
    let shown = axisModel.get(['axisLine', 'show'])
    if (shown == 'auto' && opt.handleAutoShown) {
      shown = opt.handleAutoShown('axisLine')
    }

    if (!shown) {
      return
    }

    const extent = axisModel.axis.getExtent()
    const matrix = transformGroup.transform
    const pt1 = [extent[0], 0]
    const pt2 = [extent[1], 0]
    const inverse = pt1[0] > pt2[0]
    if (matrix) {
      v2ApplyTransform(pt1, pt1, matrix)
      v2ApplyTransform(pt2, pt2, matrix)
    }

    const lineStyle = extend(
      {
        lineCap: 'round',
      },
      axisModel.getModel(['axisLine', 'lineStyle']).getLineStyle()
    )
    const line = new Line({
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1],
      },
      style: lineStyle,
      strokeContainThreshold: opt.strokeContainThreshold || 5,
      silent: true,
      z2: 1,
    })
    graphic.subPixelOptimizeLine(line.shape, line.style.lineWidth)
    line.anid = 'line'
    group.add(line)

    let arrows = axisModel.get(['axisLine', 'symbol'])

    if (arrows != null) {
      let arrowSize = axisModel.get(['axisLine', 'symbolSize'])

      if (isString(arrows)) {
        // Use the same arrow for start and end point
        arrows = [arrows, arrows]
      }
      if (isString(arrowSize) || isNumber(arrowSize)) {
        // Use the same size for width and height
        arrowSize = [arrowSize as number, arrowSize as number]
      }

      const arrowOffset = normalizeSymbolOffset(
        axisModel.get(['axisLine', 'symbolOffset']) || 0,
        arrowSize
      )

      const symbolWidth = arrowSize[0]
      const symbolHeight = arrowSize[1]

      each(
        [
          {
            rotate: opt.rotation + Math.PI / 2,
            offset: arrowOffset[0],
            r: 0,
          },
          {
            rotate: opt.rotation - Math.PI / 2,
            offset: arrowOffset[1],
            r: Math.sqrt(
              (pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) +
                (pt1[1] - pt2[1]) * (pt1[1] - pt2[1])
            ),
          },
        ],
        function (point, index) {
          if (arrows[index] !== 'none' && arrows[index] != null) {
            const symbol = createSymbol(
              arrows[index],
              -symbolWidth / 2,
              -symbolHeight / 2,
              symbolWidth,
              symbolHeight,
              lineStyle.stroke,
              true
            )

            // Calculate arrow position with offset
            const r = point.r + point.offset

            const pt = inverse ? pt2 : pt1
            symbol.attr({
              rotation: point.rotate,
              x: pt[0] + r * Math.cos(opt.rotation),
              y: pt[1] - r * Math.sin(opt.rotation),
              silent: true,
              z2: 11,
            })
            group.add(symbol)
          }
        }
      )
    }
  },
  axisTickLabel(opt, axisModel, group, transformGroup) {
    const ticksEls = buildAxisMajorTicks(group, transformGroup, axisModel, opt)
    const labelEls = buildAxisLabel(group, transformGroup, axisModel, opt)
    buildAxisMinorTicks(group, transformGroup, axisModel, opt)
    fixMinMaxLabelShow(axisModel, labelEls, ticksEls)
  },
  axisName(opt, axisModel, group, transformGroup) {},
}

function buildAxisMajorTicks(
  group: Group,
  transformGroup: Group,
  axisModel: AxisBaseModel,
  opt: AxisBuilderCfg
) {
  const axis = axisModel.axis
  const tickModel = axisModel.getModel('axisTick')
  let shown = tickModel.get('show')
  if (shown === 'auto' && opt.handleAutoShown) {
    shown = opt.handleAutoShown('axisTick')
  }
  if (!shown || axis.scale.isBlank()) {
    return
  }
  const lineStyleModel = tickModel.getModel('lineStyle')
  const tickEndCoord = opt.tickDirection * tickModel.get('length')
  const ticksCoords = axis.getTicksCoords()
  const ticksEls = createTicks(
    ticksCoords,
    transformGroup.transform,
    tickEndCoord,
    defaults(lineStyleModel.getLineStyle(), {
      stroke: axisModel.get(['axisLine', 'lineStyle', 'color']),
    }),
    'ticks'
  )

  for (let i = 0; i < ticksEls.length; i++) {
    group.add(ticksEls[i])
  }
  return ticksEls
}

function buildAxisMinorTicks(
  group: Group,
  transformGroup: Group,
  axisModel: AxisBaseModel,
  opt: AxisBuilderCfg
) {
  const axis = axisModel.axis
  const tickModel = axisModel.getModel('axisTick')
  let shown = tickModel.get('show')
  if (shown === 'auto' && opt.handleAutoShown) {
    shown = opt.handleAutoShown('axisTick')
  }
  if (!shown || axis.scale.isBlank()) {
    return
  }
  const lineStyleModel = tickModel.getModel('lineStyle')
  const tickLength = tickModel.get('length') || 5
  const minorTickEndCoord = opt.tickDirection * (tickLength * 0.6)
  const ticksCoords = axis.getTicksCoords()

  // 在每个相邻主刻度之间插入一条辅助刻度线
  const minorTicksCoords: TickCoord[] = []
  for (let i = 0; i < ticksCoords.length - 1; i++) {
    const midCoord = (ticksCoords[i].coord + ticksCoords[i + 1].coord) / 2
    minorTicksCoords.push({ coord: midCoord })
  }

  if (minorTicksCoords.length === 0) {
    return
  }

  const minorTicksEls = createTicks(
    minorTicksCoords,
    transformGroup.transform,
    minorTickEndCoord,
    defaults(lineStyleModel.getLineStyle(), {
      stroke: axisModel.get(['axisLine', 'lineStyle', 'color']),
    }),
    'minorTicks'
  )

  for (let i = 0; i < minorTicksEls.length; i++) {
    group.add(minorTicksEls[i])
  }
}

function buildAxisLabel(
  group: Group,
  transformGroup: Group,
  axisModel: AxisBaseModel,
  opt: AxisBuilderCfg
) {
  const axis = axisModel.axis
  const show = retrieve(opt.axisLabelShow, axisModel.get(['axisLabel', 'show']))

  if (!show || axis.scale.isBlank()) {
    return
  }

  const labelModel = axisModel.getModel('axisLabel')
  const labelMargin = labelModel.get('margin')
  const labels = axis.getViewLabels()
  // Special label rotate.
  const labelRotation =
    ((retrieve(opt.labelRotate, labelModel.get('rotate')) || 0) * PI) / 180

  const labelLayout = AxisBuilder.innerTextLayout(
    opt.rotation,
    labelRotation,
    opt.labelDirection
  )
  const rawCategoryData =
    axisModel.getCategories && axisModel.getCategories(true)

  const labelEls: graphic.Text[] = []
  const silent = AxisBuilder.isLabelSilent(axisModel)
  const triggerEvent = axisModel.get('triggerEvent')

  each(labels, function (labelItem, index) {
    const tickValue =
      axis.scale.type === 'ordinal'
        ? (axis.scale as OrdinalScale).getRawOrdinalNumber(labelItem.tickValue)
        : labelItem.tickValue
    const formattedLabel = labelItem.formattedLabel
    const rawLabel = labelItem.rawLabel

    let itemLabelModel = labelModel
    if (rawCategoryData && rawCategoryData[tickValue]) {
      const rawCategoryItem = rawCategoryData[tickValue]
      if (isObject(rawCategoryItem) && rawCategoryItem.textStyle) {
        itemLabelModel = new Model(
          rawCategoryItem.textStyle,
          labelModel,
          axisModel.piModel
        )
      }
    }

    const textColor =
      (itemLabelModel.getTextColor() as AxisBaseOption['axisLabel']['color']) ||
      axisModel.get(['axisLine', 'lineStyle', 'color'])

    const tickCoord = axis.dataToCoord(tickValue)

    const textEl = new graphic.Text({
      x: tickCoord,
      y: opt.labelOffset + opt.labelDirection * labelMargin,
      rotation: labelLayout.rotation,
      silent: silent,
      z2: 10 + (labelItem.level || 0),
      style: createTextStyle(itemLabelModel, {
        text: formattedLabel,
        align:
          itemLabelModel.getShallow('align', true) || labelLayout.textAlign,
        verticalAlign:
          itemLabelModel.getShallow('verticalAlign', true) ||
          itemLabelModel.getShallow('baseline', true) ||
          labelLayout.textVerticalAlign,
        fill: isFunction(textColor)
          ? textColor(
              // (1) In category axis with data zoom, tick is not the original
              // index of axis.data. So tick should not be exposed to user
              // in category axis.
              // (2) Compatible with previous version, which always use formatted label as
              // input. But in interval scale the formatted label is like '223,445', which
              // maked user replace ','. So we modify it to return original val but remain
              // it as 'string' to avoid error in replacing.
              axis.type === 'category'
                ? rawLabel
                : axis.type === 'value'
                ? tickValue + ''
                : tickValue,
              index
            )
          : (textColor as string),
      }),
    })

    textEl.anid = 'label_' + tickValue

    // Pack data for mouse event
    if (triggerEvent) {
      const eventData = AxisBuilder.makeAxisEventDataBase(axisModel)
      eventData.targetType = 'axisLabel'
      eventData.value = rawLabel
      eventData.tickIndex = index
      if (axis.type === 'category') {
        eventData.dataIndex = tickValue
      }

      getPIData(textEl).eventData = eventData
    }

    transformGroup.add(textEl)
    textEl.updateTransform()

    labelEls.push(textEl)
    group.add(textEl)

    textEl.decomposeTransform()
  })

  return labelEls
}
function createTicks(
  ticksCoords: TickCoord[],
  tickTransform: matrixUtil.MatrixArray,
  tickEndCoord: number,
  tickLineStyle: PathStyleProps,
  anidPrefix: string
) {
  const tickEls = []
  const pt1: number[] = []
  const pt2: number[] = []
  for (let i = 0; i < ticksCoords.length; i++) {
    const tickCoord = ticksCoords[i].coord
    pt1[0] = tickCoord //刻度起点x
    pt1[1] = 0 //刻度起点y

    pt2[0] = tickCoord //刻度终点x
    pt2[1] = tickEndCoord //刻度终点y

    if (tickTransform) {
      v2ApplyTransform(pt1, pt1, tickTransform)
      v2ApplyTransform(pt2, pt2, tickTransform)
    }

    const tickEl = new graphic.Line({
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1],
      },
      style: tickLineStyle,
      z2: 2,
      autoBatch: true,
      silent: true,
    })
    graphic.subPixelOptimizeLine(tickEl.shape, tickEl.style.lineWidth) //增加图形清晰度
    tickEl.anid = anidPrefix + '_' + ticksCoords[i].tickValue //给每根线条设置动画id
    tickEls.push(tickEl)
  }

  return tickEls
}

//用来隐藏相邻刻度以及重叠得刻度
function fixMinMaxLabelShow(
  axisModel: AxisBaseModel,
  labelEls: graphic.Text[],
  tickEls: graphic.Line[]
) {
  if (shouldShowAllLabels(axisModel.axis)) {
    return
  }

  const showMinLabel = axisModel.get(['axisLabel', 'showMinLabel'])
  const showMaxLabel = axisModel.get(['axisLabel', 'showMaxLabel'])
  labelEls = labelEls || []
  tickEls = tickEls || []

  const firstLabel = labelEls[0]
  const nextLabel = labelEls[1]
  const lastLabel = labelEls[labelEls.length - 1]
  const prevLabel = labelEls[labelEls.length - 2]

  const firstTick = tickEls[0]
  const nextTick = tickEls[1]
  const lastTick = tickEls[tickEls.length - 1]
  const prevTick = tickEls[tickEls.length - 2]

  if (showMinLabel === false) {
    ignoreEl(firstLabel)
    ignoreEl(firstTick)
  } else if (isTwoLabelOverlapped(firstLabel, nextLabel)) {
    if (showMinLabel) {
      ignoreEl(nextLabel)
      ignoreEl(nextTick)
    } else {
      ignoreEl(firstLabel)
      ignoreEl(firstTick)
    }
  }

  if (showMaxLabel === false) {
    ignoreEl(lastLabel)
    ignoreEl(lastTick)
  } else if (isTwoLabelOverlapped(prevLabel, lastLabel)) {
    if (showMaxLabel) {
      ignoreEl(prevLabel)
      ignoreEl(prevTick)
    } else {
      ignoreEl(lastLabel)
      ignoreEl(lastTick)
    }
  }
}

function ignoreEl(el: Element) {
  el && (el.ignore = true)
}

function isTwoLabelOverlapped(current: graphic.Text, next: graphic.Text) {
  // current and next has the same rotation.
  const firstRect = current && current.getBoundingRect().clone()
  const nextRect = next && next.getBoundingRect().clone()

  if (!firstRect || !nextRect) {
    return
  }

  // When checking intersect of two rotated labels, we use mRotationBack
  // to avoid that boundingRect is enlarge when using `boundingRect.applyTransform`.
  const mRotationBack = matrixUtil.identity([])
  matrixUtil.rotate(mRotationBack, mRotationBack, -current.rotation)

  firstRect.applyTransform(
    matrixUtil.mul([], mRotationBack, current.getLocalTransform())
  )
  nextRect.applyTransform(
    matrixUtil.mul([], mRotationBack, next.getLocalTransform())
  )

  return firstRect.intersect(nextRect)
}

export default AxisBuilder
