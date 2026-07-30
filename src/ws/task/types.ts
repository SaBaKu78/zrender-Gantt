import type { WsMessage } from '../types'

export interface BackendWsEnvelope {
  messageId?: string | number
  needAck?: boolean
  subSystem?: string
  message?: string
}

export interface BackendTaskPayload {
  category?: string
  type?: string
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

