const buildFlightStatusText = (item) => {
  const notifyMap = {
    0: '□',
    1: '■',
    2: '◑',
    3: '×',
  }
  const taskStatusMap = {
    1: '未',
    2: '到',
    3: '始',
    4: '结',
    5: '阻',
    6: '继',
    7: '取',
    8: '恢',
    9: '挂',
    10: '挂',
  }
  const canceledText = `${item.inBoundFlightStatus === 2 ? '取' : ''}${item.outBoundFlightStatus === 2 ? '取' : ''}`
  const flightText = `${item.inFlightNum || ''}${item.outFlightNum || ''}`
  const descriptionText = `${item.description ? ' 🔔' : ''}${item.dispatchDescription ? ' ♡' : ''}`

  return `${notifyMap[item.notifyStatus] || ''}${item.locked ? '🔒' : ''}${taskStatusMap[item.taskStatus] || ''}/${canceledText}${flightText}${descriptionText}`
}
export const createResourceIndexMaps = (resource) => ({
  byId: new Map(resource.map((item, index) => [item[1], index])),
  byStringId: new Map(resource.map((item, index) => [String(item[1]), index])),
})

export const assignOverlapLanes = (tasks) => {
  const byResource = new Map()

  tasks.forEach((taskItem) => {
    const resourceIndex = taskItem[1]
    if (!byResource.has(resourceIndex)) {
      byResource.set(resourceIndex, [])
    }
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
      component.forEach((taskItem) => {
        taskItem[9] = laneCount
      })
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

const getResourceIndex = (resourceId, resourceMaps) => {
  if (resourceId == null) return null

  return resourceMaps.byId.get(resourceId) ?? resourceMaps.byStringId.get(String(resourceId)) ?? null
}

const toAssignedTaskRow = (item, resourceMaps, buildFlightStatusText, resourceRowOffset = 0) => {
  const resourceId = item.taskAssignList?.[0]?.currentResourceId
  const resourceIndex = getResourceIndex(resourceId, resourceMaps)
  const startTime = toTimestamp(item.scheduleStartTime)
  const endTime = toTimestamp(item.scheduleEndTime)
  const reportTime = toTimestamp(item.taskTime || item.scheduleStartTime)

  if (resourceIndex == null || startTime == null || endTime == null || reportTime == null) {
    return null
  }

  return [
    item.id ?? item.taskId,
    resourceIndex + resourceRowOffset,
    startTime,
    endTime,
    item.taskName || item.taskTypeName || '',
    buildFlightStatusText(item),
    item.flightVo?.standName || '',
    `${item.flightVo?.domGateName || ''}${item.flightVo?.intGateName || ''}`,
    0,
    1,
  ]
}

export const buildAssignedTasks = (sourceTasks, resourceMaps, resourceRowOffset = 0) => assignOverlapLanes(
  (Array.isArray(sourceTasks) ? sourceTasks : [])
    .map((item) => toAssignedTaskRow(item, resourceMaps, buildFlightStatusText, resourceRowOffset))
    .filter(Boolean)
)
export const buildUnassignedTasks = (sourceTasks) => {
  const unassigned = (Array.isArray(sourceTasks) ? sourceTasks : [])
    .filter((item) => !Array.isArray(item.taskAssignList) || item.taskAssignList.length === 0)
    .map((item, index) => ({
      id: item.id || item.taskId || `unassigned-${index}`,
      name: item.taskName || item.taskTypeName || `未分配任务${index + 1}`,
      scheduleStartTime: item.scheduleStartTime,
      scheduleEndTime: item.scheduleEndTime,
      taskName: item.taskName || item.taskTypeName || '',
      flightStatusText: buildFlightStatusText(item),
      standName: item.flightVo?.standName || '',
      gateName: `${item.flightVo?.domGateName || ''}${item.flightVo?.intGateName || ''}`,
    }))

  if (unassigned.length) {
    return unassigned
  }

  return (Array.isArray(sourceTasks) ? sourceTasks : [])
    .slice(0, 3)
    .map((item, index) => ({
      id: `mock-unassigned-${index + 1}`,
      name: item.taskName || item.taskTypeName || `未分配任务${index + 1}`,
      scheduleStartTime: item.scheduleStartTime,
      scheduleEndTime: item.scheduleEndTime,
      taskName: item.taskName || item.taskTypeName || '',
      flightStatusText: buildFlightStatusText(item),
      standName: item.flightVo?.standName || '',
      gateName: `${item.flightVo?.domGateName || ''}${item.flightVo?.intGateName || ''}`,
    }))
}