import { describe, expect, it } from 'vitest'
import AssignmentStateMachine from '../../src/interaction/AssignmentStateMachine'

describe('AssignmentStateMachine interaction guard', () => {
  it('does not allow a resource click before a task is double-clicked', () => {
    const machine = new AssignmentStateMachine()

    expect(machine.getState()).toBe('idle')
    expect(machine.clickGrid()).toBe(false)
    expect(machine.getContext().taskId).toBeUndefined()
  })

  it('clears the selected task when the assignment interaction is reset', () => {
    const machine = new AssignmentStateMachine()
    machine.selectTask({ id: 'task-1', name: 'Task 1' })
    expect(machine.getState()).toBe('selected')
    expect(machine.getContext().taskId).toBe('task-1')

    machine.refreshOk()

    expect(machine.getState()).toBe('idle')
    expect(machine.getContext().taskId).toBeUndefined()
  })
})
