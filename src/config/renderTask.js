import { clipRectByRect } from '../util/graphic'

const formatTaskTime = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const pad2 = (num) => (num < 10 ? `0${num}` : `${num}`)
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

const truncateText = (text, maxWidth, fontSize = 11) => {
  const value = String(text || '')
  const maxChars = Math.max(0, Math.floor(maxWidth / fontSize))
  if (!maxChars) return ''
  return value.length > maxChars ? `${value.slice(0, maxChars - 1)}…` : value
}

const TASK_STATUS_TEXT = {
  1: '未', 2: '到', 3: '始', 4: '结', 5: '阻',
  6: '继', 7: '取', 8: '恢', 9: '挂', 10: '挂',
}

const formatTaskStatus = (value) => {
  if (value == null || value === '') return ''
  return TASK_STATUS_TEXT[value] || `状态 ${value}`
}

const createCell = (x, y, width, height) => ({ x, y, width, height })

const createTextCell = (cell, text, options = {}) => ({
  type: 'group',
  transition: [],
  position: [cell.x, cell.y],
  children: [
    { type: 'rect', shape: { x: 0, y: 0, width: cell.width, height: cell.height }, style: { fill: 'rgba(255,255,255,0)' }, silent: true },
    { type: 'text', style: { x: cell.width / 2, y: cell.height / 2, text, textFill: options.textFill || '#111827', fontSize: options.fontSize || 11, fontWeight: options.fontWeight, align: 'center', verticalAlign: 'middle', textAlign: 'center', textVerticalAlign: 'middle' } },
  ],
})

export const TaskRenderItem = function (params, api) {
  const resourceIndex = api.value(1)
  const startTime = api.coord([api.value(2), resourceIndex])
  const endTime = api.coord([api.value(3), resourceIndex])
  const rowHeight = api.size([0, 1])[1]
  const laneIndex = api.value(8) || 0
  const laneCount = Math.max(1, api.value(9) || 1)
  const laneHeight = rowHeight / laneCount
  const taskHeight = Math.min(44, Math.max(1, laneHeight - Math.min(4, laneHeight / 4)))
  const taskY = startTime[1] + laneIndex * laneHeight + (laneHeight - taskHeight) / 2
  const task = clipRectByRect({ x: startTime[0], y: taskY, width: endTime[0] - startTime[0], height: taskHeight }, params.coordSys)
  if (!task || task.width <= 0 || task.height <= 0) return
  task.r = 3

  const outsideShift = Boolean(api.value(7))
  const borderColor = api.value(6) || (outsideShift ? '#EF4444' : '#2F83B8')
  const taskFill = outsideShift ? '#FEF2F2' : '#EAF4FB'
  const taskName = api.value(4) || ''
  const statusText = formatTaskStatus(api.value(5))
  const contentInset = 5
  const contentX = task.x + contentInset
  const contentY = task.y + 2
  const contentWidth = Math.max(0, task.width - contentInset * 2)
  const contentHeight = Math.max(0, task.height - 4)
  const cellHeight = contentHeight / 2
  const topSideWidth = Math.min(48, Math.max(40, contentWidth * 0.18))
  const topCenterWidth = Math.max(0, contentWidth - topSideWidth * 2)
  const cells = {
    start: createCell(contentX, contentY, topSideWidth, cellHeight),
    status: createCell(contentX + topSideWidth, contentY, topCenterWidth, cellHeight),
    end: createCell(contentX + topSideWidth + topCenterWidth, contentY, topSideWidth, cellHeight),
    name: createCell(contentX, contentY + cellHeight, contentWidth, cellHeight),
  }
  const showDetails = task.height >= 30 && task.width >= 140
  const showTime = showDetails
  const nameCell = showDetails ? cells.name : createCell(contentX, task.y, contentWidth, task.height)

  return {
    type: 'group',
    transition: [],
    info: { taskItem: true },
    children: [
      { type: 'rect', shape: task, style: { fill: taskFill, stroke: borderColor, lineWidth: 1.25 } },
      showTime && createTextCell(cells.start, formatTaskTime(api.value(2)), { textFill: '#64748B', fontSize: 10 }),
      showDetails && createTextCell(cells.status, truncateText(statusText, cells.status.width - 10, 11), { fontSize: 11 }),
      showTime && createTextCell(cells.end, formatTaskTime(api.value(3)), { textFill: '#64748B', fontSize: 10 }),
      task.height >= 16 && createTextCell(nameCell, truncateText(taskName, nameCell.width, 12), { fontSize: 12 }),
    ].filter(Boolean),
  }
}
