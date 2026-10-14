import { searchGantt } from './src/api/gantt'
import { init } from './src/core/Gantt'
import { createGanttOption } from './src/config/ganttOptions'
import { createTaskController } from './src/config/taskController'
import { buildResources } from './src/config/taskTransform'

const RESOURCE_ROW_OFFSET = 0
const dom = document.getElementById('main')

if (import.meta.env.VITE_USE_MOCK === 'true') {
  await import('./src/mock/index')
}

const searchParams = {
  windowStartTime: '2025-11-10T04:00:00Z',
  windowEndTime: '2025-11-10T18:59:59Z',
  resourceCategoryCode: 'STAF'
}
const result = await searchGantt(searchParams)
const resource = buildResources(result.rows)
const gantt = init(dom)
if (import.meta.env.DEV) window.__gantt__ = gantt

const taskController = createTaskController({
  gantt,
  initialResult: result,
  searchParams,
  initialVisibleResources: resource,
  resourceRowOffset: RESOURCE_ROW_OFFSET,
})

const buildVisibleGanttData = (visibleResources) => {
  taskController.setVisibleResources(visibleResources)
  return {
    assignedData: taskController.getAssignedTasks(),
    unassignedData: taskController.getUnassignedTasks(),
    resourceData: visibleResources.map((item, index) => [index + RESOURCE_ROW_OFFSET].concat(item)),
  }
}

const applyResourceFilter = (visibleResources) => {
  const data = buildVisibleGanttData(visibleResources)
  gantt.dispatchAction({
    type: 'updateResourceFilter',
    ...data,
    resources: visibleResources,
  })
}

const initialData = buildVisibleGanttData(resource)
gantt.setOption(createGanttOption({
  dom,
  resource,
  task: initialData.assignedData,
  unassignedTask: initialData.unassignedData,
  window: result.window,
  onAssignTask: taskController.assignSelectedTask,
  onTaskEvent: taskController.handleTaskEvent,
  resourceRowOffset: RESOURCE_ROW_OFFSET,
  resourceTotalCount: resource.length,
  resourceFilterOnChange: ({ visibleResources }) => applyResourceFilter(visibleResources),
}))
