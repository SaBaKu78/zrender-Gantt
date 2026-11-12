import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import ExtensionAPI from '../../core/ExtensionAPI'
import { Group, Line, Rect, Text } from 'zrender'
import ComponentModel from '../../model/Component'
import { Payload } from '../../util/types'
import { parseRatio } from '../split/SliderSplitView'
import * as eventTool from 'zrender/src/core/event'
import AssignmentStateMachine from '../../interaction/AssignmentStateMachine'
import type { Tween } from '@tweenjs/tween.js'
import { showToast } from '../../util/toast'

const BOARD_ZLEVEL = 999

export interface TaskData {
  id: number | string
  taskId?: number | string
  name?: string
  assignee?: number | null
  startTime?: string | number
  endTime?: string | number
  taskDate?: string | number
  scheduleStartTime?: string | number
  scheduleEndTime?: string | number
  taskName?: string
  flightStatusText?: string
  standName?: string
  gateName?: string
}

export interface UnassignedBoardOption {
  show?: boolean
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  itemGap?: number
  padding?: number[]
  splitY?: number
  verticalSplitX?: number
  gridWidth?: number
  resources?: Array<[string, string | number]>
  onAssignTask?: (params: {
    resourceId: string | number
    taskId: string | number
  }) => Promise<{ success: boolean }> | { success: boolean }
}

export default class UnassignedBoardView extends ComponentView {
  static type = 'unassignedBoard'
  type = UnassignedBoardView.type

  piModel: GlobalModel
  api: ExtensionAPI

  private _group: Group

  private _splitY: number

  private _backgroundRect: Rect

  private _emptyText: Text

  private _gridExtensionGroup: Group

  private _mainScrollbarGroup: Group

  private _taskViewportGroup: Group

  private _taskContentGroup: Group

  private _taskRows: Array<{ id: string; group: Group | null }> = []

  private _taskRowHeight = 44

  private _taskItemHeight = 36

  private _assignmentGhostGroup: Group

  private _scrollbarGroup: Group

  private _scrollThumb: Rect

  private _mainScrollThumb: Rect

  private _scrollOffset = 0

  private _scrollMax = 0

  private _scrollDragStartY = 0

  private _scrollDragStartOffset = 0

  private _mainScrollDragStartY = 0

  private _mainScrollDragStartStart = 0

  private _assignmentMachine: AssignmentStateMachine

  private _selectedTaskTweens: Map<string | number, Tween> = new Map()

  private _boundKeyDownHandler: ((e: KeyboardEvent) => void) | null = null

  private _boundMouseMoveHandler: ((e: any) => void) | null = null

  private _boundClickHandler: ((e: any) => void) | null = null

  private _assigning = false
  private _statusHost: HTMLDivElement | null = null

  private _mainVerticalDataZoomRafId: number | null = null
  private _pendingMainVerticalDataZoomOffsetY: number | null = null

  private _unassignedBoardVerticalDataZoomRafId: number | null = null
  private _pendingUnassignedBoardScrollOffset: number | null = null

