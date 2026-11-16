export type ResourceId = string | number
export type TaskId = string | number
export type ResourceFilterResource = [name: string, id: ResourceId]
export type ResourceBaseItem = [name: string, id: ResourceId, code: string, status: string]

/** 资源行使用二维时间轴：负载段只负责占用人数，班次段负责可用区间。 */
export type LoadSegment = [startTime: number, endTime: number, activeTaskCount: number]
export type AvailabilitySegment = [
  startTime: number,
  endTime: number,
  status: number,
  shiftDailyId: string,
]

export interface ResourceTimeline {
  load: LoadSegment[]
  availability: AvailabilitySegment[]
}

export type ResourceWithLoad = [
  name: string,
  id: ResourceId,
  code: string,
  status: string,
  timeline: ResourceTimeline,
]

/** resourceRows 的每个元素代表一行资源，末尾额外携带峰值负载。 */
export type ResourceSeriesItem = [
  rowIndex: number,
  name: string,
  id: ResourceId,
  code: string,
  status: string,
  timeline: ResourceTimeline,
  peakLoad: number,
]

/** resourceSchedule 会把一条资源的多个班次区间展开成多行。 */
export type ResourceScheduleSeriesItem = [
  id: string,
  rowIndex: number,
  startTime: number,
  endTime: number,
  status: number,
]

/**
 * 任务卡片的 series 元组。维度顺序必须与 ganttOptions 中的 dimensions 一致，
 * 因此新增字段只能追加，不能随意插队。
 */
export type AssignedTaskSeriesItem = [
  id: TaskId,
  resourceIndex: number,
  startTime: number,
  endTime: number,
  taskName: string,
  status: number | null | undefined,
  color: string | null | undefined,
  outsideShift: boolean,
  laneIndex: number,
  laneCount: number,
  assignmentId: TaskId | null | undefined,
  assignmentStatus: string | null | undefined,
  shiftId: TaskId | null | undefined,
  assignmentVersion: number | null | undefined,
  flightNumber: string,
  aircraft: string,
  location: string,
  locked: boolean,
  showUnlock: boolean,
  notifyStatus: number | null | undefined,
]

export interface TaskSource {
  id?: TaskId
  taskId?: TaskId
  name?: string
  taskName?: string
  taskTypeName?: string
  startTime?: string | number
  endTime?: string | number
  scheduleStartTime?: string | number
  scheduleEndTime?: string | number
  status?: number | null
  taskStatus?: number | null
  notifyStatus?: number | null
  color?: string | null
  assignmentId?: TaskId | null
  assignmentStatus?: string | null
  shiftId?: string | number | null
  assignmentVersion?: number | null
  outsideShift?: boolean
  currentAssignmentId?: string | number | null
  currentShiftDailyId?: string | number | null
  currentResourceId?: string | number | null
  reason?: string
  flightNumber?: string
  flightNum?: string
  flightVo?: {
    flightNum?: string
    aircraft?: string
    aircraftIata?: string
  }
  inFlightNum?: string
  outFlightNum?: string
  aircraft?: string
  fleetType?: string
  inFlightAircraft?: string
  outFlightAircraft?: string
  inBoundAircraft?: string
  outBoundAircraft?: string
  location?: string
  standName?: string
  inBoundStandName?: string
  outBoundStandName?: string
  fromLocation?: string
  toLocation?: string
  fromLocationManual?: string
  toLocationManual?: string
  terminalBuilding?: string
  locked?: boolean
  unlocked?: boolean
  showUnlock?: boolean
  lockState?: string
}

export interface TaskSourceAvailability {
  shiftDailyId?: string
  shiftId?: string
  startTime?: string | number
  endTime?: string | number
  status?: number
}

export interface ResourceRowSource {
  resourceId: ResourceId
  resourceCode?: string
  resourceName?: string
  resourceDisplayName?: string
  resourceStatus?: string
  displayOrder?: number
  availability?: TaskSourceAvailability[]
  assignedTasks?: TaskSource[]
}

export interface UnassignedTaskView extends TaskSource {
  id: TaskId
  name: string
  taskName: string
  startTime: string | number | undefined
  endTime: string | number | undefined
}

export const createResourceIndexMaps = (resource: ResourceFilterResource[]) => ({
  byId: new Map<ResourceId, number>(resource.map((item, index) => [item[1], index])),
  byStringId: new Map<string, number>(resource.map((item, index) => [String(item[1]), index])),
})

