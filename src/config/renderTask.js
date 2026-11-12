import { clipRectByRect } from '../util/graphic'
import { getWidth } from 'zrender/lib/contain/text'
import { lerp, parse } from 'zrender/lib/tool/color'
import { getTheme } from './theme'

const formatTaskTime = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const pad2 = (num) => (num < 10 ? `0${num}` : `${num}`)
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`
}

const taskFont = (fontSize, fontWeight = 400) => fontWeight + ' ' + fontSize + 'px sans-serif'

const truncateText = (text, maxWidth, fontSize = 11, fontWeight = 400) => {
  const value = String(text || '')
  const font = taskFont(fontSize, fontWeight)
  if (maxWidth <= 0) return ''
  if (getWidth(value, font) <= maxWidth) return value
  if (getWidth('…', font) > maxWidth) return ''
  const characters = Array.from(value)
  let low = 0
  let high = characters.length
  while (low < high) {
    const middle = Math.ceil((low + high) / 2)
    if (getWidth(characters.slice(0, middle).join('') + '…', font) <= maxWidth) low = middle
    else high = middle - 1
  }
  return characters.slice(0, low).join('') + '…'
}

const LOCKED_PATH = 'M780.8 435.2h38.4c21.2 0 38.4 17.2 38.4 38.4v384c0 21.2-17.2 38.4-38.4 38.4H204.8c-21.2 0-38.4-17.2-38.4-38.4v-384c0-21.2 17.2-38.4 38.4-38.4h38.4v-38.4C243.2 248.3 363.5 128 512 128s268.8 120.3 268.8 268.8v38.4z m-76.8 0v-38.4c0-106-86-192-192-192s-192 86-192 192v38.4h384zM473.6 588.8v153.6h76.8V588.8h-76.8z'
const UNLOCKED_PATH = 'M324.3 435.2h499.2c21.2 0 38.4 17.2 38.4 38.4v384c0 21.2-17.2 38.4-38.4 38.4H209.1c-21.2 0-38.4-17.2-38.4-38.4v-384c0-21.2 17.2-38.4 38.4-38.4h38.4v-38.4c-0.1-148.5 120.2-268.9 268.7-268.9 101.9 0 195.1 57.5 240.6 148.7L688 310.9c-47.4-94.9-162.7-133.4-257.5-86-65.1 32.5-106.3 99.1-106.2 171.9v38.4z m115.2 192V704h153.6v-76.8H439.5z'

const TASK_STATUS_CODE = {
  1: '未', 2: '到', 3: '始', 4: '结', 5: '阻',
  6: '继', 7: '取', 8: '恢', 9: '挂', 10: '挂',
}

const TASK_STATUS_ICON = {
  1: 'clock', 2: 'flag', 3: 'play', 4: 'check', 5: 'warning',
  6: 'arrow', 7: 'cancel', 8: 'restore', 9: 'pause', 10: 'hold',
}

const getStatusVisual = (status) => {
  const theme = getTheme()
  return theme.taskStatus[Number(status)] || theme.taskStatus[2]
}

const createCell = (x, y, width, height) => ({ x, y, width, height })

const createTextCell = (cell, text, options = {}) => ({
  type: 'text',
  name: options.name,
  silent: true,
  style: {
    x: options.align === 'left' ? cell.x : options.align === 'right' ? cell.x + cell.width : cell.x + cell.width / 2,
    y: cell.y + cell.height / 2,
    text,
    fill: options.textFill || getTheme().taskText,
    font: taskFont(options.fontSize || 11, options.fontWeight || 400),
    align: options.align || 'center',
    verticalAlign: 'middle',
  },
})

const createLine = (x1, y1, x2, y2, color, lineWidth = 1.1) => ({ type: 'line', silent: true, shape: { x1, y1, x2, y2 }, style: { stroke: color, lineWidth, lineCap: 'round' } })

const createNotifyIcon = (notifyStatus, cx, cy, size) => {
  const h = size / 2
  const rect = { x: -h + 1, y: -h + 1, width: size - 2, height: size - 2, r: 0.5 }
  let children
  if (notifyStatus === 0) {
    children = [{ type: 'rect', shape: rect, style: { stroke: '#7B8795', fill: 'none', lineWidth: 1 } }]
  } else if (notifyStatus === 1) {
    children = [{ type: 'rect', shape: rect, style: { fill: '#0EE3CC' } }]
  } else if (notifyStatus === 2) {
    children = [
      { type: 'rect', shape: rect, style: { fill: '#3391E6' } },
      { type: 'polyline', shape: { points: [[-h + 2, 0], [-1, h - 2], [h - 2, -h + 2]] }, style: { stroke: '#FFFFFF', fill: 'none', lineWidth: 1, lineJoin: 'round', lineCap: 'round' } },
    ]
  } else {
    children = [createLine(-h + 2, -h + 2, h - 2, h - 2, '#FF0000'), createLine(h - 2, -h + 2, -h + 2, h - 2, '#FF0000')]
  }
  return { type: 'group', name: 'taskNotifyIcon', silent: true, x: cx, y: cy, children }
}

const createTaskStatusIcon = (taskStatus, cx, cy, size) => {
  const theme = getTheme()
  const iconName = TASK_STATUS_ICON[taskStatus]
  const color = getStatusVisual(taskStatus).accent
  const stroke = { stroke: color, lineWidth: 1.6, fill: 'none', lineCap: 'round', lineJoin: 'round' }
  const line = (x1, y1, x2, y2) => createLine(x1, y1, x2, y2, color, 1.6)
  let children = []
  if (iconName === 'clock') children = [
    { type: 'circle', shape: { cx: 0, cy: 0, r: 6 }, style: stroke },
    line(0, 0, 0, -3.5), line(0, 0, 3, 1),
  ]
  if (iconName === 'flag') children = [
    line(-5, -6, -5, 6),
    { type: 'polyline', shape: { points: [[-5, -5], [6, -6], [4, 0], [-5, 1]] }, style: stroke },
  ]
  if (iconName === 'play') children = [
    { type: 'polygon', shape: { points: [[-4, -6], [6, 0], [-4, 6]] }, style: { fill: color } },
  ]
  if (iconName === 'check') children = [
    { type: 'polyline', shape: { points: [[-6, 0], [-1, 5], [6, -5]] }, style: stroke },
  ]
  if (iconName === 'warning') children = [
    { type: 'polygon', shape: { points: [[0, -6.5], [6.5, 5.5], [-6.5, 5.5]] }, style: stroke },
    line(0, -2.5, 0, 0.5),
    { type: 'circle', shape: { cx: 0, cy: 3, r: 0.9 }, style: { fill: color } },
  ]
  if (iconName === 'arrow') children = [
    line(-6, 0, 6, 0),
    { type: 'polyline', shape: { points: [[1, -5], [6, 0], [1, 5]] }, style: stroke },
  ]
  if (iconName === 'cancel') children = [line(-5, -5, 5, 5), line(5, -5, -5, 5)]
  if (iconName === 'restore') children = [
    { type: 'arc', shape: { cx: 1, cy: 0, r: 5.5, startAngle: -Math.PI * 0.5, endAngle: Math.PI * 1.15, clockwise: true }, style: stroke },
    { type: 'polyline', shape: { points: [[-6, -5], [-6, -1], [-2, -1]] }, style: stroke },
  ]
  if (iconName === 'pause') children = [
    { type: 'rect', shape: { x: -5, y: -6, width: 3.5, height: 12, r: 0.6 }, style: { fill: color } },
    { type: 'rect', shape: { x: 1.5, y: -6, width: 3.5, height: 12, r: 0.6 }, style: { fill: color } },
  ]
  if (iconName === 'hold') children = [
    { type: 'circle', shape: { cx: 0, cy: 0, r: 6 }, style: stroke }, line(-3, 0, 3, 0),
  ]
  return {
    type: 'group', name: 'taskStatusIcon', silent: true,
    x: cx, y: cy, scaleX: size / 16, scaleY: size / 16,
    info: { iconName }, children,
  }
}

const createLockIcon = (locked, cx, cy, size) => ({
  type: 'path', name: 'taskLockIcon', silent: true,
  shape: { pathData: locked ? LOCKED_PATH : UNLOCKED_PATH, x: cx - size / 2, y: cy - size / 2, width: size, height: size },
  info: { locked },
  style: { fill: getTheme().muted },
})

// Keep the script's groups, adding the designed task icon beside its short code.
const createStateContent = (cell, notifyStatus, locked, taskStatus, fontSize) => {
  const theme = getTheme()
  if (cell.width < 4 || cell.height < 6) return null
  const notify = notifyStatus == null || notifyStatus === '' ? null : Number(notifyStatus)
  const code = TASK_STATUS_CODE[taskStatus] || ''
  const taskIcon = TASK_STATUS_ICON[taskStatus]
  const font = taskFont(fontSize, 500)
  const codeWidth = getWidth(code, font)
  let iconSize = Math.min(10, cell.height - 2, cell.width)
  let groupGap = 4
  let items = []
  if ([0, 1, 2, 3].includes(notify)) items.push('notify')
  items.push('lock')
  if (taskIcon) items.push('taskIcon')
  if (code) items.push('code')
  const itemWidth = (item) => item === 'code' ? codeWidth : iconSize
  const gapBefore = (item, index) => index === 0 ? 0 : item === 'code' ? 2 : groupGap
  const totalWidth = () => items.reduce((sum, item, index) => sum + itemWidth(item) + gapBefore(item, index), 0)
  if (totalWidth() > cell.width) {
    iconSize = Math.min(iconSize, 9)
    groupGap = 3
  }
  // Drop duplicate text before the task icon or the lock.
  if (totalWidth() > cell.width && taskIcon) items = items.filter((item) => item !== 'code')
  if (totalWidth() > cell.width) {
    iconSize = Math.min(iconSize, 8)
    groupGap = 2
  }
  if (totalWidth() > cell.width) items = items.filter((item) => item !== 'notify')
  // Lock state is persistent, including unlocked tasks; retain it on tiny cards.
  if (totalWidth() > cell.width && taskIcon) items = items.filter((item) => item !== 'taskIcon')
  if (totalWidth() > cell.width) return null
  if (!items.length) return null
  const width = totalWidth()
  let cursor = 0
  const children = items.map((item, index) => {
    cursor += gapBefore(item, index)
    let child
    if (item === 'notify') child = createNotifyIcon(notify, cursor + iconSize / 2, 0, iconSize)
    else if (item === 'lock') child = createLockIcon(locked, cursor + iconSize / 2, 0, iconSize)
    else if (item === 'taskIcon') child = createTaskStatusIcon(taskStatus, cursor + iconSize / 2, 0, iconSize)
    else child = {
      type: 'text', name: 'taskStatusCode', silent: true,
      style: { x: cursor, y: 0, text: code, font, fill: theme.taskMetaText, align: 'left', verticalAlign: 'middle' },
    }
    cursor += itemWidth(item)
    return child
  })
  return {
    type: 'group', name: 'taskState', silent: true, transition: [],
    x: cell.x + (cell.width - width) / 2, y: cell.y + cell.height / 2,
    info: { width, iconSize, groupGap, codeGap: 2 }, children,
  }
}

const createCompactContent = (cell, title, notifyStatus, locked, taskStatus) => {
  const minimumStateWidth = 18
  const titleReserve = Math.min(getWidth(title, taskFont(10, 500)), 24, Math.max(0, cell.width - minimumStateWidth - 5))
  const stateCell = createCell(cell.x, cell.y, Math.max(0, cell.width - titleReserve - (titleReserve ? 5 : 0)), cell.height)
  const state = createStateContent(stateCell, notifyStatus, locked, taskStatus, 10)
  const stateWidth = state?.info.width || 0
  const gap = state ? 5 : 0
  const text = truncateText(title, Math.max(0, cell.width - stateWidth - gap), 10, 500)
  const textWidth = getWidth(text, taskFont(10, 500))
  const groupWidth = textWidth + stateWidth + (text ? gap : 0)
  const startX = cell.x + Math.max(0, (cell.width - groupWidth) / 2)
  const children = []
  if (text) children.push(createTextCell(createCell(startX, cell.y, textWidth, cell.height), text, { name: 'taskTitle', align: 'left', fontSize: 10, fontWeight: 500 }))
  if (state) {
    state.x = startX + textWidth + (text ? gap : 0)
    children.push(state)
  }
  return children
}

export const TaskRenderItem = function (params, api) {
  const theme = getTheme()
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
  const taskStatus = api.value(5)
  const notifyStatus = api.value(19)
  const visual = outsideShift
    ? theme.outsideShift
    : getStatusVisual(taskStatus)
  const customColor = api.value(6)
  // Preserve custom hue, but blend it into the same subdued border palette.
  const borderColor = typeof customColor === 'string' && parse(customColor)
    ? lerp(0.65, [customColor, theme.border]) : visual.border
  const taskFill = visual.background
  const taskName = String(api.value(4) || '')
  const flightNumber = String(api.value(14) || '')
  const aircraft = String(api.value(15) || '')
  const location = String(api.value(16) || '')
  const locked = Boolean(api.value(17))
  const title = flightNumber || taskName || String(api.value(0) || '')
  const contentInset = task.width >= 70 ? 9 : Math.min(6, task.width / 4)
  const contentX = task.x + contentInset
  const contentY = task.y + 2
  const contentWidth = Math.max(0, task.width - contentInset * 2)
  const contentHeight = Math.max(0, task.height - 4)
  const children = [{ type: 'rect', shape: task, style: { fill: taskFill, stroke: borderColor, lineWidth: 1 } }]
  if (task.width > 2 && task.height > 2) children.push({
    type: 'rect', name: 'taskStatusTab', silent: true,
    shape: { x: task.x + 0.5, y: task.y + 0.5, width: Math.min(4, task.width - 1), height: task.height - 1, r: [2, 0, 0, 2] },
    style: { fill: visual.accent },
  })

  if (task.width >= 84 && task.height >= 28) {
    // Both rows share columns: start/status/end, then flight/task/stand.
    const cellHeight = contentHeight / 2
    const columnGap = 4
    const columnSpace = Math.max(0, contentWidth - columnGap * 2)
    const sideWidth = columnSpace * 0.32
    const middleWidth = columnSpace - sideWidth * 2
    const columnX = [contentX, contentX + sideWidth + columnGap, contentX + sideWidth + columnGap + middleWidth + columnGap]
    const widths = [sideWidth, middleWidth, sideWidth]
    const topCells = columnX.map((x, index) => createCell(x, contentY, widths[index], cellHeight))
    const bottomCells = columnX.map((x, index) => createCell(x, contentY + cellHeight, widths[index], cellHeight))
    const fontSize = task.width >= 132 ? 10 : 9
    const startText = truncateText(formatTaskTime(api.value(2)), sideWidth, fontSize)
    const endText = truncateText(formatTaskTime(api.value(3)), sideWidth, fontSize)
    children.push(createTextCell(topCells[0], startText, { name: 'taskStart', align: 'left', textFill: theme.taskMetaText, fontSize }))
    children.push(createStateContent(topCells[1], notifyStatus, locked, taskStatus, fontSize))
    children.push(createTextCell(topCells[2], endText, { name: 'taskEnd', align: 'right', textFill: theme.taskMetaText, fontSize }))
    if (flightNumber) children.push(createTextCell(bottomCells[0], truncateText(flightNumber, sideWidth, fontSize, 500), { name: 'taskFlight', align: 'left', fontSize, fontWeight: 500 }))
    if (taskName) children.push(createTextCell(bottomCells[1], truncateText(taskName, middleWidth, fontSize), { name: 'taskContent', fontSize }))
    if (location) children.push(createTextCell(bottomCells[2], truncateText(location, sideWidth, fontSize), { name: 'taskLocation', align: 'right', textFill: theme.taskMetaText, fontSize }))
  } else if (task.width >= 42 && task.height >= 14) {
    children.push(...createCompactContent(createCell(contentX, task.y, contentWidth, task.height), title, notifyStatus, locked, taskStatus))
  } else {
    children.push(createStateContent(createCell(contentX, task.y, contentWidth, task.height), notifyStatus, locked, taskStatus, 9))
  }

  return {
    type: 'group',
    transition: [],
    info: { taskItem: true, taskId: api.value(0), title, taskName, aircraft, location, locked, notifyStatus, taskStatus, startTime: api.value(2), endTime: api.value(3) },
    children: children.filter(Boolean),
  }
}
