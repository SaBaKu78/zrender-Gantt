import { getResourceList } from './src/api/resource'
import { getTask } from './src/api/task'
import { init } from './src/core/Gantt'
import { clipRectByRect } from './src/util/graphic'

const dom = document.getElementById('main')

const data1 = await getResourceList({})
const data2 = await getTask({})
const resource = (Array.isArray(data1) ? data1 : []).map((r) => [r.displayName, r.id])
const gantt = init(dom)
const TWENTY_MINUTES = 20 * 60 * 1000
const TARGET_RESOURCE_ROW_HEIGHT = 44
const GRID_TOP = 60
const GRID_BOTTOM = 26
const initialYZoomEnd = Math.min(
  100,
  Math.max(
    1,
    ((Math.max(0, dom.clientHeight - GRID_TOP - GRID_BOTTOM) / TARGET_RESOURCE_ROW_HEIGHT) /
      Math.max(1, resource.length)) *
      100,
  ),
)

const formatTaskTime = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const buildFlightStatusText = (item) => {
  const notifyMap = {
    0: '□',
    1: '■',
    2: '☑',
    3: '×',
  }
  const taskStatusMap = {
    1: '未',
    2: '到',
    3: '始',
    4: '结',
    5: '阻',
    6: '继',
    7: '取',
    8: '恢',
    9: '挂',
    10: '挂',
  }
  const canceledText = `${item.inBoundFlightStatus === 2 ? '取' : ''}${item.outBoundFlightStatus === 2 ? '取' : ''}`
  const flightText = `${item.inFlightNum || ''}${item.outFlightNum || ''}`
  const descriptionText = `${item.description ? ' 🔔' : ''}${item.dispatchDescription ? ' ♡' : ''}`

  return `${notifyMap[item.notifyStatus] || ''}${item.locked ? '🔒' : ''}${taskStatusMap[item.taskStatus] || ''}/${canceledText}${flightText}${descriptionText}`
}

