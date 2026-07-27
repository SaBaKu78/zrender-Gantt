import { BaseStateMachine } from './BaseStateMachine'

export type AssignmentState =
  | 'idle'
  | 'selected'
  | 'previewing'
  | 'confirming'
  | 'submitting'
  | 'waiting_ws'
  | 'refreshing'
  | 'error'

export type AssignmentEvent =
  | 'SELECT_TASK'
  | 'CANCEL_SELECTION'
  | 'ENTER_GRID'
  | 'LEAVE_GRID'
  | 'MOVE_HOVER'
  | 'CLICK_GRID'
  | 'CONFIRM'
  | 'CANCEL_CONFIRM'
  | 'SUBMIT_OK'
  | 'SUBMIT_FAIL'
  | 'WS_UPDATE'
  | 'WS_TIMEOUT'
  | 'REFRESH_OK'
  | 'REFRESH_FAIL'
  | 'ESC'

export interface AssignmentContext {
  taskId?: string | number
  taskData?: any
  hoverResourceId?: string | number
  hoverResourceIndex?: number
  hoverY?: number
  requestId?: string
  error?: Error | string
}

const initialContext: AssignmentContext = {}

export default class AssignmentStateMachine extends BaseStateMachine<
  AssignmentState,
  AssignmentEvent,
  AssignmentContext
> {
  constructor() {
    super({
      initialState: 'idle',
      initialContext,
      transitions: {
        idle: {
          SELECT_TASK: 'selected',
        },
        selected: {
          SELECT_TASK: (ctx) => (ctx.taskId ? 'selected' : 'idle'),
          ENTER_GRID: 'previewing',
          CANCEL_SELECTION: 'idle',
          ESC: 'idle',
        },
        previewing: {
          MOVE_HOVER: 'previewing',
          LEAVE_GRID: 'selected',
          CLICK_GRID: 'confirming',
          SELECT_TASK: (ctx) => (ctx.taskId ? 'selected' : 'idle'),
          CANCEL_SELECTION: 'idle',
          ESC: 'idle',
        },
        confirming: {
          CONFIRM: 'submitting',
          CANCEL_CONFIRM: 'previewing',
          CANCEL_SELECTION: 'idle',
          ESC: 'idle',
        },
        submitting: {
          SUBMIT_OK: 'waiting_ws',
          SUBMIT_FAIL: 'error',
        },
        waiting_ws: {
          WS_UPDATE: 'refreshing',
          WS_TIMEOUT: 'error',
          CANCEL_SELECTION: 'idle',
        },
        refreshing: {
          REFRESH_OK: 'idle',
          REFRESH_FAIL: 'error',
        },
        error: {
          SELECT_TASK: 'selected',
          CANCEL_SELECTION: 'idle',
          ESC: 'idle',
        },
      },
      guards: {
        SELECT_TASK: (ctx) => !!ctx.taskId,
        ENTER_GRID: (ctx) => !!ctx.taskId,
        MOVE_HOVER: (ctx) => !!ctx.taskId,
        CLICK_GRID: (ctx) => !!ctx.taskId && ctx.hoverResourceIndex != null,
        CONFIRM: (ctx) => !!ctx.taskId && ctx.hoverResourceIndex != null,
        SUBMIT_OK: (ctx) => !!ctx.taskId,
        WS_UPDATE: (ctx) => !!ctx.taskId,
      },
    })
  }

  selectTask(taskData: any): boolean {
    const taskId = taskData?.id ?? taskData?.taskId
    const current = this.getContext()

    if (this.getState() !== 'idle' && current.taskId === taskId) {
      this.reset()
      return true
    }

    if (this.getState() !== 'idle') {
      this.reset()
    }

    return this.transition('SELECT_TASK', {
      taskId,
      taskData,
      hoverResourceId: undefined,
      hoverResourceIndex: undefined,
      hoverY: undefined,
      requestId: undefined,
      error: undefined,
    })
  }

  enterGrid(): boolean {
    return this.transition('ENTER_GRID')
  }

  leaveGrid(): boolean {
    return this.transition('LEAVE_GRID', {
      hoverResourceId: undefined,
      hoverResourceIndex: undefined,
      hoverY: undefined,
    })
  }

  moveHover(payload: Pick<AssignmentContext, 'hoverResourceId' | 'hoverResourceIndex' | 'hoverY'>): boolean {
    return this.transition('MOVE_HOVER', payload)
  }

  clickGrid(): boolean {
    return this.transition('CLICK_GRID')
  }

  confirm(requestId?: string): boolean {
    return this.transition('CONFIRM', { requestId })
  }

  cancelConfirm(): boolean {
    return this.transition('CANCEL_CONFIRM')
  }

  submitOk(requestId?: string): boolean {
    return this.transition('SUBMIT_OK', { requestId, error: undefined })
  }

  fail(event: 'SUBMIT_FAIL' | 'WS_TIMEOUT' | 'REFRESH_FAIL', error: Error | string): boolean {
    return this.transition(event, { error })
  }

  wsUpdate(): boolean {
    return this.transition('WS_UPDATE')
  }

  refreshOk(): boolean {
    this.reset()
    return true
  }

  cancel(): boolean {
    this.reset()
    return true
  }

  esc(): boolean {
    this.reset()
    return true
  }
}
