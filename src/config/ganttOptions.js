import { ResourceRenderItem } from './renderResource'
import { TaskRenderItem } from './renderTask'

const TWENTY_MINUTES = 20 * 60 * 1000
const TARGET_RESOURCE_ROW_HEIGHT = 44
const GRID_TOP = 60
const GRID_BOTTOM = 26
const DEFAULT_UNASSIGNED_PANEL_RATIO = 0.2

const createDefaultXAxisRange = () => {
  const start = new Date()
  start.setHours(4, 0, 0, 0)

  const end = new Date(start)
  end.setDate(end.getDate() + 1)

  return [start.getTime(), end.getTime()]
}

const buildResourceSeriesData = (resource) => resource.map(function (item, index) {
  return [index].concat(item)
})

const getInitialYZoomEnd = (dom, yAxisTotalRows) => Math.min(
  100,
  Math.max(
    1,
    ((Math.max(0, dom.clientHeight - GRID_TOP - GRID_BOTTOM) / TARGET_RESOURCE_ROW_HEIGHT) /
      Math.max(1, yAxisTotalRows)) *
      100,
  ),
)

export const createGanttOption = ({
  dom,
  resource,
  task,
  unassignedTask,
  onAssignTask,
}) => {
  const virtualResourcePaddingRows = Math.ceil(
    (dom.clientHeight * DEFAULT_UNASSIGNED_PANEL_RATIO) / TARGET_RESOURCE_ROW_HEIGHT,
  ) + 1
  const yAxisTotalRows = resource.length + virtualResourcePaddingRows
  const initialYZoomEnd = getInitialYZoomEnd(dom, yAxisTotalRows)
  const defaultXAxisRange = createDefaultXAxisRange()

  return {
    ws: {
      enabled: true,
      url: `wss://gfgop-sit.airchina.com.cn/api2/ips/websocket/?subsystem=bs4PEK&uid=${Date.now()}&EIO=3&transport=websocket`,
      reconnect: true,
      reconnectDelay: 1000,
      maxReconnectDelay: 10000,
    },
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
        id: 'xSlider',
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
        id: 'ySlider',
        yAxisIndex: 0,
        invisible: true,
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
      min: task.length ? null : defaultXAxisRange[0],
      max: task.length ? null : defaultXAxisRange[1],
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
      resourceCount: resource.length,
      targetRowHeight: TARGET_RESOURCE_ROW_HEIGHT,
      max: yAxisTotalRows,
    },
    unassignedBoard: {
      id: 'unassignedBoard',
      show: true,
      data: unassignedTask,
      resources: resource,
      onAssignTask,
    },
    series: [
      {
        type: 'custom',
        id: 'assignedTasks',
        dimensions: [
          'id',
          'resourceIndex',
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
          x: [2, 3],
          y: 1,
        },
        renderItem: TaskRenderItem,
        data: task,
      },
      {
        type: 'custom',
        id: 'resourceRows',
        dimensions: ['name', 'id'],
        encode: {
          x: -1,
          y: 0,
        },
        renderItem: ResourceRenderItem,
        data: buildResourceSeriesData(resource),
      },
    ],
  }
}