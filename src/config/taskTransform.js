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

const toTimestamp = (value) => {
  if (!value) return null
  const timestamp = new Date(value).getTime()
  return Number.isFinite(timestamp) ? timestamp : null
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
        task.status,
        task.color,
        Boolean(task.outsideShift),
        0,
        1,
        task.assignmentId,
        task.assignmentStatus,
        task.shiftId,
        task.assignmentVersion,
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
