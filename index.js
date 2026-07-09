import { getResourceList } from './src/api/resource'
import { getTask } from './src/api/task'
import { init } from './src/core/Gantt'
import { clipRectByRect } from './src/util/graphic'

const dom = document.getElementById('main')

const data1 = await getResourceList({})
const data2 = await getTask({})
const resource = data1?.map((r) => [r.displayName, r.id])
const gantt = init(dom)

const TaskRenderItem = function (params, api) {
  const categoryIndex = api.value(0)
  const startTime = api.coord([api.value(1), categoryIndex])
  const endTime = api.coord([api.value(2), categoryIndex])
  const barHeight = api.size([0, 1])[1]
  const barWidth = endTime[0] - startTime[0]
  const x = api.coord([api.value(1), categoryIndex])[0]
  const y = api.coord([api.value(1), categoryIndex])[1]
  const task = clipRectByRect(
    {
      x: x,
      y: y,
      width: barWidth,
      height: barHeight,
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    },
  )
  return {
    type: 'group',
    children: [
      {
        type: 'rect',
        shape: task,
        style: {
          fill: '#000',
        },
      },
    ],
  }
}

const ResourceRenderItem = function (params, api) {
  var y = api.coord([api.value(2), api.value(0)])[1]
  const gridX = params.coordSys.x
  const rectWidth = gridX
  const rectHeight = api.size([0, 1])[1]
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
          fill: '#fff',
          stroke: '#E2E8ED',
          lineWidth: 1,
        },
      },
      {
        type: 'text',
        style: {
          x: rectWidth / 2,
          y: rectHeight / 2,
          text: api.value(1),
          textVerticalAlign: 'middle',
          textAlign: 'center',
          textFill: '#000',
        },
      },
    ],
  }
}

const task = [
  [
    0,
    1765123200000, //2025-12-08 00:00
    1765132380000, //2025-12-08 02:33
    'M766OG',
    true,
    'QW',
    'QW',
    'XGF-HAC',
    'HAC-CFA',
    1495360800000,
  ],

  [
    1,
    1765155600000, //2025-12-08 09:00
    1765158360000, //2025-12-08 09:46
    'Y3683',
    true,
    'AS',
    'AS',
    'MGT-HAC',
    'HAC-YPP',
    1496830500000,
  ],
  [
    1,
    1765215960000, //2025-12-9 01:46
    1765218360000, //2025-12-9 02:26
    'Y4393',
    true,
    'AS',
    'AS',
    'GHM-HAC',
    'HAC-XTL-PIB',
    1496827800000,
  ],
  [
    2,
    1765215960000, //2025-12-9 01:46
    1765218360000, //2025-12-9 02:26
    'Y4393',
    true,
    'AS',
    'AS',
    'GHM-HAC',
    'HAC-XTL-PIB',
    1496827800000,
  ],
]

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
      end: 10.5,
      handleSize: 0,
      showDetail: false,
    },
    {
      type: 'inside',
      id: 'insideY',
      yAxisIndex: 0,
      start: 0,
      end: 5,
      zoomOnMouseWheel: false,
      moveOnMouseMove: true,
      moveOnMouseWheel: true,
    },
  ],
  grid: {},
  xAxis: {
    type: 'time',
    position: 'top',
    axisTick: {
      lineStyle: {
        color: '#929ABA',
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
