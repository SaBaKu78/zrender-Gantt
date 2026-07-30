import type { WsMessage } from '../types'
import type {
  BackendTaskPayload,
  BackendWsEnvelope,
  TaskEvent,
  TaskEventType,
} from './types'

const TASK_CATEGORY = 'gateTask'

export function parseBackendEnvelope(input: unknown): BackendWsEnvelope | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const envelope = input as BackendWsEnvelope
  if (typeof envelope.message !== 'string') {
    return null
  }

  return envelope
}

export function parseBackendTaskPayloads(
  envelope: BackendWsEnvelope
): BackendTaskPayload[] {
  if (!envelope.message) return []

  try {
    const parsed = JSON.parse(envelope.message)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch (_error) {
    return []
  }
}

export function normalizeBackendTaskPayload(
  payload: BackendTaskPayload,
  envelope: BackendWsEnvelope
): TaskEvent | null {
  if (payload.category !== TASK_CATEGORY) {
    return null
  }

  const taskIds = Array.isArray(payload.taskIds) ? payload.taskIds : []
  const eventType = resolveTaskEventType(payload)

  if (!eventType || !taskIds.length) {
    return null
  }

  return {
    type: 'TASK_EVENT',
    traceId: envelope.messageId != null ? String(envelope.messageId) : undefined,
    timestamp: Date.now(),
    payload: {
      eventType,
      taskIds,
      category: payload.category,
      businessType: payload.businessType,
      reason: payload.type,
      source: 'ws',
      raw: payload,
      envelope,
    },
  }
}

export function normalizeBackendEnvelope(envelope: BackendWsEnvelope): TaskEvent[] {
  return parseBackendTaskPayloads(envelope)
    .map((payload) => normalizeBackendTaskPayload(payload, envelope))
    .filter(Boolean) as TaskEvent[]
}

export function normalizeWsMessage(message: WsMessage): TaskEvent[] {
  const envelope = parseBackendEnvelope(message)
  return envelope ? normalizeBackendEnvelope(envelope) : []
}

function resolveTaskEventType(
  payload: BackendTaskPayload
): TaskEventType | null {
  switch (payload.type) {
    case 'delete':
    case 'remove':
    case 'cancel':
      return 'remove'
    case 'update':
      return 'upsert'
    case 'refresh':
    case 'refreshAll':
    case 'reload':
      return null
    default:
      return null
  }
}
