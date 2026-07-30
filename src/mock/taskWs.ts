import type { BackendWsEnvelope, BackendTaskPayload } from '../ws/task/types'

export type TaskWsMockStep = {
  delay: number
  payloads: BackendTaskPayload[]
}

const TASK_IDS = {
  updated: 2049685437775505,
  reassigned: 2049685437775506,
  removed: 2049920989319424,
}

/**
 * A deterministic task push sequence for local WebSocket integration testing.
 * The payload shape matches the backend envelope consumed by TaskEventNormalizer.
 */
export const taskWsMockSteps: TaskWsMockStep[] = [
  {
    delay: 1000,
    payloads: [
      {
        category: 'gateTask',
        type: 'update',
        businessType: 1,
        taskIds: [TASK_IDS.updated],
      },
    ],
  },
  {
    delay: 2500,
    payloads: [
      {
        category: 'gateTask',
        type: 'update',
        businessType: 1,
        taskIds: [TASK_IDS.reassigned],
      },
    ],
  },
  {
    delay: 4000,
    payloads: [
      {
        category: 'gateTask',
        type: 'remove',
        businessType: 1,
        taskIds: [TASK_IDS.removed],
      },
    ],
  },
  {
    delay: 5500,
    payloads: [
      {
        category: 'gateTask',
        type: 'update',
        businessType: 1,
        taskIds: [TASK_IDS.updated, TASK_IDS.reassigned],
      },
    ],
  },
]

export function createTaskWsMockMessage(
  payloads: BackendTaskPayload[],
  messageId = `task-ws-mock-${Date.now()}`
): BackendWsEnvelope {
  return {
    messageId,
    needAck: true,
    subSystem: 'ips',
    message: JSON.stringify(payloads),
  }
}

export function createTaskWsMockSequence(
  steps: TaskWsMockStep[] = taskWsMockSteps
): Array<{ delay: number; message: BackendWsEnvelope }> {
  return steps.map((step, index) => ({
    delay: step.delay,
    message: createTaskWsMockMessage(
      step.payloads,
      `task-ws-mock-${Date.now()}-${index + 1}`
    ),
  }))
}

