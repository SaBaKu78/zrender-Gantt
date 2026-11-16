import { searchGantt, type GanttSearchParams } from '../api/gantt'
import { assignTask, findTaskById } from '../api/task'
import {
  buildAssignedTasks,
  buildResourceSeriesData,
  buildResourceSeriesUpdate,
  buildResourcesWithLoad,
  buildUnassignedTasks,
  type AssignedTaskSeriesItem,
  type ResourceFilterResource,
  type ResourceRowSource,
  type ResourceSeriesItem,
  type ResourceWithLoad,
  type TaskId,
  type TaskSource,
  type UnassignedTaskView,
} from './taskTransform'
import type { TaskEventType } from '../ws/task/types'

export type AssignmentErrorCode =
  | 'TASK_NOT_FOUND'
  | 'RESOURCE_NOT_FOUND'
  | 'SHIFT_DAILY_ID_NOT_FOUND'

type QueryCondition = '任务名' | '资源名'
type TaskEventInput = {
  payload?: {
    taskIds?: TaskId[]
    eventType?: TaskEventType
  }
}

interface TaskControllerSearchResult {
  window?: {
    startTime: string
    endTime: string
  }
  rows: ResourceRowSource[]
  unassignedTasks: TaskSource[]
}

/** Controller 只依赖甘特实例的公开更新能力，便于单元测试注入最小 mock。 */
interface TaskGanttApi {
  dispatchAction(payload: Record<string, unknown>): void
  updateTaskItems?(payload: {
    data: AssignedTaskSeriesItem[]
    affectedIds: string[]
    resourceData?: ResourceSeriesItem[]
  }): void
  updateUnassignedTasks?(payload: {
    data: UnassignedTaskView[]
    affectedIds: string[]
  }): void
}

export interface TaskControllerOptions {
  gantt: TaskGanttApi
  initialResult: TaskControllerSearchResult
  searchParams: GanttSearchParams
  initialVisibleResources: ResourceFilterResource[]
  resourceRowOffset?: number
  findTaskById?: (taskId: TaskId) => Promise<TaskSource> | TaskSource
  updateWindowMs?: number
  maxConcurrentUpdates?: number
}

const toTime = (value: unknown): number | null => {
  const time = value == null ? NaN : new Date(value as string | number | Date).getTime()
  return Number.isFinite(time) ? time : null
}

const getTaskId = (task: TaskSource | undefined): TaskId | undefined => task?.taskId ?? task?.id

const createAssignmentError = (code: AssignmentErrorCode, message: string) => {
  const error = new Error(message) as Error & { code: AssignmentErrorCode }
  error.code = code
  return error
}

export const resolveShiftDailyId = ({
  rows,
  resourceId,
  task,
}: {
  rows: ResourceRowSource[] | undefined
  resourceId: TaskId
  task: TaskSource
}): string | number => {
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
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null)
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

