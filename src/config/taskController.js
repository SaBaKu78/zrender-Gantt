import { assignTask, searchTaskByIds } from '../api/task'
import { buildAssignedTasks, buildUnassignedTasks } from './taskTransform'

export const createTaskController = ({
  gantt,
  initialTasks,
  resourceIndexMaps,
}) => {
  let currentTaskData = Array.isArray(initialTasks) ? initialTasks.slice() : []

  const getAssignedTasks = () => buildAssignedTasks(currentTaskData, resourceIndexMaps)

  const getUnassignedTasks = () => buildUnassignedTasks(currentTaskData)

  const applyTaskData = () => {
    gantt.dispatchAction({
      type: 'updateTaskData',
      assignedData: getAssignedTasks(),
      unassignedData: getUnassignedTasks(),
    })
  }

  const assignSelectedTask = async ({ newResourceId, taskId, date, force }) => {
    const assignResult = await assignTask({
      newResourceId,
      taskId,
      date,
      force,
    })

    if (!assignResult?.success) {
      return { success: false }
    }

    const wsMessage = {
      type: 'TASK_ASSIGN_SUCCESS',
      taskId: assignResult.taskId ?? taskId,
    }
    const updatedTasks = await searchTaskByIds([wsMessage.taskId])
    const updatedTask = Array.isArray(updatedTasks) ? updatedTasks[0] : null

    currentTaskData = currentTaskData.map((item) => {
      const id = item.id ?? item.taskId
      const updatedId = updatedTask ? updatedTask.id ?? updatedTask.taskId : wsMessage.taskId
      if (String(id) !== String(updatedId)) return item

      return updatedTask
        ? { ...item, ...updatedTask }
        : {
            ...item,
            taskAssignList: [
              {
                id: Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`),
                taskId: id,
                currentResourceId: newResourceId,
                currentResourceName: '',
              },
            ],
      }
    })
    applyTaskData()

    return { success: true }
  }

  return {
    getAssignedTasks,
    getUnassignedTasks,
    assignSelectedTask,
  }
}