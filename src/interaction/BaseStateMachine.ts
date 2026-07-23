export type StateHandler<S, C> = (context: C, prevState: S, nextState: S) => void
export type TransitionResolver<S, C> = S | ((ctx: C) => S)
export type TransitionMap<S extends string, E extends string, C> = Partial<
  Record<S, Partial<Record<E, TransitionResolver<S, C>>>>
>
export type GuardMap<E extends string, C> = Partial<Record<E, (ctx: C) => boolean>>
export type StateMachineEventName =
  | 'statechange'
  | 'enter'
  | 'exit'
  | 'reset'
  | 'blocked'
  | 'contextchange'

export interface StateMachineConfig<
  S extends string,
  E extends string,
  C extends object
> {
  initialState: S
  initialContext: C
  transitions: TransitionMap<S, E, C>
  guards?: GuardMap<E, C>
}

export abstract class BaseStateMachine<
  S extends string,
  E extends string,
  C extends object
> {
  protected state: S
  protected context: C

  protected readonly initialState: S
  protected readonly initialContext: C
  protected readonly transitions: TransitionMap<S, E, C>
  protected readonly guards: GuardMap<E, C>

  private listeners: Map<StateMachineEventName, Set<StateHandler<S, C>>> =
    new Map<StateMachineEventName, Set<StateHandler<S, C>>>()

  constructor(config: StateMachineConfig<S, E, C>) {
    this.initialState = config.initialState
    this.initialContext = { ...config.initialContext }
    this.state = config.initialState
    this.context = { ...config.initialContext }
    this.transitions = config.transitions
    this.guards = config.guards || {}
  }

  getState(): S {
    return this.state
  }

  getContext(): C {
    return { ...this.context }
  }

  setContext(patch: Partial<C>): void {
    const prevState = this.state
    this.context = {
      ...this.context,
      ...patch,
    }
    this.emit('contextchange', prevState, this.state)
  }

  can(event: E, payload?: Partial<C>): boolean {
    const nextContext = payload
      ? {
          ...this.context,
          ...payload,
        }
      : this.context
    const guard = this.guards[event]
    const transition = this.transitions[this.state]?.[event]

    return !!transition && (!guard || guard(nextContext))
  }

  transition(event: E, payload?: Partial<C>): boolean {
    if (!this.can(event, payload)) {
      this.emit('blocked', this.state, this.state)
      return false
    }

    const prevState = this.state
    const nextContext = payload
      ? {
          ...this.context,
          ...payload,
        }
      : this.context
    const resolver = this.transitions[prevState]?.[event] as
      | TransitionResolver<S, C>
      | undefined
    const nextState = this._resolveTransition(resolver, nextContext)

    if (nextState == null) {
      this.emit('blocked', prevState, prevState)
      return false
    }

    this.context = nextContext

    if (nextState !== prevState) {
      this.emit('exit', prevState, nextState)
      this.state = nextState
      this.emit('enter', prevState, nextState)
    }

    this.emit('statechange', prevState, this.state)
    return true
  }

  reset(context?: Partial<C>): void {
    const prevState = this.state
    this.state = this.initialState
    this.context = {
      ...this.initialContext,
      ...(context || {}),
    }
    this.emit('reset', prevState, this.state)
    this.emit('statechange', prevState, this.state)
  }

  on(eventName: StateMachineEventName, handler: StateHandler<S, C>): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set<StateHandler<S, C>>())
    }
    this.listeners.get(eventName)!.add(handler)
  }

  off(eventName: StateMachineEventName, handler: StateHandler<S, C>): void {
    this.listeners.get(eventName)?.delete(handler)
  }

  destroy(): void {
    this.listeners.clear()
  }

  protected emit(eventName: StateMachineEventName, prevState: S, nextState: S): void {
    this.listeners.get(eventName)?.forEach((handler) => {
      handler(this.getContext(), prevState, nextState)
    })
  }

  private _resolveTransition(
    resolver: TransitionResolver<S, C> | undefined,
    context: C
  ): S | undefined {
    if (resolver == null) {
      return undefined
    }

    return typeof resolver === 'function' ? resolver(context) : resolver
  }
}
