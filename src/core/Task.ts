import { isArray } from 'zrender/src/core/util'
import SeriesData from '../data/SeriesData'
import { Payload } from '../util/types'
import { Pipeline } from './Scheduler'

export interface TaskContext {
  outputData?: SeriesData
  data?: SeriesData
  payload?: Payload
}

export type TaskResetCallback<Ctx extends TaskContext> = (
  this: Task<Ctx>,
  context: Ctx
) => TaskResetCallbackReturn<Ctx>

export type TaskResetCallbackReturn<Ctx extends TaskContext> =
  | void
  | (TaskProgressCallback<Ctx> | TaskProgressCallback<Ctx>[])
  | {
      forceFirstProgress?: boolean
      progress: TaskProgressCallback<Ctx> | TaskProgressCallback<Ctx>[]
    }

export type TaskProgressCallback<Ctx extends TaskContext> = (
  this: Task<Ctx>,
  params: TaskProgressParams,
  context: Ctx
) => void
export type TaskProgressParams = {
  start: number
  end: number
  count: number
  next?: TaskDataIteratorNext
}

export type TaskPlanCallback<Ctx extends TaskContext> = (
  this: Task<Ctx>,
  context: Ctx
) => TaskPlanCallbackReturn

export type TaskPlanCallbackReturn = 'reset' | false | null | undefined

export type TaskCountCallback<Ctx extends TaskContext> = (
  this: Task<Ctx>,
  context: Ctx
) => number

export type TaskOnDirtyCallback<Ctx extends TaskContext> = (
  this: Task<Ctx>,
  context: Ctx
) => void

type TaskDataIteratorNext = () => number

type TaskDataIterator = {
  reset: (s: number, e: number, sStep: number, sCount: number) => void
  next?: TaskDataIteratorNext
}

type TaskDefineParam<Ctx extends TaskContext> = {
  reset?: TaskResetCallback<Ctx>
  // Returns 'reset' indicate reset immediately
  plan?: TaskPlanCallback<Ctx>
  // count is used to determine data task.
  count?: TaskCountCallback<Ctx>
  onDirty?: TaskOnDirtyCallback<Ctx>
}

export type PerformArgs = {
  step?: number
  skip?: boolean
  modBy?: number
  modDataCount?: number
}

export function createTask<Ctx extends TaskContext>(
  define: TaskDefineParam<Ctx>
): Task<Ctx> {
  return new Task<Ctx>(define)
}

export class Task<Ctx extends TaskContext> {
  private _reset: TaskResetCallback<Ctx>
  private _plan: TaskPlanCallback<Ctx>
  private _count: TaskCountCallback<Ctx>
  private _onDirty: TaskOnDirtyCallback<Ctx>
  private _callingProgress: TaskProgressCallback<Ctx>

  private _progress: TaskProgressCallback<Ctx> | TaskProgressCallback<Ctx>[]
  private _dirty: boolean
  private _disposed: boolean
  private _upstream: Task<Ctx>
  private _downstream: Task<Ctx>
  private _outputDueEnd: number
  private _settedOutputEnd: number
  private _modBy: number
  private _modDataCount: number
  private _dueIndex: number
  private _dueEnd: number

  __pipeline: Pipeline //记录自己是在哪个处理管道中
  __idxInPipeline: number //所在处理管道id
  __block: boolean //是否被阻塞

  context: Ctx

  constructor(define: TaskDefineParam<Ctx> = {}) {
    this._reset = define.reset
    this._plan = define.plan
    this._count = define.count
    this._onDirty = define.onDirty

    this._dirty = true
  }

