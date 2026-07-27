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
    newResourceId: string | number
    taskId: string | number
    date: string
    force: boolean
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

  init(piModel: GlobalModel, api: ExtensionAPI): void {
    this.api = api
    this.piModel = piModel

    if (!this._assignmentMachine) {
      this._assignmentMachine = new AssignmentStateMachine()
      this._assignmentMachine.on('statechange', (_context, prevState, nextState) => {
        if (this.piModel && this.api && prevState !== nextState) {
          this._renderBoard(this._getUnassignedData())
        }
      })
    }

    if (!this._boundKeyDownHandler && typeof window !== 'undefined') {
      this._boundKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
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

    if (!tasks.length) return

    const grid = this._getGrid()
    if (!grid) return

    const rect = grid.getRect()
    const height = Math.max(0, this.api.getHeight() - this._splitY)
    const rowHeight = this._getRowHeight()
    const itemGap = 8
    const itemHeight = Math.min(36, Math.max(24, rowHeight - 8))
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
        const nextOffset =
          this._scrollDragStartOffset +
          (deltaY / trackMoveHeight) * this._scrollMax
        this._setScrollOffset(nextOffset)
        eventTool.stop(event.event)
      },
    })

    scrollbarGroup.add(this._scrollThumb)
    this.group.add(scrollbarGroup)
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
          fill: selected ? '#E8F4FF' : '#F3FAFF',
          stroke: selected ? '#1D7FEA' : '#2F9EEB',
          lineWidth: selected ? 2 : 1,
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 0,
      })
    )

    const topY = y + height * 0.34
    const bottomY = y + height * 0.72
    const leftWidth = Math.min(48, Math.max(36, width * 0.2))
    const rightWidth = leftWidth
    const centerX = x + leftWidth
    const centerWidth = Math.max(0, width - leftWidth - rightWidth)

    group.add(
      new Text({
        style: {
          text: this._formatTimeLabel(startValue),
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
          text: this._formatTimeLabel(endValue),
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
          text: this._truncateText(task.flightStatusText || task.name || '', centerWidth - 8, 10),
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
          text: this._truncateText(task.taskName || task.name || `Task ${task.id}`, width - 12, 11),
          x: x + width / 2,
          y: bottomY,
          fontSize: 11,
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
        onclick: (event: any) => {
          this._assignmentMachine?.selectTask(task)
          eventTool.stop(event.event)
        },
      })
      group.add(hitRect)
    }

    return group
  }

  private _bindTaskEvents(group: Group, task: TaskData): void {
    ;(group as any).cursor = 'pointer'
  }

  private _handleGlobalMouseMove(event: any): void {
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
    const context = this._assignmentMachine?.getContext()
    const task = context?.taskData as TaskData
    if (!task || this._assigning) return

    const hit = this._hitMainResourceRow(event.offsetX, event.offsetY)
    if (!hit) return

    if (this._assignmentMachine.getState() === 'selected') {
      this._assignmentMachine.enterGrid()
    }
    this._assignmentMachine.moveHover({
      hoverResourceId: hit.resourceId,
      hoverResourceIndex: hit.resourceIndex,
      hoverY: hit.rowY,
    })

    if (!this._assignmentMachine.clickGrid()) return
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
    if (!handler || taskId == null) return

    this._assigning = true
    this._assignmentMachine.confirm()

    try {
      const result = await handler({
        newResourceId: hit.resourceId,
        taskId,
        date: this._formatDate(task.taskDate ?? task.scheduleStartTime ?? task.startTime),
        force: false,
      })

      if (result?.success) {
        console.info('派遣成功')
        this._assignmentMachine.submitOk()
        this._assignmentMachine.wsUpdate()
        this._assignmentMachine.refreshOk()
        this._clearAssignmentGhost()
      } else {
        console.info('派遣失败')
        this._assignmentMachine.fail('SUBMIT_FAIL', 'assign failed')
      }
    } catch (error) {
      this._assignmentMachine.fail('SUBMIT_FAIL', error as Error)
    } finally {
      this._assigning = false
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

    for (let index = 0; index < resources.length; index++) {
      const start = yAxis.toGlobalCoord(yAxis.dataToCoord(index))
      const end = yAxis.toGlobalCoord(yAxis.dataToCoord(index + 1))
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
    this._assignmentGhostGroup = ghost
    this.group.add(ghost)
  }

  private _clearAssignmentGhost(): void {
    if (!this._assignmentGhostGroup) return

    this.group.remove(this._assignmentGhostGroup)
    this._assignmentGhostGroup = null
  }

  private _applySelectedTaskEffect(group: Group, task: TaskData): void {
    const taskId = task.id
    if (!this._isTaskSelected(task)) {
      return
    }

    const tweenManager = this.api?.getTweenManager?.()
    if (!tweenManager) {
      return
    }

    const tween = tweenManager.presets.shakeY(group, {
      amplitude: 3,
      duration: 180,
      restore: true,
      loop: true,
    })
    this._selectedTaskTweens.set(taskId, tween)
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

      gridGroup.add(
        new Line({
          shape: {
            x1: x,
            y1: 0,
            x2: x,
            y2: height,
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
    })

    this.group.add(gridGroup)
  }

  private _renderMainVerticalDataZoomMirror(): void {
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
        const currentRange =
          this._getVerticalDataZoomModel()?.getPercentRange?.() || range
        const currentSpan = Math.max(1, Math.min(100, currentRange[1] - currentRange[0]))
        const currentMovablePercent = Math.max(1, 100 - currentSpan)
        const deltaY = event.offsetY - this._mainScrollDragStartY
        const nextStart =
          this._mainScrollDragStartStart +
          (deltaY / trackMoveHeight) * currentMovablePercent
        this._dispatchVerticalDataZoom(nextStart, nextStart + currentSpan)
        eventTool.stop(event.event)
      },
    })

    scrollbarGroup.add(this._mainScrollThumb)
    this.group.add(scrollbarGroup)
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
    const maxChars = Math.max(1, Math.floor(maxWidth / (fontSize * 0.9)))

    return value.length > maxChars
      ? `${value.slice(0, Math.max(1, maxChars - 1))}...`
      : value
  }

}
