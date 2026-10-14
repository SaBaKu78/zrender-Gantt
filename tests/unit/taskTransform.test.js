import { describe, expect, it } from 'vitest'
import { assignOverlapLanes, buildAssignedTasks, buildResources } from '../../src/config/taskTransform.js'

describe('taskTransform', () => {
  it('builds stable resources from rows', () => {
    expect(buildResources([{ resourceId: '2', resourceName: 'B', displayOrder: 2 }, { resourceId: '1', resourceName: 'A', displayOrder: 1 }]))
      .toEqual([['A', '1', '', ''], ['B', '2', '', '']])
  })

  it('assigns lanes and maps the unified task DTO', () => {
    const rows = [{ resourceId: '7', assignedTasks: [
      { id: 'first', name: 'A', startTime: '2026-01-01T10:00:00Z', endTime: '2026-01-01T11:00:00Z', status: 1, color: '#f00', outsideShift: false },
      { id: 'second', name: 'B', startTime: '2026-01-01T10:30:00Z', endTime: '2026-01-01T11:30:00Z', status: 2, color: null, outsideShift: true },
    ] }]
    const result = buildAssignedTasks(rows, [['Gate A', '7']], 2)
    expect(result).toHaveLength(2)
    expect(result[0][1]).toBe(2)
    expect(result.map((task) => task[8])).toEqual([0, 1])
    expect(result[1][7]).toBe(true)
  })

  it('keeps the minimum lane algorithm contract', () => {
    const tasks = [['first', 0, 0, 10], ['second', 0, 5, 15], ['third', 0, 10, 20]]
    assignOverlapLanes(tasks)
    expect(tasks.map((task) => task[8])).toEqual([0, 1, 0])
    expect(tasks.every((task) => task[9] === 2)).toBe(true)
  })

  it('preserves the backend task status for display mapping', () => {
    const rows = [{ resourceId: '7', assignedTasks: [{ id: 'completed', name: '出港', startTime: '2026-01-01T10:00:00Z', endTime: '2026-01-01T11:00:00Z', status: 4, color: null, outsideShift: false }] }]
    expect(buildAssignedTasks(rows, [['Gate A', '7']])[0][5]).toBe(4)
  })
})
