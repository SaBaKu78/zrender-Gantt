import { clipRectByRect } from '../util/graphic'

const STATUS_COLORS = {
  ON: '#20C7B5',
  ACTIVE: '#20C7B5',
  READY: '#F3B33D',
  OFF: '#94A3B8',
  DISABLED: '#64748B',
}

const getStatusColor = (status) => STATUS_COLORS[String(status || '').toUpperCase()] || '#F3B33D'
const getTimeline = (value) => value && typeof value === 'object' ? value : { load: [] }

export const ResourceScheduleRenderItem = function (params, api) {
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
        fill: level >= 3 ? '#EF4444' : isCrowded ? '#F3B33D' : '#20C7B5',
        opacity,
        ...(isCrowded && !reducedMotion ? { enterFrom: { opacity: opacity * 0.18 } } : {}),
      },
      ...(isCrowded && !reducedMotion ? { during: ({ setStyle }) => setStyle('opacity', opacity * (0.72 + 0.28 * Math.sin(Date.now() / 420))) } : {}),
      silent: true,
    }
    children.push(element)
  })

  return { type: 'group', children }
}

export const ResourceRenderItem = function (params, api) {
  const rowIndex = api.value(0)
  const y = api.coord([api.value(2), rowIndex])[1]
  const gridX = params.coordSys.x
  const rectHeight = api.size([0, 1])[1]
  const rowFill = rowIndex % 2 === 0 ? '#FFFFFF' : '#F7F8FA'
  const centerY = rectHeight / 2
  const status = api.value(4)

  return {
    type: 'group',
    position: [0, y],
    children: [
      {
        type: 'rect',
        shape: { x: 0, y: 0, width: gridX, height: rectHeight },
        style: { fill: rowFill, stroke: '#E5EAF0', lineWidth: 1 },
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
          width: Math.max(0, gridX - 40),
          overflow: 'truncate',
          verticalAlign: 'middle',
          align: 'left',
          textVerticalAlign: 'middle',
          textAlign: 'left',
          textFill: '#1F2937',
          fontSize: 13,
        },
      },
    ],
  }
}
