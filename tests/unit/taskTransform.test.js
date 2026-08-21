import { describe, expect, it } from 'vitest'
import {
  assignOverlapLanes,
  buildAssignedTasks,
  buildUnassignedTasks,
  createResourceIndexMaps,
} from '../../src/config/taskTransform.js'

describe('taskTransform', () => {
  it('maps resource ids and string resource ids to indexes', () => {
    const maps = createResourceIndexMaps([
      ['A', 101],
      ['B', '102'],
    ])

    expect(maps.byId.get(101)).toBe(0)
    expect(maps.byStringId.get('101')).toBe(0)
    expect(maps.byId.get('102')).toBe(1)
  })

  it('assigns the minimum number of lanes to overlapping tasks', () => {
    const tasks = [
      ['first', 0, 0, 10],
      ['second', 0, 5, 15],
      ['third', 0, 10, 20],
    ]

    assignOverlapLanes(tasks)

    expect(tasks.map((task) => task[8])).toEqual([0, 1, 0])
    expect(tasks.every((task) => task[9] === 2)).toBe(true)
  })

  it('filters invalid assigned tasks and applies resource row offset', () => {
    const maps = createResourceIndexMaps([['Gate A', 7]])
    const rows = buildAssignedTasks([
      {
        id: 'valid',
        scheduleStartTime: '2026-01-01T10:00:00Z',
        scheduleEndTime: '2026-01-01T11:00:00Z',
        taskTime: '2026-01-01T10:00:00Z',
        taskAssignList: [{ currentResourceId: '7' }],
        taskName: 'Turnaround',
      },
      { id: 'invalid', taskAssignList: [{ currentResourceId: 7 }] },
    ], maps, 2)

    expect(rows).toHaveLength(1)
    expect(rows[0][0]).toBe('valid')
    expect(rows[0][1]).toBe(2)
  })

  it('returns explicitly unassigned tasks', () => {
    const tasks = buildUnassignedTasks([
      { id: 'u1', taskName: '待分配', taskAssignList: [] },
      { id: 'assigned', taskAssignList: [{ currentResourceId: 1 }] },
    ])

    expect(tasks).toHaveLength(1)
    expect(tasks[0]).toMatchObject({ id: 'u1', name: '待分配' })
  })
})
