import { BaseStateMachine } from './BaseStateMachine'

type AnyMachine = BaseStateMachine<string, string, object>

export default class InteractionManager {
  private machines = new Map<string, AnyMachine>()

  register(
    name: string,
    machine: AnyMachine
  ): AnyMachine {
    this.machines.set(name, machine)
    return machine
  }

  get(name: string): AnyMachine | undefined {
    return this.machines.get(name)
  }

  unregister(name: string): void {
    const machine = this.machines.get(name)
    if (machine) {
      machine.destroy()
    }
    this.machines.delete(name)
  }

  resetAll(): void {
    this.machines.forEach((machine) => machine.reset())
  }

  destroy(): void {
    this.machines.forEach((machine) => machine.destroy())
    this.machines.clear()
  }
}
