import { ResourceRenderItem, ResourceScheduleRenderItem } from './renderResource'
import { TaskRenderItem } from './renderTask'
import { PROJECT_ID } from './project'
import { getTheme } from './theme'

const TWENTY_MINUTES = 20 * 60 * 1000
const TARGET_RESOURCE_ROW_HEIGHT = 44
// 64px toolbar + 48px unassigned-task row + 56px timeline header.
const GRID_TOP = 168
const GRID_BOTTOM = 26
const DEFAULT_UNASSIGNED_PANEL_RATIO = 0.2
const WS_URL = `ws://127.0.0.1:5001/ws?projectId=${encodeURIComponent(PROJECT_ID)}&transport=websocket`
const VERTICAL_HANDLE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg=='
const HORIZONTAL_HANDLE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC'

const defaultRange = () => {
  const start = new Date(); start.setHours(4, 0, 0, 0)
  const end = new Date(start); end.setDate(end.getDate() + 1)
  return [start.getTime(), end.getTime()]
}
const taskRange = (task) => {
  const values = (Array.isArray(task) ? task : []).flatMap((item) => [item?.[2], item?.[3]]).filter(Number.isFinite)
  return values.length ? [Math.min(...values), Math.max(...values)] : defaultRange()
}
const resourceData = (resource, offset = 0) => resource.map((item, index) => [index + offset].concat(item))
const initialYEnd = (dom, rows) => Math.min(100, Math.max(1, ((Math.max(0, dom.clientHeight - GRID_TOP - GRID_BOTTOM) / TARGET_RESOURCE_ROW_HEIGHT) / Math.max(1, rows)) * 100))

export const createGanttOption = ({ dom, resource, task, unassignedTask, onAssignTask, resourceRowOffset = 0, resourceTotalCount = resource.length, resourceFilterOnChange, onTaskEvent, onSearch, window }) => {
  const theme = getTheme()
  const paddingRows = Math.ceil((dom.clientHeight * DEFAULT_UNASSIGNED_PANEL_RATIO) / TARGET_RESOURCE_ROW_HEIGHT) + 1
  const totalRows = resourceTotalCount + resourceRowOffset + paddingRows
  const windowRange = [new Date(window?.startTime).getTime(), new Date(window?.endTime).getTime()]
  const xRange = windowRange.every(Number.isFinite) ? windowRange : taskRange(task)
  const yEnd = initialYEnd(dom, totalRows)

  return {
    ws: { enabled: true, url: WS_URL, onTaskEvent, reconnect: true, reconnectDelay: 1000, maxReconnectDelay: 10000 },
    title: {},
    split: [
      { type: 'slider', orient: 'vertical', handleIcon: VERTICAL_HANDLE, backgroundColor: theme.scrollTrack },
      { type: 'slider', orient: 'horizontal', handleIcon: HORIZONTAL_HANDLE, backgroundColor: theme.scrollTrack },
    ],
    dataZoom: [
      { type: 'slider', id: 'xSlider', xAxisIndex: 0, filterMode: 'weakFilter', height: 20, bottom: 0, start: 0, end: 50, handleIcon: 'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z', handleSize: '80%', showDetail: false, borderColor: theme.axisLine, backgroundColor: theme.gridBackground, fillerColor: theme.primarySoft, handleStyle: { color: theme.surface, borderColor: theme.primary }, moveHandleStyle: { color: theme.scrollThumb }, textStyle: { color: theme.muted }, dataBackground: { lineStyle: { color: theme.border, width: 0.5 }, areaStyle: { color: theme.border, opacity: 0.2 } }, selectedDataBackground: { lineStyle: { color: theme.primary, width: 0.5 }, areaStyle: { color: theme.primary, opacity: 0.2 } } },
      { type: 'inside', id: 'insideX', xAxisIndex: 0, filterMode: 'weakFilter', start: 0, end: 26, zoomOnMouseWheel: false, moveOnMouseMove: true },
      { type: 'slider', id: 'ySlider', yAxisIndex: 0, show: false, invisible: true, zoomLock: true, width: 10, right: 10, top: 70, bottom: 20, start: 0, end: yEnd, handleSize: 0, showDetail: false },
      { type: 'inside', id: 'insideY', yAxisIndex: 0, start: 0, end: yEnd, zoomOnMouseWheel: false, moveOnMouseMove: true, moveOnMouseWheel: true },
    ],
    // The scrollbar sits 6px beyond the grid and is 8px wide; keep 1px at the canvas edge.
    grid: { top: GRID_TOP, right: 15 },
    xAxis: { type: 'time', position: 'top', interval: TWENTY_MINUTES, minInterval: TWENTY_MINUTES, maxInterval: TWENTY_MINUTES, min: xRange[0], max: xRange[1], axisLabel: { show: true, color: theme.axisText, fontSize: 12, margin: 12 }, axisTick: { lineStyle: { color: theme.axisLine } }, axisLine: { lineStyle: { color: theme.axisLine } }, splitNumber: 24 },
    yAxis: { axisTick: { show: false }, splitLine: { show: false }, axisLine: { show: false }, axisLabel: { show: false, margin: 90 }, splitNumber: 5, inverse: true, min: 0, resourceCount: resource.length, resourceRowOffset, targetRowHeight: TARGET_RESOURCE_ROW_HEIGHT, max: totalRows },
    resourceFilter: { id: 'resourceFilter', show: true, resources: resource, onChange: resourceFilterOnChange },
    ganttQuery: { id: 'ganttQuery', show: true, placeholder: '输入关键词', top: 24, right: 16, width: 420, conditions: ['任务名', '资源名'], onSearch, windowRange: window },
    liquidGlassLayer: { id: 'liquidGlassLayer', show: false, width: 210, height: 150, left: 360, top: 20, zIndex: 35, title: '' },
    unassignedBoard: { id: 'unassignedBoard', show: true, data: unassignedTask, resources: resource, resourceRowOffset, onAssignTask },
    series: [
      { type: 'custom', id: 'resourceSchedule', dimensions: ['rowIndex', 'name', 'id', 'code', 'status', 'timeline'], encode: { x: -1, y: 0 }, renderItem: ResourceScheduleRenderItem, animationDuration: 220, animationDurationUpdate: 1400, animationEasingUpdate: 'quadraticInOut', data: resourceData(resource, resourceRowOffset) },
      { type: 'custom', id: 'assignedTasks', dimensions: ['id', 'resourceIndex', 'startTime', 'endTime', 'taskName', 'status', 'color', 'outsideShift', 'laneIndex', 'laneCount', 'assignmentId', 'assignmentStatus', 'shiftId', 'assignmentVersion', 'flightNumber', 'aircraft', 'location', 'locked', 'showUnlock', 'notifyStatus'], encode: { x: [2, 3], y: 1 }, renderItem: TaskRenderItem, data: task },
      { type: 'custom', id: 'resourceRows', dimensions: ['rowIndex', 'name', 'id', 'code', 'status', 'timeline'], encode: { x: -1, y: 0 }, renderItem: ResourceRenderItem, data: resourceData(resource, resourceRowOffset) },
    ],
  }
}
