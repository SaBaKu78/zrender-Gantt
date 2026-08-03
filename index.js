import { getResourceList } from './src/api/resource'
import { getTask } from './src/api/task'
import { init } from './src/core/Gantt'
import { createGanttOption } from './src/config/ganttOptions'
import { createTaskController } from './src/config/taskController'
import { createResourceIndexMaps } from './src/config/taskTransform'

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
})

gantt.setOption(createGanttOption({
  dom,
  resource,
  task: taskController.getAssignedTasks(),
  unassignedTask: taskController.getUnassignedTasks(),
  onAssignTask: taskController.assignSelectedTask,
}))