  init(piModel: GlobalModel, api: ExtensionAPI): void {
    this.api = api
    this.piModel = piModel

    if (!this._assignmentMachine) {
      this._assignmentMachine = new AssignmentStateMachine()
      this._assignmentMachine.on('statechange', (_context, prevState, nextState) => {
        this._renderAssignmentStatus()
        if (this.piModel && this.api && prevState !== nextState) {
          this._renderBoard(this._getUnassignedData())
        }
      })
    }

    if (!this._boundKeyDownHandler && typeof window !== 'undefined') {
      this._boundKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !this._assigning) {
          this._assignmentMachine?.esc()
        }
      }
      window.addEventListener('keydown', this._boundKeyDownHandler)
    }

    if (!this._boundMouseMoveHandler) {
      this._boundMouseMoveHandler = (e: any) => this._handleGlobalMouseMove(e)
      api.getZr().on('mousemove', this._boundMouseMoveHandler)
    }

    if (!this._boundClickHandler) {
      this._boundClickHandler = (e: any) => this._handleGlobalClick(e)
      api.getZr().on('click', this._boundClickHandler)
    }
  }

  dispose(): void {
    this._statusHost?.remove()
    this._statusHost = null
    if (this._boundKeyDownHandler) {
      window.removeEventListener('keydown', this._boundKeyDownHandler)
      this._boundKeyDownHandler = null
    }
    if (this._boundMouseMoveHandler) {
      this.api?.getZr().off('mousemove', this._boundMouseMoveHandler)
      this._boundMouseMoveHandler = null
    }
    if (this._boundClickHandler) {
      this.api?.getZr().off('click', this._boundClickHandler)
      this._boundClickHandler = null
    }
    this._clearSelectedTaskTweens()
    this._clearAssignmentGhost()
    this._clearMainVerticalDataZoomRaf()
    this._clearUnassignedBoardVerticalDataZoomRaf()
    this._assignmentMachine?.destroy()
  }

  render(model: ComponentModel, piModel: GlobalModel, api: ExtensionAPI, payload?: Payload): void {
    this.group.removeAll()
    this.piModel = piModel
    this.api = api

    let splitY = (model as any).option?.splitY
    if (splitY == null) {
      splitY = api.getHeight()

      ;(piModel as any).eachComponent('split', function(splitModel: any) {
        if (splitModel.get('orient') === 'horizontal') {
          const ratio = splitModel.get('ratio')
          if (ratio != null) {
            splitY = api.getHeight() * parseRatio(ratio, 'horizontal')
          }
        }
      })
    }
    this._splitY = splitY
    ;(model as any).option.splitY = splitY


    const unassignedData = this._getUnassignedData()
    this._renderBoard(unassignedData)
  }

  updateLayout(model: ComponentModel, api: ExtensionAPI, payload?: any): void {
    if (payload?.type === 'updateUnassignedBoardPosition') {
      const newY = payload.data?.y
      if (newY == null) return

      this._splitY = newY
      this.api = api
      this._updateBoardLayout()
    }
  }

  updateTasks(tasks: TaskData[], affectedIds: string[]): void {
    this._renderAssignmentStatus(tasks.length)
    if (!this._taskContentGroup || !this._taskViewportGroup || !affectedIds?.length) {
      this._renderBoard(tasks)
      return
    }
    if (!tasks.length) {
      this._renderBoard(tasks)
      return
    }

    const affected = new Set(affectedIds.map(String))
    let firstIndex = this._taskRows.findIndex((item) => affected.has(item.id))
    tasks.forEach((task, index) => {
      if (affected.has(String(task.id ?? task.taskId))) {
        firstIndex = firstIndex < 0 ? index : Math.min(firstIndex, index)
      }
    })
    if (firstIndex < 0) return

    for (let index = this._taskRows.length - 1; index >= firstIndex; index--) {
      const row = this._taskRows[index]
      row.group && this._taskContentGroup.remove(row.group)
    }
    this._taskRows.length = firstIndex

    const grid = this._getGrid()
    if (!grid) return
    const rect = grid.getRect()
    const height = Math.max(0, this.api.getHeight() - this._splitY)
    const rowHeight = this._taskRowHeight
    const itemHeight = this._taskItemHeight
    const contentHeight = tasks.length * rowHeight
    this._scrollMax = Math.max(0, contentHeight - height)
    this._scrollOffset = Math.min(this._scrollOffset, this._scrollMax)
    ;(this._taskContentGroup as any).attr({ y: -this._scrollOffset })

    for (let index = firstIndex; index < tasks.length; index++) {
      const task = tasks[index]
      const yOffset = index * rowHeight + (rowHeight - itemHeight) / 2
      const taskGroup = this._renderTaskItem(
        task,
        grid,
        yOffset,
        itemHeight,
        this._isTaskSelected(task)
      )
      if (taskGroup) {
        this._bindTaskEvents(taskGroup, task)
        this._applySelectedTaskEffect(taskGroup, task)
        this._taskContentGroup.add(taskGroup)
      }
      this._taskRows.push({ id: String(task.id ?? task.taskId), group: taskGroup })
    }

    this._taskRecords = tasks
    this._scrollbarGroup && this.group.remove(this._scrollbarGroup)
    this._scrollbarGroup = null
    this._renderVerticalDataZoom(rect, height, contentHeight)
    this.api.getZr().refresh()
  }

  private _taskRecords: TaskData[] = []

  private _updateBoardLayout(): void {
    const splitY = this._splitY
    const width = this.api.getWidth()
    const height = this.api.getHeight() - splitY

    ;(this.group as any).attr({ x: 0, y: splitY })

    if (this._backgroundRect) {
      this._backgroundRect.setShape({
        x: 0,
        y: 0,
        width,
        height,
      })
    }

    if (this._emptyText) {
      this._emptyText.setStyle({
        x: width / 2,
        y: height / 2,
      })
    }

    this._renderGridExtension()
    this._renderUnassignedTasks(this._getUnassignedData())
    this._renderMainVerticalDataZoomMirror()
  }

  private _getUnassignedData(): TaskData[] {
    let data: TaskData[] = []

    ;(this.piModel as any).eachComponent('unassignedBoard', function (boardModel: any) {
      data = boardModel.get('data') || []
    })

    if (data.length) {
      return data
    }

    const option = this.piModel.getOption() as any
    const taskData = option?.task?.data || []
    return taskData.filter((task: TaskData) => !task.assignee)
  }

  private _renderBoard(tasks: TaskData[]): void {
    this._renderAssignmentStatus(tasks.length)
    const group = this.group
    const api = this.api

    this._clearSelectedTaskTweens()
    group.removeAll()

    const padding = [12, 16, 16, 16]

    const x = 0
    const splitY = this._splitY
    const width = api.getWidth()
    const height = api.getHeight() - splitY

    ;(group as any).attr({ z: 0 })
    ;(group as any).attr({ x, y: splitY })

      this._backgroundRect = new Rect({
        shape: {
          x: 0,
          y: 0,
          width: width,
          height: height,
        },
        style: {
          fill: '#F7F8FA',
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 0,
        silent: true,
      })
    group.add(this._backgroundRect)
    this._renderGridExtension()
    this._renderUnassignedTasks(tasks)
    this._renderMainVerticalDataZoomMirror()

    if (tasks.length === 0) {
      this._emptyText = new Text({
          style: {
            text: '暂无未分配任务',
            x: width / 2,
            y: height / 2,
            fontSize: 14,
            fill: '#999',
            align: 'center',
            verticalAlign: 'middle',
          },
          zlevel: BOARD_ZLEVEL,
          z: 0,
          z2: 1,
          silent: true,
        })
      group.add(this._emptyText)
    }
  }

  private _renderUnassignedTasks(tasks: TaskData[]): void {
    this._clearUnassignedBoardVerticalDataZoomRaf()
    if (this._taskViewportGroup) {
      this.group.remove(this._taskViewportGroup)
    }
    if (this._taskContentGroup) {
      this._taskContentGroup = null
    }
    if (this._assignmentGhostGroup) {
      this.group.remove(this._assignmentGhostGroup)
      this._assignmentGhostGroup = null
    }
    if (this._scrollbarGroup) {
      this.group.remove(this._scrollbarGroup)
    }

    this._taskRows = []
    this._taskRecords = tasks.slice()
    if (!tasks.length) return

    const grid = this._getGrid()
    if (!grid) return

    const rect = grid.getRect()
    const height = Math.max(0, this.api.getHeight() - this._splitY)
    const rowHeight = this._getRowHeight()
    const itemGap = 8
    const itemHeight = Math.min(36, Math.max(24, rowHeight - 8))
    this._taskRowHeight = rowHeight
    this._taskItemHeight = itemHeight
    const contentHeight = tasks.length * rowHeight

    this._scrollMax = Math.max(0, contentHeight - height)
    this._scrollOffset = Math.min(this._scrollOffset, this._scrollMax)

    const viewportGroup = (this._taskViewportGroup = new Group())
    ;(viewportGroup as any).attr({
      zlevel: BOARD_ZLEVEL,
      z: 0,
      z2: 3,
      x: 0,
      y: 0,
    })
    viewportGroup.setClipPath(
      new Rect({
        shape: {
          x: rect.x,
          y: 0,
          width: rect.width,
          height,
        },
      })
    )

    const contentGroup = (this._taskContentGroup = new Group())
    ;(contentGroup as any).attr({
      zlevel: BOARD_ZLEVEL,
      z: 0,
      z2: 3,
      x: 0,
      y: -this._scrollOffset,
    })

    tasks.forEach((task: TaskData, index: number) => {
      const yOffset = index * rowHeight + (rowHeight - itemHeight) / 2
      const taskGroup = this._renderTaskItem(
        task,
        grid,
        yOffset,
        itemHeight,
        this._isTaskSelected(task)
      )
      if (taskGroup) {
        this._bindTaskEvents(taskGroup, task)
        this._applySelectedTaskEffect(taskGroup, task)
        contentGroup.add(taskGroup)
      }
      this._taskRows.push({ id: String(task.id ?? task.taskId), group: taskGroup || null })
    })

    viewportGroup.add(contentGroup)
    this.group.add(viewportGroup)
    this._renderVerticalDataZoom(rect, height, contentHeight)
  }

  private _renderVerticalDataZoom(
    rect: { x: number; y: number; width: number; height: number },
    height: number,
    contentHeight: number
  ): void {
    this._clearUnassignedBoardVerticalDataZoomRaf()

    if (contentHeight <= height || height <= 0) return

    const trackWidth = 8
    const trackX = rect.x + rect.width + 6
    const thumbHeight = Math.max(24, (height / contentHeight) * height)
    const thumbY =
      this._scrollMax > 0
        ? (this._scrollOffset / this._scrollMax) * (height - thumbHeight)
        : 0

    const scrollbarGroup = (this._scrollbarGroup = new Group())
    ;(scrollbarGroup as any).attr({ zlevel: BOARD_ZLEVEL, z: 0, z2: 5 })

    scrollbarGroup.add(
      new Rect({
        shape: {
          x: trackX,
          y: 0,
          width: trackWidth,
          height,
          r: 4,
        },
        style: {
          fill: 'rgba(203, 213, 225, 0.35)',
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 0,
        silent: true,
      })
    )

    this._scrollThumb = new Rect({
      shape: {
        x: trackX,
        y: thumbY,
        width: trackWidth,
        height: thumbHeight,
        r: 4,
      },
      style: {
        fill: '#94A3B8',
      },
      zlevel: BOARD_ZLEVEL,
      z: 0,
      z2: 1,
      cursor: 'ns-resize',
      draggable: true,
      ondragstart: (event: any) => {
        this._scrollDragStartY = event.offsetY
        this._scrollDragStartOffset = this._scrollOffset
        eventTool.stop(event.event)
      },
      drift: (_dx: number, _dy: number, event: any) => {
        const deltaY = event.offsetY - this._scrollDragStartY
        const trackMoveHeight = Math.max(1, height - thumbHeight)
        this._pendingUnassignedBoardScrollOffset =
          this._scrollDragStartOffset +
          (deltaY / trackMoveHeight) * this._scrollMax
        eventTool.stop(event.event)

        if (this._unassignedBoardVerticalDataZoomRafId != null) {
          return
        }

        this._unassignedBoardVerticalDataZoomRafId =
          requestAnimationFrame(() => {
            this._unassignedBoardVerticalDataZoomRafId = null
            const nextOffset =
              this._pendingUnassignedBoardScrollOffset
            this._pendingUnassignedBoardScrollOffset = null
            if (nextOffset != null) {
              this._setScrollOffset(nextOffset)
            }
          })
      },
      ondragend: (event: any) => {
        eventTool.stop(event.event)
        this._flushUnassignedBoardVerticalScroll()
      }
    })

    scrollbarGroup.add(this._scrollThumb)
    this.group.add(scrollbarGroup)
  }

  private _flushUnassignedBoardVerticalScroll(): void {
    if (this._unassignedBoardVerticalDataZoomRafId != null) {
      cancelAnimationFrame(this._unassignedBoardVerticalDataZoomRafId)
      this._unassignedBoardVerticalDataZoomRafId = null
    }

    const nextOffset = this._pendingUnassignedBoardScrollOffset
    this._pendingUnassignedBoardScrollOffset = null
    if (nextOffset != null) {
      this._setScrollOffset(nextOffset)
    }
  }

  private _clearUnassignedBoardVerticalDataZoomRaf(): void {
    if (this._unassignedBoardVerticalDataZoomRafId != null) {
      cancelAnimationFrame(this._unassignedBoardVerticalDataZoomRafId)
      this._unassignedBoardVerticalDataZoomRafId = null
    }
    this._pendingUnassignedBoardScrollOffset = null
  }
  private _setScrollOffset(offset: number): void {
    this._scrollOffset = Math.max(0, Math.min(this._scrollMax, offset))

    if (this._taskContentGroup) {
      ;(this._taskContentGroup as any).attr({ y: -this._scrollOffset })
    }

    if (this._scrollThumb) {
      const shape = this._scrollThumb.shape
      const height = Math.max(0, this.api.getHeight() - this._splitY)
      const trackMoveHeight = Math.max(1, height - shape.height)
      this._scrollThumb.setShape({
        y:
          this._scrollMax > 0
            ? (this._scrollOffset / this._scrollMax) * trackMoveHeight
            : 0,
      })
    }
  }

  private _renderTaskItem(
    task: TaskData,
    grid: any,
    y: number,
    height: number,
    selected = false,
    interactive = true
  ): Group | null {
    if (!grid) return null

    const rect = grid.getRect()
    const xAxis = grid.getCartesians()[0]?.getAxis('x')
    if (!xAxis) return null

    const startValue = this._parseTime(task.scheduleStartTime ?? task.startTime)
    const endValue = this._parseTime(task.scheduleEndTime ?? task.endTime)
    if (startValue == null || endValue == null || endValue <= startValue) {
      return null
    }

    const x1 = rect.x + xAxis.dataToCoord(startValue)
    const x2 = rect.x + xAxis.dataToCoord(endValue)
    const x = Math.max(rect.x, Math.min(x1, x2))
    const endX = Math.min(rect.x + rect.width, Math.max(x1, x2))
    const width = endX - x
    if (width <= 0) return null

    const group = new Group()
    ;(group as any).attr({ zlevel: BOARD_ZLEVEL, z: 0, z2: 3 })

    const shape = {
      x: x + 0.5,
      y: y + 0.5,
      width: Math.max(0, width - 1),
      height: Math.max(0, height - 1),
      r: 3,
    }

    group.add(
      new Rect({
        shape,
        style: {
          fill: selected ? '#E8F4FF' : '#EAF4FB',
          stroke: selected ? '#1D7FEA' : '#2F83B8',
          lineWidth: selected ? 2 : 1.25,
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 0,
      })
    )

    const showDetails = width >= 140 && height >= 30
    const topY = y + height * 0.30
    const bottomY = y + height * (showDetails ? 0.73 : 0.5)
    const leftWidth = Math.min(48, Math.max(36, width * 0.2))
    const rightWidth = leftWidth
    const centerX = x + leftWidth
    const centerWidth = Math.max(0, width - leftWidth - rightWidth)

    group.add(
      new Text({
        style: {
          text: showDetails ? this._formatTimeLabel(startValue) : '',
          x: x + leftWidth / 2,
          y: topY,
          fontSize: 10,
          fill: '#64748B',
          align: 'center',
          verticalAlign: 'middle',
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 1,
        silent: true,
      })
    )

    group.add(
      new Text({
        style: {
          text: showDetails ? this._formatTimeLabel(endValue) : '',
          x: x + width - rightWidth / 2,
          y: topY,
          fontSize: 10,
          fill: '#64748B',
          align: 'center',
          verticalAlign: 'middle',
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 1,
        silent: true,
      })
    )

    group.add(
      new Text({
        style: {
          text: showDetails ? this._truncateText(task.flightStatusText || '', centerWidth - 8, 10) : '',
          x: centerX + centerWidth / 2,
          y: topY,
          fontSize: 10,
          fill: '#111827',
          align: 'center',
          verticalAlign: 'middle',
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 1,
        silent: true,
      })
    )

    group.add(
      new Text({
        style: {
          text: this._truncateText(task.taskName || task.name || `Task ${task.id}`, width - 12, 12),
          x: x + width / 2,
          y: bottomY,
          fontSize: 12,
          fill: '#111827',
          align: 'center',
          verticalAlign: 'middle',
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 1,
        silent: true,
      })
    )

    if (interactive) {
      const hitRect = new Rect({
        shape,
        style: {
          fill: 'rgba(0,0,0,0)',
        },
        cursor: 'pointer',
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 20,
        ondblclick: (event: any) => {
          if (!this._assigning) this._assignmentMachine?.selectTask(task)
          eventTool.stop(event.event)
        },
      })
      ;(hitRect as any).__testId = `unassigned-task-${task.id}`
      group.add(hitRect)
    }

    return group
  }

  private _bindTaskEvents(group: Group, task: TaskData): void {
    ;(group as any).cursor = 'pointer'
  }

  private _handleGlobalMouseMove(event: any): void {
    const assignmentState = this._assignmentMachine?.getState()
    const canInteractWithResource = assignmentState === 'selected' || assignmentState === 'previewing'
    if (!canInteractWithResource) {
      this._clearAssignmentGhost()
      return
    }

    const context = this._assignmentMachine?.getContext()
    const task = context?.taskData as TaskData
    if (!task || this._assigning) {
      this._clearAssignmentGhost()
      return
    }

    const hit = this._hitMainResourceRow(event.offsetX, event.offsetY)
    if (!hit) {
      if (this._assignmentMachine.getState() === 'previewing') {
        this._assignmentMachine.leaveGrid()
      }
      this._clearAssignmentGhost()
      return
    }

    if (this._assignmentMachine.getState() === 'selected') {
      this._assignmentMachine.enterGrid()
    }
    this._assignmentMachine.moveHover({
      hoverResourceId: hit.resourceId,
      hoverResourceIndex: hit.resourceIndex,
      hoverY: hit.rowY,
    })
    this._renderAssignmentGhost(task, hit)
  }

  private async _handleGlobalClick(event: any): Promise<void> {
    const assignmentState = this._assignmentMachine?.getState()
    const canSubmitAssignment = assignmentState === 'selected' || assignmentState === 'previewing'
    const context = this._assignmentMachine?.getContext()
    const task = context?.taskData as TaskData
    if (this._assigning) return

    // 资源行点击只有在双击任务进入 selected/previewing 后才允许参与派遣。
    // idle/error/waiting_ws 等状态下直接忽略，避免复用上一次任务上下文。
    if (!canSubmitAssignment) {
      this._clearAssignmentGhost()
      return
    }

    if (!task) {
      const hit = this._hitMainResourceRow(event.offsetX, event.offsetY)
      if (hit) {
        showToast(
          '尚未选中待派遣任务，因此没有发送请求。请先双击下方未分配任务，再点击目标资源行。',
          { title: '未选择派遣任务', duration: 5000 }
        )
      }
      return
    }

    const hit = this._hitMainResourceRow(event.offsetX, event.offsetY)
    if (!hit) {
      const clickedTask = String(event?.target?.__testId || '').startsWith('unassigned-task-')
      if (!clickedTask) {
        showToast(
          '没有命中主甘特区的资源行，因此未发送派遣请求。请点击上方目标资源所在行。',
          { title: '未选择目标资源', duration: 5000 }
        )
      }
      return
    }

    if (this._assignmentMachine.getState() === 'selected') {
      this._assignmentMachine.enterGrid()
    }
    this._assignmentMachine.moveHover({
      hoverResourceId: hit.resourceId,
      hoverResourceIndex: hit.resourceIndex,
      hoverY: hit.rowY,
    })

    if (!this._assignmentMachine.clickGrid()) {
      showToast(
        '当前派遣状态不允许提交，请重新双击未分配任务后再选择目标资源。',
        { title: '派遣未提交', duration: 5000 }
      )
      return
    }
    await this._assignSelectedTask(task, hit)
  }

  private async _assignSelectedTask(
    task: TaskData,
    hit: {
      resourceId: string | number
      resourceIndex: number
      rowY: number
      rowHeight: number
    }
  ): Promise<void> {
    const handler = this._getAssignTaskHandler()
    const taskId = task.id ?? task.taskId
    if (!handler) {
      showToast('派遣处理器未配置，因此无法发送请求。', {
        title: '派遣未提交',
        duration: 5000,
      })
      return
    }
    if (taskId == null) {
      showToast('当前任务缺少任务 ID，因此无法发送请求。请刷新任务列表后重试。', {
        title: '派遣未提交',
        duration: 5000,
      })
      return
    }

    this._assigning = true
    this._assignmentMachine.confirm()

    try {
      const result = await handler({
        resourceId: hit.resourceId,
        taskId,
      })

      // 旧派遣接口参数（保留用于后续问题排查，请勿恢复执行）：
      // {
      //   newResourceId: hit.resourceId,
      //   taskId,
      //   date: this._formatDate(task.taskDate ?? task.scheduleStartTime ?? task.startTime),
      //   force: false,
      // }

      if (result?.success) {
        console.info('派遣成功')
        showToast('任务已成功派遣，等待服务端同步最新任务状态。', {
          type: 'success',
          title: '派遣成功',
          duration: 4000,
        })
        // 先清理交互态，再等待 WS 更新，避免成功后鼠标仍携带旧任务虚影。
        this._clearAssignmentGhost()
        this._clearSelectedTaskTweens()
        this._assignmentMachine.submitOk()
        this._assignmentMachine.wsUpdate()
        this._assignmentMachine.refreshOk()
      } else {
        console.info('派遣失败')
        showToast('服务端未接受此次派遣，请稍后重试。', { title: '派遣失败', type: 'error' })
        this._assignmentMachine.fail('SUBMIT_FAIL', 'assign failed')
      }
    } catch (error) {
      const code = (error as any)?.code
      const preflightMessages: Record<string, { title: string; message: string }> = {
        TASK_NOT_FOUND: {
          title: '任务数据未匹配',
          message: '当前任务不在最新的未分配任务结果中，因此未发送请求。请刷新甘特数据后重试。',
        },
        RESOURCE_NOT_FOUND: {
          title: '资源数据未匹配',
          message: '目标资源不在当前查询结果中，因此未发送请求。请重新选择资源或刷新数据。',
        },
        SHIFT_DAILY_ID_NOT_FOUND: {
          title: '目标资源没有可用班次',
          message: '目标资源在该任务时段内没有匹配的班次，因此未发送请求。请选择在该时段有班次的资源。',
        },
      }
      const preflight = preflightMessages[code]
      if (preflight) {
        showToast(preflight.message, { title: preflight.title, type: 'warning', duration: 6000 })
      } else {
        showToast((error as Error)?.message || '派遣请求处理失败，请稍后重试。', {
          title: '派遣失败',
          type: 'error',
          duration: 6000,
        })
      }
      this._assignmentMachine.fail('SUBMIT_FAIL', error as Error)
    } finally {
      this._assigning = false
      this._renderAssignmentStatus()
    }
  }

  private _hitMainResourceRow(x: number, y: number): {
    resourceId: string | number
    resourceIndex: number
    rowY: number
    rowHeight: number
  } | null {
    const grid = this._getGrid()
    const resources = this._getBoardResources()
    if (!grid || !resources.length) return null

    const rect = grid.getRect()
    if (x < rect.x || x > rect.x + rect.width || y < rect.y || y > this._splitY) {
      return null
    }

    const yAxis = grid.getCartesians()[0]?.getAxis('y')
    if (!yAxis) return null

    const boardModel = this.piModel.getComponent('unassignedBoard') as any
    const resourceRowOffset = boardModel?.get('resourceRowOffset') || 0

    for (let index = 0; index < resources.length; index++) {
      const dataIndex = index + resourceRowOffset
      const start = yAxis.toGlobalCoord(yAxis.dataToCoord(dataIndex))
      const end = yAxis.toGlobalCoord(yAxis.dataToCoord(dataIndex + 1))
      const rowY = Math.min(start, end)
      const rowHeight = Math.abs(end - start)
      const rowBottom = rowY + rowHeight

      if (y >= rowY && y <= rowBottom && rowBottom > rect.y && rowY < this._splitY) {
        return {
          resourceId: resources[index][1],
          resourceIndex: index,
          rowY,
          rowHeight,
        }
      }
    }

    return null
  }

  private _renderAssignmentGhost(
    task: TaskData,
    hit: {
      rowY: number
      rowHeight: number
    }
  ): void {
    this._clearAssignmentGhost()

    const grid = this._getGrid()
    if (!grid) return

    const itemHeight = Math.min(36, Math.max(24, hit.rowHeight - 8))
    const y = hit.rowY - this._splitY + (hit.rowHeight - itemHeight) / 2
    const ghost = this._renderTaskItem(task, grid, y, itemHeight, true, false)
    if (!ghost) return

    ;(ghost as any).silent = true
    ;(ghost as any).attr({ zlevel: BOARD_ZLEVEL, z: 0, z2: 20 })
    this._setGroupOpacity(ghost, 0.48)
    const rect = grid.getRect()
    const rowTop = Math.max(rect.y, hit.rowY)
    const rowBottom = Math.min(this._splitY, hit.rowY + hit.rowHeight)
    ghost.add(new Rect({
      shape: { x: rect.x, y: rowTop - this._splitY, width: rect.width, height: Math.max(0, rowBottom - rowTop) },
      style: { fill: 'rgba(47,158,235,0.10)', stroke: '#2F9EEB', lineWidth: 1 },
      silent: true, zlevel: BOARD_ZLEVEL, z2: -1,
    }))
    this._assignmentGhostGroup = ghost
    this.group.add(ghost)
  }

  private _clearAssignmentGhost(): void {
    if (!this._assignmentGhostGroup) return

    this.group.remove(this._assignmentGhostGroup)
    this._assignmentGhostGroup = null
  }

  private _applySelectedTaskEffect(group: Group, task: TaskData): void {
    // Selection is expressed by the card border and persistent status, without a looping shake.
  }

  private _renderAssignmentStatus(count = this._getUnassignedData().length): void {
    if (typeof document === 'undefined' || !this.api) return
    if (!this._statusHost) {
      const zr = this.api.getZr() as any
      const root = zr.dom || zr.painter?.getViewportRoot?.()
      const parent = root?.parentElement || document.body
      if (parent !== document.body && window.getComputedStyle(parent).position === 'static') parent.style.position = 'relative'
      this._statusHost = document.createElement('div')
      this._statusHost.setAttribute('role', 'status')
      this._statusHost.setAttribute('aria-live', 'polite')
      Object.assign(this._statusHost.style, {
        position: 'absolute', top: '72px', left: '16px', right: '16px', height: '32px',
        display: 'flex', alignItems: 'center', gap: '12px', zIndex: '20',
        font: '13px "Microsoft YaHei", sans-serif', color: '#64748B', pointerEvents: 'none',
      })
      parent.appendChild(this._statusHost)
    }
    const state = this._assignmentMachine?.getState() || 'idle'
    const context = this._assignmentMachine?.getContext()
    const name = context?.taskData?.name || context?.taskData?.taskName || String(context?.taskId || '')
    const busy = state === 'submitting' || state === 'waiting_ws' || state === 'refreshing'
    const text = document.createElement('span')
    text.textContent = busy ? `正在派遣 · ${name}`
      : state === 'error' ? '派遣未完成'
      : state === 'idle' ? ''
      : `已选择 · ${name} · 点击资源行派遣 · Esc 取消`
    Object.assign(text.style, { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })
    this._statusHost.style.color = state === 'idle' ? '#64748B' : '#2563EB'
    // Hover updates are frequent; avoid replacing DOM or repeating screen-reader announcements.
    if (this._statusHost.dataset.status === text.textContent + state) return
    this._statusHost.dataset.status = text.textContent + state
    this._statusHost.replaceChildren()
    if (state === 'idle') {
      const label = document.createElement('strong')
      label.textContent = '未分配任务'
      label.style.color = '#334155'
      const countBadge = document.createElement('span')
      countBadge.textContent = String(count)
      Object.assign(countBadge.style, { display: 'inline-flex', minWidth: '28px', height: '24px', padding: '0 7px', boxSizing: 'border-box', alignItems: 'center', justifyContent: 'center', border: '1px solid #D6DEE8', borderRadius: '4px', background: '#FFFFFF', color: '#475569', fontSize: '12px', fontWeight: '600' })
      const hint = document.createElement('span')
      hint.textContent = '双击任务，再点击目标资源行派遣'
      Object.assign(hint.style, { marginLeft: '4px', color: '#64748B' })
      this._statusHost.append(label, countBadge, hint)
    } else {
      this._statusHost.appendChild(text)
    }
    if (state !== 'idle' && !busy) {
      const cancel = document.createElement('button')
      cancel.type = 'button'
      cancel.textContent = '取消派遣'
      Object.assign(cancel.style, { flexShrink: '0', border: '1px solid #CBD5E1', borderRadius: '4px', background: '#FFF', color: '#475569', height: '28px', padding: '0 8px', cursor: 'pointer', pointerEvents: 'auto' })
      cancel.onclick = () => { if (!this._assigning) this._assignmentMachine.cancel() }
      this._statusHost.appendChild(cancel)
    }
  }

  private _clearSelectedTaskTweens(): void {
    const tweenManager = this.api?.getTweenManager?.()
    if (!tweenManager) {
      this._selectedTaskTweens.clear()
      return
    }

    this._selectedTaskTweens.forEach((tween) => {
      tweenManager.stop(tween)
    })
    this._selectedTaskTweens.clear()
  }

  private _renderGridExtension(): void {
    if (this._gridExtensionGroup) {
      this.group.remove(this._gridExtensionGroup)
    }

    const grid = this._getGrid()
    if (!grid) return

    const rect = grid.getRect()
    const xAxis = grid.getCartesians()[0]?.getAxis('x')
    const yAxis = grid.getCartesians()[0]?.getAxis('y')
    if (!xAxis || !yAxis) return

    const height = Math.max(0, this.api.getHeight() - this._splitY)
    const ticksCoords = xAxis.getTicksCoords()
    const rowHeight = Math.abs(
      yAxis.toGlobalCoord(yAxis.dataToCoord(1)) -
        yAxis.toGlobalCoord(yAxis.dataToCoord(0))
    )
    if (!rowHeight) return

    const gridGroup = (this._gridExtensionGroup = new Group())
    ;(gridGroup as any).attr({ zlevel: BOARD_ZLEVEL, z: 0, z2: 1 })

    for (let y = 0, rowIndex = 0; y < height; y += rowHeight, rowIndex++) {
      const fill = rowIndex % 2 === 0 ? '#FFFFFF' : '#F7F8FA'
      const currentRowHeight = Math.min(rowHeight, height - y)

      gridGroup.add(
        new Rect({
          shape: {
            x: rect.x,
            y,
            width: rect.width,
            height: currentRowHeight,
          },
          style: {
            fill,
          },
          zlevel: BOARD_ZLEVEL,
          z: 0,
          z2: 0,
          silent: true,
        })
      )

      if (y > 0) {
        gridGroup.add(
          new Line({
            shape: {
              x1: rect.x,
              y1: y,
              x2: rect.x + rect.width,
              y2: y,
            },
            style: {
              stroke: '#EDF1F5',
              lineWidth: 1,
            },
            zlevel: BOARD_ZLEVEL,
            z: 0,
            z2: 1,
            silent: true,
          })
        )
      }
    }

    ticksCoords.forEach((tickCoord: any) => {
      const x = rect.x + tickCoord.coord
      if (x < rect.x || x > rect.x + rect.width) return
      const tickTime = new Date(tickCoord.tickValue)
      const isHour = Number.isFinite(tickTime.getTime()) && tickTime.getMinutes() === 0

      gridGroup.add(
        new Line({
          shape: {
            x1: x,
            y1: 0,
            x2: x,
            y2: height,
          },
          style: {
            stroke: isHour ? '#C4CFDB' : '#E3E9EF',
            lineWidth: isHour ? 1.5 : 1,
          },
          zlevel: BOARD_ZLEVEL,
          z: 0,
          z2: 1,
          silent: true,
        })
      )
    })

    this.group.add(gridGroup)
  }

  private _renderMainVerticalDataZoomMirror(): void {
    this._clearMainVerticalDataZoomRaf()
    if (this._mainScrollbarGroup) {
      this.group.remove(this._mainScrollbarGroup)
    }

    const dataZoomModel = this._getVerticalDataZoomModel()
    const grid = this._getGrid()
    if (!dataZoomModel || !grid) return

    const rect = grid.getRect()
    const trackHeight = Math.max(0, this._splitY - rect.y)
    if (trackHeight <= 0) return

    const range = dataZoomModel.getPercentRange?.() || [0, 100]
    const span = Math.max(1, Math.min(100, range[1] - range[0]))
    const movablePercent = Math.max(1, 100 - span)
    const thumbHeight = Math.max(24, (span / 100) * trackHeight)
    const trackMoveHeight = Math.max(1, trackHeight - thumbHeight)
    const thumbY = (Math.max(0, range[0]) / movablePercent) * trackMoveHeight
    const trackWidth = 8
    const trackX = rect.x + rect.width + 6
    const groupOffsetY = -this._splitY

    const scrollbarGroup = (this._mainScrollbarGroup = new Group())
    ;(scrollbarGroup as any).attr({ zlevel: BOARD_ZLEVEL, z: 0, z2: 6 })

    scrollbarGroup.add(
      new Rect({
        shape: {
          x: trackX,
          y: rect.y + groupOffsetY,
          width: trackWidth,
          height: trackHeight,
          r: 4,
        },
        style: {
          fill: 'rgba(203, 213, 225, 0.35)',
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 0,
        silent: true,
      })
    )

    this._mainScrollThumb = new Rect({
      shape: {
        x: trackX,
        y: rect.y + groupOffsetY + thumbY,
        width: trackWidth,
        height: thumbHeight,
        r: 4,
      },
      style: {
        fill: '#94A3B8',
      },
      zlevel: BOARD_ZLEVEL,
      z: 0,
      z2: 1,
      cursor: 'ns-resize',
      draggable: true,
      ondragstart: (event: any) => {
        this._mainScrollDragStartY = event.offsetY
        this._mainScrollDragStartStart = range[0]
        eventTool.stop(event.event)
      },
      drift: (_dx: number, _dy: number, event: any) => {
        this._pendingMainVerticalDataZoomOffsetY = event.offsetY
        eventTool.stop(event.event)

        if (this._mainVerticalDataZoomRafId != null) {
          return
        }

        this._mainVerticalDataZoomRafId = requestAnimationFrame(() => {
          this._mainVerticalDataZoomRafId = null
          this._flushMainVerticalDataZoom()
        })
      },
      ondragend: (event: any) => {
        eventTool.stop(event.event)
        this._flushMainVerticalDataZoom()
      }
    })

    scrollbarGroup.add(this._mainScrollThumb)
    this.group.add(scrollbarGroup)
  }

  private _flushMainVerticalDataZoom(): void {
    if (this._mainVerticalDataZoomRafId != null) {
      cancelAnimationFrame(this._mainVerticalDataZoomRafId)
      this._mainVerticalDataZoomRafId = null
    }

    const offsetY = this._pendingMainVerticalDataZoomOffsetY
    this._pendingMainVerticalDataZoomOffsetY = null
    if (offsetY == null) return

    const currentRange =
      this._getVerticalDataZoomModel()?.getPercentRange?.() || [0, 100]
    const currentSpan = Math.max(
      1,
      Math.min(100, currentRange[1] - currentRange[0])
    )
    const currentMovablePercent = Math.max(1, 100 - currentSpan)
    const grid = this._getGrid()
    if (!grid) return

    const rect = grid.getRect()
    const trackHeight = Math.max(0, this._splitY - rect.y)
    const thumbHeight = Math.max(
      24,
      (currentSpan / 100) * trackHeight
    )
    const trackMoveHeight = Math.max(1, trackHeight - thumbHeight)
    const deltaY = offsetY - this._mainScrollDragStartY
    const nextStart =
      this._mainScrollDragStartStart +
      (deltaY / trackMoveHeight) * currentMovablePercent
    this._dispatchVerticalDataZoom(nextStart, nextStart + currentSpan)
  }

  private _clearMainVerticalDataZoomRaf(): void {
    if (this._mainVerticalDataZoomRafId != null) {
      cancelAnimationFrame(this._mainVerticalDataZoomRafId)
      this._mainVerticalDataZoomRafId = null
    }
    this._pendingMainVerticalDataZoomOffsetY = null
  }

  private _getGrid(): any {
    let grid: any
    ;(this.piModel as any).eachComponent('grid', function (gridModel: any) {
      if (!grid && gridModel.coordinateSystem) {
        grid = gridModel.coordinateSystem
      }
    })
    return grid
  }

  private _getVerticalDataZoomModel(): any {
    let dataZoomModel: any
    ;(this.piModel as any).eachComponent('dataZoom', function (dzModel: any) {
      if (
        !dataZoomModel &&
        dzModel.subType === 'slider' &&
        dzModel.getOrient() === 'vertical'
      ) {
        dataZoomModel = dzModel
      }
    })
    return dataZoomModel
  }

  private _getBoardResources(): Array<[string, string | number]> {
    let resources: Array<[string, string | number]> = []
    ;(this.piModel as any).eachComponent('unassignedBoard', function (boardModel: any) {
      resources = boardModel.get('resources') || []
    })
    return resources
  }

  private _getAssignTaskHandler(): UnassignedBoardOption['onAssignTask'] {
    let handler: UnassignedBoardOption['onAssignTask']
    ;(this.piModel as any).eachComponent('unassignedBoard', function (boardModel: any) {
      handler = boardModel.get('onAssignTask')
    })
    return handler
  }

  private _isTaskSelected(task: TaskData): boolean {
    const current = this._assignmentMachine?.getContext()
    return current?.taskId != null && current.taskId === task.id
  }

  private _dispatchVerticalDataZoom(start: number, end: number): void {
    const dataZoomModel = this._getVerticalDataZoomModel()
    if (!dataZoomModel) return

    const span = Math.max(1, Math.min(100, end - start))
    const nextStart = Math.max(0, Math.min(100 - span, start))
    const nextEnd = Math.min(100, nextStart + span)
    const currentRange = dataZoomModel.getPercentRange?.() || [0, 100]
    if (
      Math.abs(nextStart - currentRange[0]) < 0.001 &&
      Math.abs(nextEnd - currentRange[1]) < 0.001
    ) {
      return
    }
    this.api.dispatchAction({
      type: 'dataZoom',
      from: dataZoomModel.uid,
      dataZoomId: dataZoomModel.id,
      start: nextStart,
      end: nextEnd,
    })
  }

  private _getRowHeight(): number {
    const grid = this._getGrid()
    const yAxis = grid?.getCartesians()[0]?.getAxis('y')
    if (!yAxis) return 44

    const rowHeight = Math.abs(
      yAxis.toGlobalCoord(yAxis.dataToCoord(1)) -
        yAxis.toGlobalCoord(yAxis.dataToCoord(0))
    )

    return rowHeight || 44
  }

  private _parseTime(value: string | number | undefined): number | null {
    if (value == null) return null

    const time = typeof value === 'number' ? value : new Date(value).getTime()
    return Number.isNaN(time) ? null : time
  }

  private _formatTimeLabel(value: number): string {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''

    return `${this._pad2(date.getHours())}:${this._pad2(date.getMinutes())}`
  }

  private _pad2(value: number): string {
    return value < 10 ? `0${value}` : `${value}`
  }

  private _formatDate(value: string | number | undefined): string {
    const date = value == null ? new Date() : new Date(value)
    if (Number.isNaN(date.getTime())) {
      return this._formatDate(undefined)
    }

    return `${date.getFullYear()}-${this._pad2(date.getMonth() + 1)}-${this._pad2(date.getDate())}`
  }

  private _setGroupOpacity(group: Group, opacity: number): void {
    group.traverse((el: any) => {
      if (el.setStyle) {
        el.setStyle({
          opacity,
        })
      }
    })
  }

  private _truncateText(text: string, maxWidth: number, fontSize = 11): string {
    const value = String(text || '')
    const maxChars = Math.max(0, Math.floor(maxWidth / fontSize))
    if (!maxChars) return ''

    return value.length > maxChars
      ? `${value.slice(0, maxChars - 1)}…`
      : value
  }

}
