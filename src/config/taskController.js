import { searchGantt } from '../api/gantt'
import { assignTask, findTaskById } from '../api/task'
import { buildAssignedTasks, buildResources, buildUnassignedTasks } from './taskTransform'

const toTime = (value) => {
  const time = value == null ? NaN : new Date(value).getTime()
  return Number.isFinite(time) ? time : null
}

const getTaskId = (task) => task?.taskId ?? task?.id

const createAssignmentError = (code, message) => {
  const error = new Error(message)
  error.code = code
  return error
}

export const resolveShiftDailyId = ({ rows, resourceId, task }) => {
  const row = (Array.isArray(rows) ? rows : []).find(
    (item) => String(item?.resourceId) === String(resourceId)
  )
  if (!row) {
    throw createAssignmentError('RESOURCE_NOT_FOUND', `未找到目标资源：${resourceId}`)
  }

  const taskStart = toTime(task?.startTime ?? task?.scheduleStartTime)
  const taskEnd = toTime(task?.endTime ?? task?.scheduleEndTime)
  const candidates = (Array.isArray(row.availability) ? row.availability : [])
    .map((availability) => {
      // shiftId 是查询接口当前使用的旧字段名；新接口明确要求 shiftDailyId。
      // 保留回退仅用于后端字段迁移期间的问题排查，待查询接口统一后删除 shiftId 回退。
      const shiftDailyId = availability?.shiftDailyId ?? availability?.shiftId
      const start = toTime(availability?.startTime)
      const end = toTime(availability?.endTime)
      if (shiftDailyId == null || start == null || end == null || end <= start) return null

      const containsTask = taskStart != null && taskEnd != null
        && start <= taskStart && end >= taskEnd
      const containsTaskStart = taskStart != null && start <= taskStart && end > taskStart
      const overlap = taskStart != null && taskEnd != null
        ? Math.max(0, Math.min(end, taskEnd) - Math.max(start, taskStart))
        : 0

      return {
        shiftDailyId,
        score: containsTask ? 3 : containsTaskStart ? 2 : overlap > 0 ? 1 : 0,
        overlap,
        start,
      }
    })
    .filter(Boolean)
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.overlap - a.overlap || a.start - b.start)

  if (!candidates.length) {
    throw createAssignmentError(
      'SHIFT_DAILY_ID_NOT_FOUND',
      `资源 ${resourceId} 在任务时段内没有可用班次日`
    )
  }

  return candidates[0].shiftDailyId
}

export const createTaskController = ({ gantt, initialResult, searchParams, initialVisibleResources, resourceRowOffset = 0 }) => {
  let currentResult = initialResult
  let currentVisibleResources = initialVisibleResources
  let wsUpdateQueue = Promise.resolve()

  const setVisibleResources = (resources) => { currentVisibleResources = resources }
  const getAssignedTasks = () => buildAssignedTasks(currentResult?.rows, currentVisibleResources, resourceRowOffset)
  const getUnassignedTasks = () => buildUnassignedTasks(currentResult?.unassignedTasks)
  const getResources = () => buildResources(currentResult?.rows)

  const refresh = async () => {
    currentResult = await searchGantt(searchParams)
    const allResources = getResources()
    const availableIds = new Set(allResources.map((item) => String(item[1])))
    currentVisibleResources = currentVisibleResources.filter((item) => availableIds.has(String(item[1])))
    if (!currentVisibleResources.length) currentVisibleResources = allResources

    gantt.dispatchAction({
      type: 'updateResourceFilter',
      assignedData: getAssignedTasks(),
      unassignedData: getUnassignedTasks(),
      resourceData: currentVisibleResources.map((item, index) => [index + resourceRowOffset].concat(item)),
      resources: currentVisibleResources,
    })
    return currentResult
  }

  const renderTaskData = () => {
    gantt.setOption({
      series: [{ id: 'assignedTasks', data: getAssignedTasks() }],
      unassignedBoard: { id: 'unassignedBoard', data: getUnassignedTasks() },
    })
  }

  const applyTaskDetail = (detail) => {
    const taskId = getTaskId(detail)
    if (taskId == null) return

    const idKey = String(taskId)
    currentResult.rows.forEach((row) => {
      row.assignedTasks = (Array.isArray(row.assignedTasks) ? row.assignedTasks : [])
        .filter((task) => String(getTaskId(task)) !== idKey)
    })
    currentResult.unassignedTasks = (Array.isArray(currentResult.unassignedTasks)
      ? currentResult.unassignedTasks
      : []).filter((task) => String(getTaskId(task)) !== idKey)

    const task = {
      id: taskId,
      name: detail.taskName || detail.taskTypeName || detail.name || '',
      startTime: detail.scheduleStartTime || detail.startTime,
      endTime: detail.scheduleEndTime || detail.endTime,
      status: detail.taskStatus ?? detail.status ?? null,
      color: detail.color ?? null,
      assignmentId: detail.currentAssignmentId ?? null,
      assignmentStatus: detail.currentAssignmentId != null ? 'ACTIVE' : null,
      shiftId: detail.currentShiftDailyId ?? detail.shiftId ?? null,
      assignmentVersion: detail.assignmentVersion ?? null,
      outsideShift: Boolean(detail.outsideShift),
    }

    const isAssigned = detail.currentAssignmentId != null
      && detail.currentAssignmentId !== ''
    const resourceRow = isAssigned
      ? currentResult.rows.find((row) => String(row.resourceId) === String(detail.currentResourceId))
      : null

    if (resourceRow) {
      resourceRow.assignedTasks.push(task)
    } else {
      currentResult.unassignedTasks.push({
        ...task,
        reason: isAssigned ? 'RESOURCE_NOT_FOUND' : 'NO_ACTIVE_ASSIGNMENT',
      })
    }

    renderTaskData()
  }

  const handleTaskEvent = (event) => {
    const taskIds = event?.payload?.taskIds || []
    wsUpdateQueue = wsUpdateQueue.then(async () => {
      for (const taskId of taskIds) {
        const detail = await findTaskById(taskId)
        if (detail) applyTaskDetail(detail)
      }
    }).catch((error) => {
      console.error('[TASK_WS_UPDATE_FAILED]', error)
    })
    return wsUpdateQueue
  }

  const assignSelectedTask = async ({ resourceId, taskId }) => {
    const task = (Array.isArray(currentResult?.unassignedTasks) ? currentResult.unassignedTasks : [])
      .find((item) => String(getTaskId(item)) === String(taskId))
    if (!task) {
      throw createAssignmentError('TASK_NOT_FOUND', `未找到待派遣任务：${taskId}`)
    }
    const shiftDailyId = resolveShiftDailyId({
      rows: currentResult?.rows,
      resourceId,
      task,
    })

    const assignResult = await assignTask({ taskId, resourceId, shiftDailyId })

    // 旧派遣接口调用（保留用于后续问题排查，请勿恢复执行）：
    // const assignResult = await assignTask({ newResourceId, taskId, date, force })

    // 新接口可能返回创建后的派遣记录而不带 success；仅显式 success:false 视为失败。
    if (assignResult?.success === false) return { success: false }
    return { success: true }
  }

  return {
    setVisibleResources,
    getAssignedTasks,
    getUnassignedTasks,
    getResources,
    refresh,
    assignSelectedTask,
    handleTaskEvent,
  }
}
