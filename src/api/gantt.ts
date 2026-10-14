import axios from '../util/axios'

export interface GanttAvailability {
  shiftDailyId?: string
  /** @deprecated 查询接口旧字段兼容；服务端完成字段迁移后删除。 */
  shiftId?: string
  startTime: string
  endTime: string
  status: number
}

export interface GanttAssignment {
  id: string
  taskId: string
  resourceId: string
  shiftId: string
  status: string
  version: number
}

export interface GanttTaskBar {
  id: string
  name: string
  startTime: string
  endTime: string
  status: number | null
  color: string | null
  assignmentId: string | null
  assignmentStatus: string | null
  shiftId: string | null
  assignmentVersion: number | null
  outsideShift: boolean
}

export interface GanttResourceRow {
  resourceId: string
  resourceCode: string
  resourceName: string
  resourceDisplayName: string
  resourceStatus: string
  displayOrder: number
  availability: GanttAvailability[]
  assignedTasks: GanttTaskBar[]
}

export type GanttUnassignedReason =
  | 'NO_ACTIVE_ASSIGNMENT'
  | 'RESOURCE_NOT_IN_WINDOW'
  | 'OUTSIDE_SHIFT'
  | 'RESOURCE_NOT_FOUND'

export interface GanttUnassignedTask extends GanttTaskBar {
  reason: GanttUnassignedReason
}

export interface GanttSearchResult {
  window: { startTime: string; endTime: string }
  rows: GanttResourceRow[]
  unassignedTasks: GanttUnassignedTask[]
  statistics: {
    resourceCount: number
    shiftCount: number
    taskCount: number
    assignedTaskCount: number
    unassignedTaskCount: number
  }
}

export interface GanttSearchParams {
  windowStartTime: string
  windowEndTime: string
  [key: string]: unknown
}

export async function searchGantt(params: GanttSearchParams): Promise<GanttSearchResult> {
  const response = await axios({
    url: '/basedata/gantt/search',
    method: 'post',
    data: params,
  })
  const payload = response.data

  if (payload?.code != null && payload.code !== 200) {
    throw new Error(payload.message || `Gantt search failed with code ${payload.code}`)
  }

  return (payload?.data ?? payload) as GanttSearchResult
}