  perform(performArgs?: PerformArgs): boolean {
    const upTask = this._upstream
    const skip = performArgs?.skip
    if (this._dirty && upTask) {
      const context = this.context
      context.data = context.outputData = upTask.context.outputData
    }
    if (this.__pipeline) {
      this.__pipeline.currentTask = this
    }

    let planResult
    if (this._plan && !skip) {
      planResult = this._plan(this.context)
    }
    const lastModBy = normalizeModBy(this._modBy)
    const lastModDataCount = this._modDataCount || 0
    const modBy = normalizeModBy(performArgs?.modBy)
    const modDataCount = performArgs?.modDataCount || 0
    if (lastModBy !== modBy || lastModDataCount !== modDataCount) {
      planResult = 'reset'
    }

    function normalizeModBy(val: number) {
      !(val >= 1) && (val = 1) // jshint ignore:line
      return val
    }

    let forceFirstProgress
    if (this._dirty || planResult === 'reset') {
      this._dirty = false
      forceFirstProgress = this._doReset(skip)
    }

    this._modBy = modBy
    this._modDataCount = modDataCount
    const step = performArgs?.step
    if (upTask) {
      this._dueEnd = upTask._outputDueEnd
    } else {
      this._dueEnd = this._count ? this._count(this.context) : Infinity
    }

    if (this._progress) {
      const start = this._dueIndex
      const end = Math.min(
        step != null ? this._dueIndex + step : Infinity,
        this._dueEnd
      )

      if (!skip && (forceFirstProgress || start < end)) {
        const progress = this._progress
        if (isArray(progress)) {
          for (let i = 0; i < progress.length; i++) {
            this._doProgress(progress[i], start, end, modBy, modDataCount)
          }
        } else {
          this._doProgress(progress, start, end, modBy, modDataCount)
        }
      }
      this._dueIndex = end
      const outputDueEnd =
        this._settedOutputEnd != null ? this._settedOutputEnd : end
      this._outputDueEnd = outputDueEnd
    } else {
      this._dueIndex = this._outputDueEnd =
        this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd
    }
    return this.unfinished()
  }

  dirty(): void {
    this._dirty = true
    this._onDirty && this._onDirty(this.context)
  }

  private _doProgress(
    progress: TaskProgressCallback<Ctx>,
    start: number,
    end: number,
    modBy: number,
    modDataCount: number
  ): void {
    iterator.reset(start, end, modBy, modDataCount)
    this._callingProgress = progress
    this._callingProgress(
      {
        start: start,
        end: end,
        count: end - start,
        next: iterator.next,
      },
      this.context
    )
  }

  private _doReset(skip: boolean): boolean {
    this._dueIndex = this._outputDueEnd = this._dueEnd = 0
    this._settedOutputEnd = null

    let progress: TaskResetCallbackReturn<Ctx>
    let forceFirstProgress: boolean
    if (!skip && this._reset) {
      progress = this._reset(this.context)
      if (progress && (progress as any).progress) {
        forceFirstProgress = (progress as any).forceFirstProgress
        progress = (progress as any).progress
      }
      if (isArray(progress) && !progress.length) {
        progress = null
      }
    }
    this._progress = progress as TaskProgressCallback<Ctx>
    this._modBy = this._modDataCount = null

    const downstream = this._downstream
    downstream && downstream.dirty()
    return forceFirstProgress
  }

  unfinished(): boolean {
    return this._progress && this._dueIndex < this._dueEnd
  }

  pipe(downTask: Task<Ctx>): void {
    if (this._downstream !== downTask || this._dirty) {
      this._downstream = downTask
      downTask._upstream = this
      downTask.dirty()
    }
  }

  dispose(): void {
    if (this._disposed) {
      return
    }

    this._upstream && (this._upstream._downstream = null)
    this._downstream && (this._downstream._upstream = null)

    this._dirty = false
    this._disposed = true
  }

  getUpstream(): Task<Ctx> {
    return this._upstream
  }

  getDownstream(): Task<Ctx> {
    return this._downstream
  }

  setOutputEnd(end: number): void {
    this._outputDueEnd = this._settedOutputEnd = end
  }
}

const iterator: TaskDataIterator = (function () {
  let end: number
  let current: number
  let modBy: number
  let modDataCount: number
  let winCount: number

  const it: TaskDataIterator = {
    reset: function (
      s: number,
      e: number,
      sStep: number,
      sCount: number
    ): void {
      current = s
      end = e

      modBy = sStep
      modDataCount = sCount
      winCount = Math.ceil(modDataCount / modBy)

      it.next = modBy > 1 && modDataCount > 0 ? modNext : sequentialNext
    },
  }

  return it

  function sequentialNext(): number {
    return current < end ? current++ : null
  }

  function modNext(): number {
    const dataIndex =
      (current % winCount) * modBy + Math.ceil(current / winCount)
    const result =
      current >= end
        ? null
        : dataIndex < modDataCount
        ? dataIndex
        : // If modDataCount is smaller than data.count() (consider `appendData` case),
          // Use normal linear rendering mode.
          current
    current++
    return result
  }
})()
