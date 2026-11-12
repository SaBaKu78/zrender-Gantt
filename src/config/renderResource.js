import { clipRectByRect } from '../util/graphic'
import { getTheme } from './theme'

const getStatusColor = (status) => {
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
const getTimeline = (value) => value && typeof value === 'object' ? value : { load: [] }

export const ResourceScheduleRenderItem = function (params, api) {
  const theme = getTheme()
  const rowIndex = api.value(0)
  const y = api.coord([0, rowIndex])[1]
  const rowHeight = api.size([0, 1])[1]
  const timeline = getTimeline(api.value(5))
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const children = []

  timeline.load.forEach(([start, end, level]) => {
    const x1 = api.coord([start, 0])[0]
    const x2 = api.coord([end, 0])[0]
    const rect = clipRectByRect({ x: x1, y: y + rowHeight - 5, width: x2 - x1, height: 4 }, params.coordSys)
    if (!rect || rect.width <= 0) return
    const isCrowded = level >= 2
    const opacity = level >= 3 ? 0.7 : isCrowded ? 0.44 : 0.3
    const element = {
      type: 'rect',
      shape: rect,
      style: {
        fill: level >= 3 ? theme.danger : isCrowded ? theme.warn : theme.success,
        opacity,
        ...(isCrowded && !reducedMotion ? { enterFrom: { opacity: opacity * 0.18 } } : {}),
      },
      silent: true,
    }
    children.push(element)
  })

  return { type: 'group', children }
}

export const ResourceRenderItem = function (params, api) {
  const theme = getTheme()
  const rowIndex = api.value(0)
  const y = api.coord([api.value(2), rowIndex])[1]
  const gridX = params.coordSys.x
  const rectHeight = api.size([0, 1])[1]
  const rowFill = rowIndex % 2 === 0 ? theme.rowEven : theme.rowOdd
  const centerY = rectHeight / 2
  const status = api.value(4)
  const timeline = getTimeline(api.value(5))
  const peak = timeline.load.reduce((max, segment) => Math.max(max, Number(segment?.[2]) || 0), 0)
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
          text: api.value(1),
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
