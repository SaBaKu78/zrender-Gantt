import Mock from 'mockjs'
import resourceResponse from './resource'
import taskResponse, { assignMockTask } from './task'

const resources = resourceResponse.data || []
const tasks = taskResponse.data || []

function buildResult() {
  const rows = resources.map((resource: any, index: number) => ({
    resourceId: String(resource.id),
    resourceCode: String(resource.code || resource.id),
    resourceName: resource.name || resource.displayName || '',
    resourceDisplayName: resource.displayName || resource.name || String(resource.id),
    resourceStatus: resource.resourceStatus || 'ON',
    displayOrder: resource.displayOrder ?? index,
    availability: [
      {
        shiftDailyId: String(resource.shiftDailyId ?? resource.id),
        startTime: '2025-11-10T04:00:00Z',
        endTime: '2025-11-10T18:59:59Z',
        status: 1,
      },
    ],
    assignedTasks: tasks
      .filter((task: any) => String(task.taskAssignList?.[0]?.currentResourceId) === String(resource.id))
      .map((task: any) => ({
        id: String(task.id ?? task.taskId),
        name: task.taskName || task.taskTypeName || '',
        startTime: task.scheduleStartTime,
        endTime: task.scheduleEndTime,
        status: task.taskStatus ?? null,
        color: null,
        assignmentId: task.taskAssignList?.[0]?.id ? String(task.taskAssignList[0].id) : null,
        assignmentStatus: 'ACTIVE',
        shiftId: null,
        assignmentVersion: 1,
        outsideShift: false,
      })),
  }))

  const assignedIds = new Set(rows.flatMap((row: any) => row.assignedTasks.map((task: any) => task.id)))
  const unassignedTasks = tasks
    .filter((task: any) => !assignedIds.has(String(task.id ?? task.taskId)))
    .map((task: any) => ({
      id: String(task.id ?? task.taskId),
      name: task.taskName || task.taskTypeName || '',
      startTime: task.scheduleStartTime,
      endTime: task.scheduleEndTime,
      status: task.taskStatus ?? null,
      color: null,
      assignmentId: null,
      assignmentStatus: null,
      shiftId: null,
      assignmentVersion: null,
      outsideShift: false,
      reason: 'NO_ACTIVE_ASSIGNMENT',
    }))

  return {
    code: 200,
    data: {
      window: { startTime: '2025-11-10T04:00:00Z', endTime: '2025-11-10T18:59:59Z' },
      rows,
      unassignedTasks,
      statistics: {
        resourceCount: rows.length,
        shiftCount: 0,
        taskCount: tasks.length,
        assignedTaskCount: tasks.length - unassignedTasks.length,
        unassignedTaskCount: unassignedTasks.length,
      },
    },
  }
}

Mock.mock(/\/basedata\/gantt\/search/, 'post', buildResult)
Mock.mock(/\/assign/, 'post', (options) => ({
  code: 200,
  data: assignMockTask(JSON.parse(options.body || '{}')),
}))
