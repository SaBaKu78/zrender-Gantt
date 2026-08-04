import { getResourceList } from './src/api/resource'
import { getTask } from './src/api/task'
import { init } from './src/core/Gantt'
import { createGanttOption } from './src/config/ganttOptions'
import { createTaskController } from './src/config/taskController'
import { createResourceIndexMaps } from './src/config/taskTransform'

const RESOURCE_ROW_OFFSET = 0
const dom = document.getElementById('main')

const data1 = await getResourceList({})
const data2 = await getTask({})
const resource = (Array.isArray(data1) ? data1 : []).map((r) => [r.displayName, r.id])
const gantt = init(dom)
const resourceIndexMaps = createResourceIndexMaps(resource)
const taskController = createTaskController({
  gantt,
  initialTasks: data2,
  resourceIndexMaps,
  resourceRowOffset: RESOURCE_ROW_OFFSET,
})

const buildVisibleGanttData = (visibleResources) => {
  const nextResourceIndexMaps = createResourceIndexMaps(visibleResources)
  taskController.setResourceIndexMaps(nextResourceIndexMaps)

  return {
    assignedData: taskController.getAssignedTasks(),
    unassignedData: taskController.getUnassignedTasks(),
    resourceData: visibleResources.map((item, index) => [index + RESOURCE_ROW_OFFSET].concat(item)),
  }
}

const applyResourceFilter = (visibleResources) => {
  const { assignedData, unassignedData, resourceData } = buildVisibleGanttData(visibleResources)

  gantt.dispatchAction({
    type: 'updateResourceFilter',
    assignedData,
    unassignedData,
    resourceData,
    resources: visibleResources,
  })
}

const initialData = buildVisibleGanttData(resource)
gantt.setOption(createGanttOption({
  dom,
  resource,
  task: initialData.assignedData,
  unassignedTask: initialData.unassignedData,
  onAssignTask: taskController.assignSelectedTask,
  resourceRowOffset: RESOURCE_ROW_OFFSET,
  resourceTotalCount: resource.length,
  resourceFilterOnChange: ({ visibleResources }) => applyResourceFilter(visibleResources),
}))


