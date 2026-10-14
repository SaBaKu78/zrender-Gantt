import type { WsMessage } from '../types'

export interface BackendWsEnvelope {
  eventId?: string | number
  projectId?: string | number
  category?: string
  action?: string
  changedAt?: string
  data?: { taskId?: string | number; taskIds?: Array<string | number> }
  messageId?: string | number
  needAck?: boolean
  subSystem?: string
  message?: string
}

export interface BackendTaskPayload {
  category?: string
  type?: string
  action?: string
  data?: { taskId?: string | number; taskIds?: Array<string | number> }
  businessType?: number
  taskIds?: Array<string | number>
}

export type TaskEventType = 'upsert' | 'remove' | 'refreshAll'

export interface TaskEvent extends WsMessage {
  type: 'TASK_EVENT'
  payload: {
    eventType: TaskEventType
    taskIds: Array<string | number>
    category?: string
    action?: string
    businessType?: number
    reason?: string
    source: 'ws'
    raw: BackendTaskPayload
    envelope: BackendWsEnvelope
  }
}

export interface BackendAckMessage {
  messageId: string | number
  type: 'ack'
}