export const createTaskController = ({
  gantt,
  initialResult,
  searchParams,
  initialVisibleResources,
  resourceRowOffset = 0,
  findTaskById: fetchTaskById = findTaskById,
  updateWindowMs = 50,
  maxConcurrentUpdates = 8,
}: TaskControllerOptions) => {
  // currentResult 是服务端快照；查询和资源过滤只投影它，不反向改写快照。
  let currentResult: TaskControllerSearchResult = initialResult
  let currentVisibleResources: ResourceFilterResource[] = initialVisibleResources
  let updateTimer: ReturnType<typeof setTimeout> | null = null
  let processing = false
  const queuedEvents = new Map<string, TaskEventType>()
  const eventWaiters: Array<() => void> = []

  const setVisibleResources = (resources: ResourceFilterResource[]) => {
    currentVisibleResources = Array.isArray(resources) ? resources : []
  }
  let query: { keyword: string; condition: QueryCondition } = { keyword: '', condition: '任务名' }
  const matches = (value: unknown): boolean =>
    String(value || '').toLocaleLowerCase().includes(query.keyword)
  // 搜索和资源过滤都是快照的投影；WebSocket 更新不会覆盖当前查询条件。
  const getAssignedTasks = (): AssignedTaskSeriesItem[] => {
    const matchingResourceIds = new Set(currentVisibleResources.filter((item) => matches(item[0])).map((item) => String(item[1])))
    const rows = (currentResult?.rows || []).map((row) => ({
      ...row,
      assignedTasks: (row.assignedTasks || []).filter((task) => !query.keyword
        || (query.condition === '资源名' ? matchingResourceIds.has(String(row.resourceId)) : matches(task.name))),
    }))
    return buildAssignedTasks(rows, currentVisibleResources, resourceRowOffset)
  }
  const getUnassignedTasks = (): UnassignedTaskView[] => buildUnassignedTasks(currentResult?.unassignedTasks)
    .filter((task) => !query.keyword || (query.condition !== '资源名' && matches(task.name)))
  const getResources = (): ResourceWithLoad[] => buildResourcesWithLoad(currentResult?.rows)
  const getVisibleResources = (): ResourceWithLoad[] => {
    const allResources = getResources()
    const visibleIds = new Set(currentVisibleResources.map((item) => String(item[1])))
    if (!visibleIds.size) return allResources
    return allResources.filter((item) => visibleIds.has(String(item[1])))
  }
  const getResourceData = (): ResourceSeriesItem[] =>
    buildResourceSeriesData(getVisibleResources(), resourceRowOffset)
  const search = ({
    keyword = '',
    condition = '任务名',
  }: {
    keyword?: string
    condition?: QueryCondition
  }) => {
    query = { keyword: keyword.trim().toLocaleLowerCase(), condition }
    const assignedData = getAssignedTasks()
    const unassignedData = getUnassignedTasks()
    gantt.dispatchAction({ type: 'updateTaskData', assignedData, unassignedData })
    return { count: assignedData.length + unassignedData.length }
  }

  const refresh = async (): Promise<TaskControllerSearchResult> => {
    currentResult = await searchGantt(searchParams)
    const allResources = getResources()
    const availableIds = new Set(allResources.map((item) => String(item[1])))
    currentVisibleResources = currentVisibleResources.filter((item) => availableIds.has(String(item[1])))
    if (!currentVisibleResources.length) {
      currentVisibleResources = allResources.map(([name, id]) => [name, id])
    }

    gantt.dispatchAction({
      type: 'updateResourceFilter',
      assignedData: getAssignedTasks(),
      unassignedData: getUnassignedTasks(),
      ...buildResourceSeriesUpdate(getVisibleResources(), resourceRowOffset),
      resources: getVisibleResources(),
    })
    return currentResult
  }

  const expandAffectedTaskIds = (
    before: AssignedTaskSeriesItem[],
    after: AssignedTaskSeriesItem[],
    seeds: Iterable<TaskId>
  ): string[] => {
    const affected = new Set(Array.from(seeds, String))
    const expand = (items: AssignedTaskSeriesItem[]) => {
      let changed = true
      while (changed) {
        changed = false
        const selected = items.filter((item) => affected.has(String(item[0])))
        items.forEach((candidate) => {
          if (affected.has(String(candidate[0]))) return
          const connected = selected.some((item) => item[1] === candidate[1]
            && item[2] < candidate[3] && candidate[2] < item[3])
          if (connected) {
            affected.add(String(candidate[0]))
            changed = true
          }
        })
      }
    }
    expand(before)
    expand(after)
    return Array.from(affected)
  }

  const removeTaskFromSnapshot = (taskId: TaskId) => {
    const idKey = String(taskId)
    currentResult.rows.forEach((row) => {
      row.assignedTasks = (Array.isArray(row.assignedTasks) ? row.assignedTasks : [])
        .filter((task) => String(getTaskId(task)) !== idKey)
    })
    currentResult.unassignedTasks = (Array.isArray(currentResult.unassignedTasks)
      ? currentResult.unassignedTasks
      : []).filter((task) => String(getTaskId(task)) !== idKey)
  }

  const applyTaskDetail = (detail: TaskSource): string | null => {
    const taskId = getTaskId(detail)
    if (taskId == null) return null

    const idKey = String(taskId)
    removeTaskFromSnapshot(taskId)

    const task = {
      id: taskId,
      name: detail.taskName || detail.taskTypeName || detail.name || '',
      startTime: detail.scheduleStartTime || detail.startTime,
      endTime: detail.scheduleEndTime || detail.endTime,
      status: detail.taskStatus ?? detail.status ?? null,
      notifyStatus: detail.notifyStatus ?? null,
      color: detail.color ?? null,
      assignmentId: detail.currentAssignmentId ?? null,
      assignmentStatus: detail.currentAssignmentId != null ? 'ACTIVE' : null,
      shiftId: detail.currentShiftDailyId ?? detail.shiftId ?? null,
      assignmentVersion: detail.assignmentVersion ?? null,
      outsideShift: Boolean(detail.outsideShift),
      flightNumber: detail.flightNumber || detail.flightNum || detail.flightVo?.flightNum || detail.inFlightNum || detail.outFlightNum || '',
      aircraft: detail.aircraft || detail.fleetType || detail.flightVo?.aircraft || detail.flightVo?.aircraftIata || detail.inFlightAircraft || detail.outFlightAircraft || detail.inBoundAircraft || detail.outBoundAircraft || '',
      location: detail.location || detail.standName || detail.inBoundStandName || detail.outBoundStandName || detail.fromLocation || detail.toLocation || detail.fromLocationManual || detail.toLocationManual || detail.terminalBuilding || '',
      locked: Boolean(detail.locked),
      unlocked: Boolean(detail.unlocked || detail.showUnlock || detail.lockState === 'unlocked'),
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

    return idKey
  }

  const renderTaskChanges = (before: AssignedTaskSeriesItem[], changedIds: Set<string>) => {
    if (!changedIds.size) return
    const after = getAssignedTasks()
    const affectedIds = expandAffectedTaskIds(before, after, changedIds)
    if (typeof gantt.updateTaskItems === 'function') {
      gantt.updateTaskItems({ data: after, affectedIds, resourceData: getResourceData() })
    } else {
      gantt.dispatchAction({
        type: 'updateTaskData',
        assignedData: after,
        unassignedData: getUnassignedTasks(),
        resourceData: getResourceData(),
      })
    }
    if (typeof gantt.updateUnassignedTasks === 'function') {
      gantt.updateUnassignedTasks({ data: getUnassignedTasks(), affectedIds: Array.from(changedIds) })
    }
  }

  const isNotFound = (error: unknown): boolean =>
    (error as { response?: { status?: number } })?.response?.status === 404

  const resolveWaiters = () => {
    if (processing || queuedEvents.size || updateTimer != null) return
    eventWaiters.splice(0).forEach((resolve) => resolve())
  }

  const processQueuedEvents = async (): Promise<void> => {
    if (processing || !queuedEvents.size) {
      resolveWaiters()
      return
    }
    processing = true
    // 同一批次内的任务详情并行拉取，但最终只执行一次局部渲染。
    const batch = Array.from(queuedEvents.entries())
    queuedEvents.clear()
    const before = getAssignedTasks()
    const changedIds = new Set<string>()
    let cursor = 0
    const workerCount = Math.max(1, Math.min(maxConcurrentUpdates, batch.length))
    const workers = Array.from({ length: workerCount }, async () => {
      while (cursor < batch.length) {
        const [idKey, eventType] = batch[cursor++]
        const taskId = idKey
        if (eventType === 'remove') {
          removeTaskFromSnapshot(taskId)
          changedIds.add(idKey)
          continue
        }

        try {
          const detail = await fetchTaskById(taskId)
          const changedId = detail && applyTaskDetail(detail)
          if (changedId) changedIds.add(changedId)
        } catch (error: unknown) {
          if (isNotFound(error)) {
            removeTaskFromSnapshot(taskId)
            changedIds.add(idKey)
          } else {
            console.error('[TASK_WS_UPDATE_FAILED]', { taskId, error })
          }
        }
      }
    })
    await Promise.all(workers)
    renderTaskChanges(before, changedIds)
    processing = false
    if (queuedEvents.size) {
      if (updateTimer != null) clearTimeout(updateTimer)
      updateTimer = null
      processQueuedEvents()
      return
    }
    resolveWaiters()
  }

  const handleTaskEvent = (event: TaskEventInput): Promise<void> => {
    const { taskIds = [], eventType = 'upsert' } = event?.payload || {}
    let added = false
    taskIds.forEach((taskId) => {
      if (taskId != null) {
        queuedEvents.set(String(taskId), eventType)
        added = true
      }
    })
    if (!added) return Promise.resolve()
    const done = new Promise<void>((resolve) => eventWaiters.push(resolve))
    if (queuedEvents.size && updateTimer == null && !processing) {
      updateTimer = setTimeout(() => {
        updateTimer = null
        processQueuedEvents()
      }, updateWindowMs)
    } else if (processing && queuedEvents.size && updateTimer == null) {
      updateTimer = setTimeout(() => {
        updateTimer = null
        processQueuedEvents()
      }, updateWindowMs)
    }
    return done
  }

  const assignSelectedTask = async ({
    resourceId,
    taskId,
  }: {
    resourceId: TaskId
    taskId: TaskId
  }): Promise<{ success: boolean }> => {
    // 派遣前必须从服务端快照重新定位任务和可用班次，避免使用界面旧数据。
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
    search,
    setVisibleResources,
    getAssignedTasks,
    getUnassignedTasks,
    getResources,
    getVisibleResources,
    refresh,
    assignSelectedTask,
    handleTaskEvent,
  }
}