export const buildResources = (
  rows: ResourceRowSource[] | undefined
): ResourceBaseItem[] => (Array.isArray(rows) ? rows : [])
  .slice()
  .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  .map<ResourceBaseItem>((row) => [
    row.resourceDisplayName || row.resourceName || row.resourceCode || String(row.resourceId),
    row.resourceId,
    row.resourceCode || '',
    row.resourceStatus || '',
  ])

const toTimestamp = (value: unknown): number | null => {
  if (value == null || value === '') return null
  const timestamp = new Date(value as string | number | Date).getTime()
  return Number.isFinite(timestamp) ? timestamp : null
}

const firstText = (...values: unknown[]): string => String(
  values.find((value) => value != null && String(value).trim()) || ''
)

const resolveFlightNumber = (task: TaskSource): string => firstText(
  task.flightNumber,
  task.flightNum,
  task.flightVo?.flightNum,
  task.inFlightNum,
  task.outFlightNum
)

const resolveAircraft = (task: TaskSource): string => firstText(
  task.aircraft,
  task.fleetType,
  task.flightVo?.aircraft,
  task.flightVo?.aircraftIata,
  task.inFlightAircraft,
  task.outFlightAircraft,
  task.inBoundAircraft,
  task.outBoundAircraft
)

const resolveLocation = (task: TaskSource): string => firstText(
  task.location,
  task.standName,
  task.inBoundStandName,
  task.outBoundStandName,
  task.fromLocation,
  task.toLocation,
  task.fromLocationManual,
  task.toLocationManual,
  task.terminalBuilding
)

export const buildLoadSegments = (tasks: TaskSource[] | undefined): LoadSegment[] => {
  const events: [number, number][] = []
  ;(Array.isArray(tasks) ? tasks : []).forEach((task) => {
    const start = toTimestamp(task?.startTime)
    const end = toTimestamp(task?.endTime)
    if (start == null || end == null || end <= start) return
    events.push([start, 1], [end, -1])
  })

  if (!events.length) return []
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const segments = []
  let active = 0
  let cursor = events[0][0]
  let index = 0

  while (index < events.length) {
    const time = events[index][0]
    if (time > cursor && active > 0) segments.push([cursor, time, active])
    while (index < events.length && events[index][0] === time) {
      active += events[index][1]
      index += 1
    }
    cursor = time
  }
  return segments
}

export const buildAvailabilitySegments = (
  availability: TaskSourceAvailability[] | undefined
): AvailabilitySegment[] => (Array.isArray(availability) ? availability : [])
  .map((item) => {
    const start = toTimestamp(item?.startTime)
    const end = toTimestamp(item?.endTime)
    if (start == null || end == null || end <= start) return null
    const shiftDailyId = item?.shiftDailyId ?? item?.shiftId ?? `${start}:${end}`
    return [start, end, Number(item?.status) || 0, String(shiftDailyId)]
  })
  .filter((segment): segment is AvailabilitySegment => segment !== null)
  .sort((a, b) => a[0] - b[0] || a[1] - b[1])

export const buildResourcesWithLoad = (
  rows: ResourceRowSource[] | undefined
): ResourceWithLoad[] => (Array.isArray(rows) ? rows : [])
  .slice()
  .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  .map((row) => [
    row.resourceDisplayName || row.resourceName || row.resourceCode || String(row.resourceId),
    row.resourceId,
    row.resourceCode || '',
    row.resourceStatus || '',
    {
      load: buildLoadSegments(row?.assignedTasks),
      availability: buildAvailabilitySegments(row?.availability),
    },
  ])

export const buildResourceSeriesData = (
  resources: ResourceWithLoad[] | undefined,
  offset = 0
): ResourceSeriesItem[] => (Array.isArray(resources) ? resources : [])
  .map((item, index) => {
    const peakLoad = (Array.isArray(item?.[4]?.load) ? item[4].load : [])
      .reduce((max, segment) => Math.max(max, Number(segment?.[2]) || 0), 0)
    return [
      index + offset,
      ...item,
      peakLoad,
    ]
  })

