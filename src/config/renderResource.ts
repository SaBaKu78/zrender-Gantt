import { clipRectByRect } from '../util/graphic'
import { getTheme } from './theme'
import type { ResourceTimeline } from './taskTransform'

interface CartesianRenderParams {
  coordSys: {
    x: number
    y: number
    width: number
    height: number
  }
}

interface CustomRenderApi {
  value(dimension: number): unknown
  coord(value: [unknown, unknown]): [number, number]
  size(value: [number, number]): [number, number]
}

/**
 * custom series 的图形 option 会随 rect/text/group 形状变化。
 * 这里保留开放式形状类型，数据结构本身仍由 ResourceTimeline 等明确约束。
 */
type ResourceGraphicOption = Record<string, any>

const getStatusColor = (status: unknown): string => {
  const theme = getTheme()
  switch (String(status || '').toUpperCase()) {
    case 'ON':
    case 'ACTIVE':
      return theme.success
    case 'OFF':
      return theme.faint
    case 'DISABLED':
      return theme.muted
    default:
      return theme.warn
  }
}
const getTimeline = (value: unknown): ResourceTimeline =>
  value && typeof value === 'object'
    ? value as ResourceTimeline
    : { load: [], availability: [] }

export const ResourceScheduleRenderItem = function (
  params: CartesianRenderParams,
  api: CustomRenderApi
): ResourceGraphicOption | undefined {
  const theme = getTheme()
  const rowIndex = Number(api.value(1))
  const y = api.coord([0, rowIndex])[1]
  const rowHeight = api.size([0, 1])[1]
  const start = Number(api.value(2))
  const end = Number(api.value(3))
  const x1 = api.coord([start, rowIndex])[0]
  const x2 = api.coord([end, rowIndex])[0]
  const capsuleHeight = Math.min(12, Math.max(8, rowHeight * 0.23))
  const rect = clipRectByRect({
    x: x1,
    y: y + (rowHeight - capsuleHeight) / 2,
    width: x2 - x1,
    height: capsuleHeight,
  }, params.coordSys)
  if (!rect || rect.width <= 0) return
  return {
    type: 'rect',
    shape: {
      ...rect,
      r: rect.height / 2,
    },
    style: {
      fill: theme.shiftLaneFill,
      stroke: theme.shiftLaneStroke,
      lineWidth: 1,
    },
    silent: true,
  }
}

export const ResourceRenderItem = function (
  params: CartesianRenderParams,
  api: CustomRenderApi
): ResourceGraphicOption {
  const theme = getTheme()
  const rowIndex = Number(api.value(0))
  const y = api.coord([api.value(2), rowIndex])[1]
  const gridX = params.coordSys.x
  const rectHeight = api.size([0, 1])[1]
  const rowFill = rowIndex % 2 === 0 ? theme.rowEven : theme.rowOdd
  const centerY = rectHeight / 2
  const status = api.value(4)
  const timeline = getTimeline(api.value(5))
  const peak = Math.max(
    Number(api.value(6)) || 0,
    timeline.load.reduce((max, segment) => Math.max(max, Number(segment?.[2]) || 0), 0),
  )
  const hasPeakBadge = peak >= 2
  const badgeWidth = 18
  const badgeX = Math.max(32, gridX - 28)
  const nameWidth = Math.max(0, gridX - (hasPeakBadge ? 56 : 40))
  const badgeColor = peak >= 3 ? theme.danger : theme.warn
  const badgeFill = peak >= 3 ? theme.taskStatus[5].background : theme.taskStatus[9].background
  const badgeStroke = peak >= 3 ? theme.taskStatus[5].border : theme.taskStatus[9].border

  return {
    type: 'group',
    position: [0, y],
    children: [
      {
        type: 'rect',
        shape: { x: 0, y: 0, width: gridX, height: rectHeight },
        style: { fill: rowFill, stroke: theme.borderSoft, lineWidth: 1 },
      },
      {
        type: 'rect',
        shape: { x: 12, y: centerY - 4, width: 8, height: 8, r: 4 },
        style: { fill: getStatusColor(status) },
        silent: true,
      },
      {
        type: 'text',
        style: {
          x: 28,
          y: centerY,
          text: String(api.value(1) ?? ''),
          width: nameWidth,
          overflow: 'truncate',
          verticalAlign: 'middle',
          align: 'left',
          textVerticalAlign: 'middle',
          textAlign: 'left',
          textFill: theme.text,
          fontSize: 13,
        },
      },
      hasPeakBadge && {
        type: 'rect',
        shape: { x: badgeX, y: centerY - 8, width: badgeWidth, height: 16, r: 3 },
        style: { fill: badgeFill, stroke: badgeStroke, lineWidth: 1 },
        silent: true,
      },
      hasPeakBadge && {
        type: 'text',
        style: {
          x: badgeX + badgeWidth / 2,
          y: centerY,
          text: String(peak),
          fill: badgeColor,
          fontSize: 10,
          fontWeight: 600,
          align: 'center',
          verticalAlign: 'middle',
        },
        silent: true,
      },
    ].filter(Boolean),
  }
}
