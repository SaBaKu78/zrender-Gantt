import { clipRectByRect } from '../util/graphic'

const formatTaskTime = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const pad2 = (num) => (num < 10 ? `0${num}` : `${num}`)
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

const truncateText = (text, maxWidth, fontSize = 11) => {
  const value = String(text || '')
  const maxChars = Math.max(1, Math.floor(maxWidth / (fontSize * 0.9)))
  return value.length > maxChars ? `${value.slice(0, Math.max(1, maxChars - 1))}...` : value
}

const createCell = (x, y, width, height) => ({
  x,
  y,
  width,
  height,
  cx: x + width / 2,
  cy: y + height / 2,
})

const createTextCell = (cell, text, options = {}) => ({
  type: 'group',
  position: [cell.x, cell.y],
  children: [
    {
      type: 'rect',
      shape: {
        x: 0,
        y: 0,
        width: cell.width,
        height: cell.height,
      },
      style: {
        fill: 'rgba(255,255,255,0)',
      },
      silent: true,
    },
    {
      type: 'text',
      style: {
        x: cell.width / 2,
        y: cell.height / 2,
        text,
        textFill: options.textFill || '#111827',
        fontSize: options.fontSize || 11,
        fontWeight: options.fontWeight,
        align: 'center',
        verticalAlign: 'middle',
        textAlign: 'center',
        textVerticalAlign: 'middle',
      },
    },
  ],
})

export const TaskRenderItem = function (params, api) {
  const categoryIndex = api.value(1)
  const startTime = api.coord([api.value(2), categoryIndex])
  const endTime = api.coord([api.value(3), categoryIndex])
  const rowHeight = api.size([0, 1])[1]
  const barWidth = endTime[0] - startTime[0]
  const x = api.coord([api.value(2), categoryIndex])[0]
  const y = api.coord([api.value(2), categoryIndex])[1]
  const laneIndex = api.value(8) || 0
  const laneCount = Math.max(1, api.value(9) || 1)
  const laneHeight = rowHeight / laneCount
  const taskHeight = Math.min(44, Math.max(10, laneHeight - 4))
  const taskY = y + laneIndex * laneHeight + (laneHeight - taskHeight) / 2
  const task = clipRectByRect(
    {
      x: x,
      y: taskY,
      width: barWidth,
      height: taskHeight,
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    },
  )
  if (!task || task.width <= 0 || task.height <= 0) return
  task.r = 3

  const taskName = api.value(4) || ''
  const flightStatusText = api.value(5) || ''
  const standName = api.value(6) || ''
  const gateName = api.value(7) || ''
  const startText = formatTaskTime(api.value(2))
  const endText = formatTaskTime(api.value(3))
  const contentInset = 5
  const contentX = task.x + contentInset
  const contentY = task.y + 2
  const contentWidth = Math.max(0, task.width - contentInset * 2)
  const contentHeight = Math.max(0, task.height - 4)
  const cellHeight = contentHeight / 2
  const topSideWidth = Math.min(48, Math.max(40, contentWidth * 0.18))
  const bottomSideWidth = Math.min(64, Math.max(52, contentWidth * 0.22))
  const topCenterWidth = Math.max(0, contentWidth - topSideWidth * 2)
  const bottomCenterWidth = Math.max(0, contentWidth - bottomSideWidth * 2)
  const cells = {
    start: createCell(contentX, contentY, topSideWidth, cellHeight),
    flight: createCell(contentX + topSideWidth, contentY, topCenterWidth, cellHeight),
    end: createCell(contentX + topSideWidth + topCenterWidth, contentY, topSideWidth, cellHeight),
    stand: createCell(contentX, contentY + cellHeight, bottomSideWidth, cellHeight),
    name: createCell(contentX + bottomSideWidth, contentY + cellHeight, bottomCenterWidth, cellHeight),
    gate: createCell(contentX + bottomSideWidth + bottomCenterWidth, contentY + cellHeight, bottomSideWidth, cellHeight),
  }
  const showTime = task.width >= 76
  const borderColor = '#2F9EEB'
  const taskFill = '#F3FAFF'
  const flightStatusDisplay = truncateText(flightStatusText, cells.flight.width - 10, 10)
  const standDisplay = truncateText(standName, cells.stand.width - 8, 11)
  const taskNameDisplay = truncateText(taskName, cells.name.width - 10, 11)
  const gateDisplay = truncateText(gateName, cells.gate.width - 8, 11)

  return {
    type: 'group',
    info: {
      taskItem: true,
    },
    children: [
      {
        type: 'rect',
        shape: task,
        style: {
          fill: taskFill,
          stroke: borderColor,
          lineWidth: 1,
        },
      },
      showTime && createTextCell(cells.start, startText, {
        textFill: '#64748B',
        fontSize: 10,
      }),
      showTime && createTextCell(cells.end, endText, {
        textFill: '#64748B',
        fontSize: 10,
      }),
      createTextCell(cells.flight, flightStatusDisplay, {
        fontSize: 10,
      }),
      createTextCell(cells.stand, standDisplay),
      createTextCell(cells.name, taskNameDisplay),
      createTextCell(cells.gate, gateDisplay),
    ].filter(Boolean),
  }
}