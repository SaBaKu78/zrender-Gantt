import { describe, expect, it } from 'vitest'
import {
  normalizeBackendEnvelope,
  normalizeWsMessage,
  parseBackendEnvelope,
} from '../../src/ws/task/TaskEventNormalizer'

describe('TaskEventNormalizer', () => {
  it('rejects malformed websocket envelopes', () => {
    expect(parseBackendEnvelope(null)).toBeNull()
    expect(parseBackendEnvelope({ message: 123 })).toBeNull()
  })

  it('normalizes supported task events and ignores unsupported categories', () => {
    const envelope = {
      messageId: 42,
      message: JSON.stringify([
        { category: 'gateTask', type: 'update', taskIds: [1, '2'] },
        { category: 'other', type: 'delete', taskIds: [3] },
        { category: 'gateTask', type: 'refreshAll', taskIds: [4] },
      ]),
    }

    const events = normalizeBackendEnvelope(envelope)

    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({
      type: 'TASK_EVENT',
      traceId: '42',
      payload: { eventType: 'upsert', taskIds: [1, '2'] },
    })
  })

  it('returns an empty list for invalid message payloads', () => {
    expect(normalizeWsMessage({ message: '{invalid' } as any)).toEqual([])
    expect(normalizeWsMessage({ message: JSON.stringify({ category: 'gateTask', type: 'delete' }) } as any)).toEqual([])
  })
})
