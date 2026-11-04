import { describe, expect, it } from 'vitest'
import { assignOverlapLanes, buildAssignedTasks, buildLoadSegments, buildResources, buildResourcesWithLoad } from '../../src/config/taskTransform.js'

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

  it('appends task-card display fields without changing the lane contract', () => {
    const rows = [{ resourceId: '7', assignedTasks: [{
      id: 'flight-task',
      name: '登机口保障',
      startTime: '2026-01-01T10:00:00Z',
      endTime: '2026-01-01T11:00:00Z',
      status: 3,
      flightVo: { flightNum: 'CA1234', aircraftIata: 'A320' },
      outBoundStandName: 'A12',
      locked: true,
    }] }]
    const task = buildAssignedTasks(rows, [['Gate A', '7']])[0]
    expect(task.slice(0, 14)).toEqual([
      'flight-task', 0,
      new Date('2026-01-01T10:00:00Z').getTime(),
      new Date('2026-01-01T11:00:00Z').getTime(),
      '登机口保障', 3, undefined, false, 0, 1,
      undefined, undefined, undefined, undefined,
    ])
    expect(task.slice(14)).toEqual(['CA1234', 'A320', 'A12', true, false, null])
  })

  it('uses direct display fields before flight fallbacks', () => {
    const rows = [{ resourceId: '7', assignedTasks: [{
      id: 'manual-task', name: '清洁',
      startTime: '2026-01-01T10:00:00Z', endTime: '2026-01-01T11:00:00Z',
      flightNumber: 'MU5678', flightNum: 'FALLBACK',
      aircraft: 'B738', fleetType: 'A320',
      location: '远机位 3', outBoundStandName: 'A12',
      lockState: 'unlocked',
    }] }]
    expect(buildAssignedTasks(rows, [['Gate A', '7']])[0].slice(14))
      .toEqual(['MU5678', 'B738', '远机位 3', false, true, null])
  })

  it('preserves notifyStatus zero and taskStatus without shifting existing fields', () => {
    const rows = [{ resourceId: '7', assignedTasks: [{
      id: 'notify-task', name: '进港', taskStatus: 2, status: 1, notifyStatus: 0, locked: true,
      startTime: '2026-01-01T10:00:00Z', endTime: '2026-01-01T11:00:00Z',
    }] }]
    const task = buildAssignedTasks(rows, [['Gate A', '7']])[0]
    expect(task[5]).toBe(2)
    expect(task[17]).toBe(true)
    expect(task[19]).toBe(0)
  })

  it('builds shift bands and congestion segments from a resource snapshot', () => {
    const row = {
      availability: [{ shiftDailyId: 'shift-1', startTime: '2026-01-01T08:00:00Z', endTime: '2026-01-01T16:00:00Z', status: 1 }],
      assignedTasks: [
        { startTime: '2026-01-01T09:00:00Z', endTime: '2026-01-01T11:00:00Z' },
        { startTime: '2026-01-01T10:00:00Z', endTime: '2026-01-01T12:00:00Z' },
      ],
    }
    const resource = buildResourcesWithLoad([{ resourceId: 'r1', availability: row.availability, assignedTasks: row.assignedTasks }])[0]
    expect(resource[4]).not.toHaveProperty('shifts')
    const timeline = resource[4]
    expect(buildLoadSegments(row.assignedTasks).map((segment) => segment[2])).toEqual([1, 2, 1])
  })
})
