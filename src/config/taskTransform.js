export const createResourceIndexMaps = (resource) => ({
  byId: new Map(resource.map((item, index) => [item[1], index])),
  byStringId: new Map(resource.map((item, index) => [String(item[1]), index])),
})

export const buildResources = (rows) => (Array.isArray(rows) ? rows : [])
  .slice()
  .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  .map((row) => [
    row.resourceDisplayName || row.resourceName || row.resourceCode || String(row.resourceId),
    row.resourceId,
    row.resourceCode || '',
    row.resourceStatus || '',
  ])

const toTimestamp = (value) => {
  if (value == null || value === '') return null
  const timestamp = new Date(value).getTime()
  return Number.isFinite(timestamp) ? timestamp : null
}

const firstText = (...values) => values.find((value) => value != null && String(value).trim()) || ''

const resolveFlightNumber = (task) => firstText(
  task.flightNumber,
  task.flightNum,
  task.flightVo?.flightNum,
  task.inFlightNum,
  task.outFlightNum
)

const resolveAircraft = (task) => firstText(
  task.aircraft,
  task.fleetType,
  task.flightVo?.aircraft,
  task.flightVo?.aircraftIata,
  task.inFlightAircraft,
  task.outFlightAircraft,
  task.inBoundAircraft,
  task.outBoundAircraft
)

const resolveLocation = (task) => firstText(
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

export const buildLoadSegments = (tasks) => {
  const events = []
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

export const buildResourcesWithLoad = (rows) => (Array.isArray(rows) ? rows : [])
  .slice()
  .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
  .map((row) => [
    row.resourceDisplayName || row.resourceName || row.resourceCode || String(row.resourceId),
    row.resourceId,
    row.resourceCode || '',
    row.resourceStatus || '',
    { load: buildLoadSegments(row?.assignedTasks) },
  ])

export const assignOverlapLanes = (tasks) => {
  const byResource = new Map()

  tasks.forEach((taskItem) => {
    const resourceIndex = taskItem[1]
    if (!byResource.has(resourceIndex)) byResource.set(resourceIndex, [])
    byResource.get(resourceIndex).push(taskItem)
  })

  byResource.forEach((items) => {
    items.sort((a, b) => a[2] - b[2] || a[3] - b[3])
    let component = []
    let componentEnd = -Infinity

    const flushComponent = () => {
      if (!component.length) return
      const laneEndTimes = []

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

export const buildAssignedTasks = (rows, visibleResources, resourceRowOffset = 0) => {
  const resourceMaps = createResourceIndexMaps(visibleResources)
  const tasks = []

  ;(Array.isArray(rows) ? rows : []).forEach((row) => {
    const resourceIndex = resourceMaps.byId.get(row.resourceId)
      ?? resourceMaps.byStringId.get(String(row.resourceId))
    if (resourceIndex == null) return

    ;(Array.isArray(row.assignedTasks) ? row.assignedTasks : []).forEach((task) => {
      const startTime = toTimestamp(task.startTime)
      const endTime = toTimestamp(task.endTime)
      if (startTime == null || endTime == null || endTime <= startTime) return

      tasks.push([
        task.id,
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

export const buildUnassignedTasks = (sourceTasks) => (Array.isArray(sourceTasks) ? sourceTasks : [])
  .map((task) => ({
    ...task,
    id: task.id,
    name: task.name || '',
    taskName: task.name || '',
    startTime: task.startTime,
    endTime: task.endTime,
  }))
