import { afterEach, describe, expect, it, vi } from 'vitest'
import { createTaskController } from '../../src/config/taskController.js'

const makeDetail = (taskId, assignment = null) => ({
  taskId,
  taskName: `Task ${taskId}`,
  scheduleStartTime: '2025-11-10T07:00:00Z',
  scheduleEndTime: '2025-11-10T08:00:00Z',
  currentAssignmentId: assignment ? `assignment-${taskId}` : null,
  currentResourceId: assignment ? 'resource-1' : null,
})

const createHarness = (findTaskById, options = {}) => {
  const gantt = {
    updateTaskItems: vi.fn(),
    updateUnassignedTasks: vi.fn(),
  }
  const initialResult = {
    rows: [{ resourceId: 'resource-1', assignedTasks: [] }],
    unassignedTasks: [
      { id: 'task-1', name: 'Task 1', startTime: '2025-11-10T07:00:00Z', endTime: '2025-11-10T08:00:00Z' },
      { id: 'task-2', name: 'Task 2', startTime: '2025-11-10T07:00:00Z', endTime: '2025-11-10T08:00:00Z' },
    ],
  }
  const controller = createTaskController({
    gantt,
    initialResult,
    initialVisibleResources: [['Resource 1', 'resource-1']],
    findTaskById,
    updateWindowMs: 50,
    ...options,
  })
  return { controller, gantt, initialResult }
}

afterEach(() => vi.useRealTimers())

describe('task controller websocket updates', () => {
  it('merges duplicate ids in the 50ms window and applies the fetched snapshot', async () => {
    vi.useFakeTimers()
    const findTaskById = vi.fn(async (id) => makeDetail(id, true))
    const { controller, gantt, initialResult } = createHarness(findTaskById)

    const first = controller.handleTaskEvent({ payload: { eventType: 'upsert', taskIds: ['task-1'] } })
    const second = controller.handleTaskEvent({ payload: { eventType: 'upsert', taskIds: ['task-1', 'task-2'] } })
    await vi.advanceTimersByTimeAsync(50)
    await Promise.all([first, second])

    expect(findTaskById).toHaveBeenCalledTimes(2)
    expect(initialResult.unassignedTasks).toHaveLength(0)
    expect(initialResult.rows[0].assignedTasks.map((task) => task.id)).toEqual(['task-1', 'task-2'])
    expect(gantt.updateTaskItems).toHaveBeenCalledTimes(1)
    expect(gantt.updateUnassignedTasks).toHaveBeenCalled()
  })

  it('keeps the failed task unchanged while applying other details', async () => {
    vi.useFakeTimers()
    const findTaskById = vi.fn(async (id) => {
      if (id === 'task-1') throw new Error('network unavailable')
      return makeDetail(id, true)
    })
    const { controller, initialResult } = createHarness(findTaskById)

    const pending = controller.handleTaskEvent({ payload: { eventType: 'upsert', taskIds: ['task-1', 'task-2'] } })
    await vi.advanceTimersByTimeAsync(50)
    await pending

    expect(initialResult.unassignedTasks.map((task) => task.id)).toEqual(['task-1'])
    expect(initialResult.rows[0].assignedTasks.map((task) => task.id)).toEqual(['task-2'])
  })

  it('removes a task only for an explicit not-found response', async () => {
    vi.useFakeTimers()
    const notFound = Object.assign(new Error('not found'), { response: { status: 404 } })
    const findTaskById = vi.fn(async () => { throw notFound })
    const { controller, initialResult, gantt } = createHarness(findTaskById)

    const pending = controller.handleTaskEvent({ payload: { eventType: 'upsert', taskIds: ['task-1'] } })
    await vi.advanceTimersByTimeAsync(50)
    await pending

    expect(initialResult.unassignedTasks.map((task) => task.id)).toEqual(['task-2'])
    expect(gantt.updateUnassignedTasks).toHaveBeenCalledWith(
      expect.objectContaining({ affectedIds: ['task-1'] })
    )
  })

  it('fetches an id again when another event arrives while its request is in flight', async () => {
    vi.useFakeTimers()
    const resolvers = []
    const findTaskById = vi.fn(() => new Promise((resolve) => resolvers.push(resolve)))
    const { controller } = createHarness(findTaskById)

    const first = controller.handleTaskEvent({ payload: { eventType: 'upsert', taskIds: ['task-1'] } })
    await vi.advanceTimersByTimeAsync(50)
    expect(findTaskById).toHaveBeenCalledTimes(1)

    const second = controller.handleTaskEvent({ payload: { eventType: 'upsert', taskIds: ['task-1'] } })
    await vi.advanceTimersByTimeAsync(50)
    resolvers[0](makeDetail('task-1', true))
    await vi.waitFor(() => expect(findTaskById).toHaveBeenCalledTimes(2))
    resolvers[1](makeDetail('task-1', true))
    await Promise.all([first, second])

    expect(findTaskById).toHaveBeenCalledTimes(2)
  })
})
