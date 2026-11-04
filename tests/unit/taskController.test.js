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
    dispatchAction: vi.fn(),
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
  it('preserves notification and lock state on fetched task updates, including notifyStatus zero', async () => {
    vi.useFakeTimers()
    let notifyStatus = 2
    const { controller } = createHarness(vi.fn(async (id) => ({
      ...makeDetail(id, true), taskStatus: 3, notifyStatus, locked: true,
    })))
    for (const value of [2, 0]) {
      notifyStatus = value
      const pending = controller.handleTaskEvent({ payload: { taskIds: ['task-1'] } })
      await vi.advanceTimersByTimeAsync(50)
      await pending
      const task = controller.getAssignedTasks()[0]
      expect(task[5]).toBe(3)
      expect(task[17]).toBe(true)
      expect(task[19]).toBe(value)
    }
  })

  it('searches without changing the snapshot and restores tasks when cleared', () => {
    const { controller, initialResult, gantt } = createHarness(vi.fn())
    expect(controller.search({ keyword: ' task 1 ', condition: '任务名' })).toEqual({ count: 1 })
    expect(controller.getUnassignedTasks().map((task) => task.id)).toEqual(['task-1'])
    expect(initialResult.unassignedTasks).toHaveLength(2)
    expect(controller.search({ keyword: '', condition: '任务名' })).toEqual({ count: 2 })
    expect(gantt.dispatchAction).toHaveBeenLastCalledWith(expect.objectContaining({ type: 'updateTaskData' }))
  })

  it('keeps resource search active when a WS assignment arrives and composes with resource filtering', async () => {
    vi.useFakeTimers()
    const { controller, gantt } = createHarness(vi.fn(async (id) => makeDetail(id, true)))
    controller.search({ keyword: 'resource 1', condition: '资源名' })
    expect(controller.getUnassignedTasks()).toHaveLength(0)
    const pending = controller.handleTaskEvent({ payload: { taskIds: ['task-1'] } })
    await vi.advanceTimersByTimeAsync(50)
    await pending
    expect(controller.getAssignedTasks().map((task) => task[0])).toEqual(['task-1'])
    expect(gantt.dispatchAction).toHaveBeenCalledTimes(1)
    controller.setVisibleResources([])
    expect(controller.getAssignedTasks()).toHaveLength(0)
    controller.setVisibleResources([['Resource 1', 'resource-1']])
    expect(controller.getAssignedTasks()).toHaveLength(1)
  })

  it('removes a task from search results when its WS detail no longer matches', async () => {
    vi.useFakeTimers()
    const { controller, initialResult } = createHarness(vi.fn(async (id) => ({ ...makeDetail(id), taskName: 'Renamed' })))
    controller.search({ keyword: 'Task 1', condition: '任务名' })
    const pending = controller.handleTaskEvent({ payload: { taskIds: ['task-1'] } })
    await vi.advanceTimersByTimeAsync(50)
    await pending
    expect(controller.getUnassignedTasks()).toHaveLength(0)
    expect(initialResult.unassignedTasks).toHaveLength(2)
    expect(controller.search({ keyword: '', condition: '任务名' }).count).toBe(2)
  })

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