const truncateText = (text, maxWidth, fontSize = 11) => {
  const value = String(text || '')
  const maxChars = Math.max(1, Math.floor(maxWidth / (fontSize * 0.9)))
  return value.length > maxChars ? `${value.slice(0, Math.max(1, maxChars - 1))}…` : value
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

const TaskRenderItem = function (params, api) {
  const categoryIndex = api.value(0)
  const startTime = api.coord([api.value(1), categoryIndex])
  const endTime = api.coord([api.value(2), categoryIndex])
  const rowHeight = api.size([0, 1])[1]
  const barWidth = endTime[0] - startTime[0]
  const x = api.coord([api.value(1), categoryIndex])[0]
  const y = api.coord([api.value(1), categoryIndex])[1]
  const laneIndex = api.value(14) || 0
  const laneCount = Math.max(1, api.value(15) || 1)
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

  const taskName = api.value(10) || ''
  const flightStatusText = api.value(11) || ''
  const standName = api.value(12) || ''
  const gateName = api.value(13) || ''
  const startText = formatTaskTime(api.value(1))
  const endText = formatTaskTime(api.value(2))
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

const ResourceRenderItem = function (params, api) {
  var y = api.coord([api.value(2), api.value(0)])[1]
  const rowIndex = api.value(0)
  const gridX = params.coordSys.x
  const rectWidth = gridX
  const rectHeight = api.size([0, 1])[1]
  const rowFill = rowIndex % 2 === 0 ? '#FFFFFF' : '#F7F8FA'
  const dotSize = 8
  const centerY = rectHeight / 2
  return {
    type: 'group',
    position: [0, y],
    children: [
      {
        type: 'rect',
        shape: {
          x: 0,
          y: 0,
          width: rectWidth,
          height: rectHeight,
        },
        style: {
          fill: rowFill,
          stroke: '#E5EAF0',
          lineWidth: 1,
        },
      },
      {
        type: 'rect',
        shape: {
          x: 12,
          y: centerY - dotSize / 2,
          width: dotSize,
          height: dotSize,
          r: dotSize / 2,
        },
        style: {
          fill: '#F3B33D',
        },
        silent: true,
      },
      {
        type: 'text',
        style: {
          x: 28,
          y: centerY,
          text: api.value(1),
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

const resourceIndexMap = new Map(
  resource.map((item, index) => [item[1], index]),
)

const assignOverlapLanes = (tasks) => {
  const byResource = new Map()

  tasks.forEach((taskItem) => {
    const resourceIndex = taskItem[0]
    if (!byResource.has(resourceIndex)) {
      byResource.set(resourceIndex, [])
    }
    byResource.get(resourceIndex).push(taskItem)
  })

  byResource.forEach((items) => {
    items.sort((a, b) => a[1] - b[1] || a[2] - b[2])

    let component = []
    let componentEnd = -Infinity

    const flushComponent = () => {
      if (!component.length) return

      const laneEndTimes = []

      component.forEach((taskItem) => {
        let laneIndex = laneEndTimes.findIndex((endTime) => endTime <= taskItem[1])
        if (laneIndex === -1) {
          laneIndex = laneEndTimes.length
          laneEndTimes.push(taskItem[2])
        } else {
          laneEndTimes[laneIndex] = taskItem[2]
        }

        taskItem[14] = laneIndex
      })

      const laneCount = Math.max(1, laneEndTimes.length)
      component.forEach((taskItem) => {
        taskItem[15] = laneCount
      })
    }

    items.forEach((taskItem) => {
      if (!component.length || taskItem[1] < componentEnd) {
        component.push(taskItem)
        componentEnd = Math.max(componentEnd, taskItem[2])
        return
      }

      flushComponent()
      component = [taskItem]
      componentEnd = taskItem[2]
    })

    flushComponent()
  })

  return tasks
}

const task = assignOverlapLanes((Array.isArray(data2) ? data2 : [])
  .map((item) => {
    const resourceId = item.taskAssignList?.[0]?.currentResourceId
    const resourceIndex = resourceIndexMap.get(resourceId)
    const scheduleStartTime = item.scheduleStartTime
    const scheduleEndTime = item.scheduleEndTime

    if (resourceIndex == null || !scheduleStartTime || !scheduleEndTime) {
      return null
    }

    return [
      resourceIndex,
      new Date(scheduleStartTime).getTime(),
      new Date(scheduleEndTime).getTime(),
      item.flightNum || '',
      item.locked || false,
      item.currentResourceName || '',
      item.currentRelatedResourceName || '',
      item.fromLocation || '',
      item.toLocation || '',
      new Date(item.taskTime || scheduleStartTime).getTime(),
      item.taskName || item.taskTypeName || '',
      buildFlightStatusText(item),
      item.flightVo?.standName || '',
      `${item.flightVo?.domGateName || ''}${item.flightVo?.intGateName || ''}`,
      0,
      1,
    ]
  })
  .filter(Boolean))
  
gantt.setOption({
  title: {
    text: 'Enable Gantt',
  },
  split: [
    {
      type: 'slider',
      orient: 'vertical',
      handleIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==',
    },
    {
      type: 'slider',
      orient: 'horizontal',
      handleIcon:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC',
    },
  ],
  dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'weakFilter',
      height: 20,
      bottom: 0,
      start: 0,
      end: 50,
      handleIcon:
        'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      showDetail: false,
    },
    {
      type: 'inside',
      id: 'insideX',
      xAxisIndex: 0,
      filterMode: 'weakFilter',
      start: 0,
      end: 26,
      zoomOnMouseWheel: false,
      moveOnMouseMove: true,
    },
    {
      type: 'slider',
      yAxisIndex: 0,
      zoomLock: true,
      width: 10,
      right: 10,
      top: 70,
      bottom: 20,
      start: 0,
      end: initialYZoomEnd,
      handleSize: 0,
      showDetail: false,
    },
    {
      type: 'inside',
      id: 'insideY',
      yAxisIndex: 0,
      start: 0,
      end: initialYZoomEnd,
      zoomOnMouseWheel: false,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
    },
  ],
  grid: {},
  xAxis: {
    type: 'time',
    position: 'top',
    interval: TWENTY_MINUTES,
    minInterval: TWENTY_MINUTES,
    maxInterval: TWENTY_MINUTES,
    axisTick: {
      lineStyle: {
        color: '#CBD5E1',
      },
    },
    splitNumber: 24,
  },
  yAxis: {
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
      margin: 90,
    },
    splitNumber: 5,
    inverse: true,
    min: 0,
    max: resource?.length,
  },
  unassignedBoard: {
    show: true,
  },
  series: [
    {
      type: 'custom',
      dimensions: [
        'id',
        'Arrival Time',
        'Departure Time',
        'Flight Number',
        'VIP',
        'Arrival Company',
        'Departure Company',
        'Arrival Line',
        'Departure Line',
        'Report Time',
        'Task Name',
        'Flight Status',
        'Stand Name',
        'Gate Name',
        'Lane Index',
        'Lane Count',
      ],
      encode: {
        x: [1, 2],
        y: 0,
      },
      renderItem: TaskRenderItem,
      data: task,
    },

    {
      type: 'custom',
      dimensions: ['name', 'id'],
      encode: {
        x: -1,
        y: 0,
      },
      renderItem: ResourceRenderItem,
      data: resource.map(function (item, index) {
        return [index].concat(item)
      }),
    },
  ],
})