export const buildResourceScheduleData = (
  resources: ResourceWithLoad[] | undefined,
  offset = 0
): ResourceScheduleSeriesItem[] => (Array.isArray(resources) ? resources : [])
  .reduce<ResourceScheduleSeriesItem[]>((result, item, index) => {
    const availability = Array.isArray(item?.[4]?.availability) ? item[4].availability : []
    const rowIndex = index + offset
    availability.forEach((segment) => {
      const start = Number(segment?.[0])
      const end = Number(segment?.[1])
      const shiftDailyId = String(segment?.[3] ?? `${start}:${end}`)
      result.push([
        `${rowIndex}:${shiftDailyId}`,
        rowIndex,
        start,
        end,
        Number(segment?.[2]) || 0,
      ])
    })
    return result
  }, [])

export const buildResourceSeriesUpdate = (
  resources: ResourceWithLoad[] | undefined,
  offset = 0
) => ({
  resourceData: buildResourceSeriesData(resources, offset),
  resourceScheduleData: buildResourceScheduleData(resources, offset),
})

export const assignOverlapLanes = (
  tasks: AssignedTaskSeriesItem[]
): AssignedTaskSeriesItem[] => {
  const byResource = new Map<number, AssignedTaskSeriesItem[]>()

  tasks.forEach((taskItem) => {
    const resourceIndex = taskItem[1]
    if (!byResource.has(resourceIndex)) byResource.set(resourceIndex, [])
    byResource.get(resourceIndex).push(taskItem)
  })

  byResource.forEach((items) => {
    items.sort((a, b) => a[2] - b[2] || a[3] - b[3])
    let component: AssignedTaskSeriesItem[] = []
    let componentEnd = -Infinity

    const flushComponent = () => {
      if (!component.length) return
      const laneEndTimes: number[] = []

      component.forEach((taskItem) => {
        let laneIndex = laneEndTimes.findIndex((endTime) => endTime <= taskItem[2])
        if (laneIndex === -1) {
          laneIndex = laneEndTimes.length
          laneEndTimes.push(taskItem[3])
        } else {
          laneEndTimes[laneIndex] = taskItem[3]
        }
        taskItem[8] = laneIndex
      })

      const laneCount = Math.max(1, laneEndTimes.length)
      component.forEach((taskItem) => { taskItem[9] = laneCount })
    }

    items.forEach((taskItem) => {
      if (!component.length || taskItem[2] < componentEnd) {
        component.push(taskItem)
        componentEnd = Math.max(componentEnd, taskItem[3])
        return
      }
      flushComponent()
      component = [taskItem]
      componentEnd = taskItem[3]
    })
    flushComponent()
  })

  return tasks
}

export const buildAssignedTasks = (
  rows: ResourceRowSource[] | undefined,
  visibleResources: ResourceFilterResource[],
  resourceRowOffset = 0
): AssignedTaskSeriesItem[] => {
  const resourceMaps = createResourceIndexMaps(visibleResources)
  const tasks: AssignedTaskSeriesItem[] = []

  ;(Array.isArray(rows) ? rows : []).forEach((row) => {
    const resourceIndex = resourceMaps.byId.get(row.resourceId)
      ?? resourceMaps.byStringId.get(String(row.resourceId))
    if (resourceIndex == null) return

    ;(Array.isArray(row.assignedTasks) ? row.assignedTasks : []).forEach((task) => {
      const startTime = toTimestamp(task.startTime)
      const endTime = toTimestamp(task.endTime)
      const taskId = task.id ?? task.taskId
      if (taskId == null || startTime == null || endTime == null || endTime <= startTime) return

      tasks.push([
        taskId,
        resourceIndex + resourceRowOffset,
        startTime,
        endTime,
        task.name || '',
        task.taskStatus ?? task.status,
        task.color,
        Boolean(task.outsideShift),
        0,
        1,
        task.assignmentId,
        task.assignmentStatus,
        task.shiftId,
        task.assignmentVersion,
        resolveFlightNumber(task),
        resolveAircraft(task),
        resolveLocation(task),
        Boolean(task.locked),
        Boolean(task.unlocked || task.showUnlock || task.lockState === 'unlocked'),
        task.notifyStatus ?? null,
      ])
    })
  })

  return assignOverlapLanes(tasks)
}

export const buildUnassignedTasks = (
  sourceTasks: TaskSource[] | undefined
): UnassignedTaskView[] => (Array.isArray(sourceTasks) ? sourceTasks : [])
  .reduce<UnassignedTaskView[]>((result, task) => {
    const id = task.id ?? task.taskId
    if (id == null) return result
    result.push({
      ...task,
      id,
      name: task.name || '',
      taskName: task.name || '',
      startTime: task.startTime,
      endTime: task.endTime,
    })
    return result
  }, [])
