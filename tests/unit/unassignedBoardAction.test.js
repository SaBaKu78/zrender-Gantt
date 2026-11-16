import { describe, expect, it, vi } from 'vitest'
import installUnassignedBoardAction from '../../src/component/unassignedBoard/unassignedBoardAction.ts'

vi.hoisted(() => {
  vi.stubGlobal('navigator', undefined)
  vi.stubGlobal('window', { devicePixelRatio: 1 })
})

const createActionHarness = () => {
  const actions = {}
  const series = {
    assignedTasks: { id: 'assignedTasks', updateData: vi.fn() },
    resourceRows: { id: 'resourceRows', updateData: vi.fn() },
    resourceSchedule: { id: 'resourceSchedule', updateData: vi.fn() },
  }
  const model = {
    eachSeries: (visitor) => Object.values(series).forEach(visitor),
    eachComponent: vi.fn(),
  }

  installUnassignedBoardAction({
    registerAction: (info, handler) => { actions[info.type] = handler },
  })

  return { actions, model, series }
}

describe('task update actions preserve series-specific data', () => {
  it('updates resource rows without overwriting the resource schedule', () => {
    const { actions, model, series } = createActionHarness()
    const resourceRows = [[0, 'A', 'r1', 'R1', 'ON', { load: [], availability: [] }, 0]]

    actions.updateTaskData({ resourceData: resourceRows }, model, {})

    expect(series.resourceRows.updateData).toHaveBeenCalledWith(resourceRows, model)
    expect(series.resourceSchedule.updateData).not.toHaveBeenCalled()
    expect(series.assignedTasks.updateData).not.toHaveBeenCalled()
  })

  it('passes flattened availability to the resource schedule during filtering', () => {
    const { actions, model, series } = createActionHarness()
    const resourceRows = [[0, 'A', 'r1', 'R1', 'ON', { load: [], availability: [] }, 0]]
    const resourceSchedule = [['0:shift-1', 0, 100, 200, 1]]

    actions.updateResourceFilter({
      resourceData: resourceRows,
      resourceScheduleData: resourceSchedule,
    }, model, {})

    expect(series.resourceRows.updateData).toHaveBeenCalledWith(resourceRows, model)
    expect(series.resourceSchedule.updateData).toHaveBeenCalledWith(resourceSchedule, model)
    expect(series.assignedTasks.updateData).not.toHaveBeenCalled()
  })
})
