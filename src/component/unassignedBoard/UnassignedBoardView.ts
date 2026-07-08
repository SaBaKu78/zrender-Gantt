import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import ExtensionAPI from '../../core/ExtensionAPI'
import { Group, Rect, Text } from 'zrender'
import ComponentModel from '../../model/Component'
import { Payload } from '../../util/types'
import { parseRatio } from '../split/SliderSplitView'

export interface TaskData {
  id: number
  name?: string
  assignee?: number | null
  startTime?: string
  endTime?: string
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
}

export default class UnassignedBoardView extends ComponentView {
  static type = 'unassignedBoard'
  type = UnassignedBoardView.type

  piModel: GlobalModel
  api: ExtensionAPI

  private _group: Group

  private _splitY: number

  render(model: ComponentModel, piModel: GlobalModel, api: ExtensionAPI, payload?: Payload): void {
    this.group.removeAll()
    this.piModel = piModel
    this.api = api

    // 与 SliderSplitView._resetLocation 完全一致的计算逻辑
    const BOUNDARY = 2
    let splitY = api.getHeight() / 2
    ;(piModel as any).eachComponent('split', function(splitModel: any) {
      if (splitModel.get('orient') === 'horizontal') {
        const ratio = splitModel.get('ratio')
        if (ratio != null) {
          splitY = api.getHeight() * parseRatio(ratio, 'horizontal')
        } else {
          splitY = api.getHeight() - BOUNDARY
        }
      }
    })
    this._splitY = splitY


    const unassignedData = this._getUnassignedData()
    this._renderBoard(unassignedData)
  }

  updateLayout(model: ComponentModel, api: ExtensionAPI, payload?: any): void {
    if (payload?.type === 'updateUnassignedBoardPosition') {
      const newY = payload.data?.y
      if (newY == null) return

      this._splitY = newY
      this.api = api

      // x = 0
      // y = 水平分割线 y
      // 宽度 = 整个视口宽度
      // 高度 = 视口高度 - 水平分割线 y
      const x = 0
      const y = this._splitY
      const width = api.getWidth()
      const height = api.getHeight() - this._splitY

      ;(this.group as any).attr({ x, y })

      const rect = this.group.childAt(0) as Rect
      if (rect) {
        rect.attr({ shape: { x: 0, y: 0, width, height } })
      }
    }
  }

  private _getUnassignedData(): TaskData[] {
    const option = this.piModel.getOption() as any
    const taskData = option?.task?.data || []
    return taskData.filter((task: TaskData) => !task.assignee)
  }

  private _renderBoard(tasks: TaskData[]): void {
    const group = this.group
    const api = this.api

    const itemGap = 8
    const padding = [16, 16, 16, 16]

    // 宽度 = 整个视口宽度（与 bRect 的 width 一致）
    // 高度 = 视口高度 - 水平分割线 y
    const x = 0
    const splitY = this._splitY
    const width = api.getWidth()
    const height = api.getHeight() - splitY

    ;(group as any).attr({ z: 9999 })
    ;(group as any).attr({ x, y: splitY })

    group.add(
      new Rect({
        shape: {
          x: 0,
          y: 0,
          width: width,
          height: height,
        },
        style: {
          fill: 'rgb(240, 242, 245)',
        },
        z2: 9999,
        silent: true,
      })
    )

    let yOffset = padding[0]
    const maxWidth = width - padding[1] - padding[3]

    tasks.forEach((task: TaskData) => {
      const itemHeight = 60
      const text = new Text({
        style: {
          text: task.name || `Task ${task.id}`,
          x: padding[3],
          y: yOffset,
          width: maxWidth,
          height: itemHeight,
          fontSize: 14,
          fill: '#333',
          verticalAlign: 'top',
        },
        cursor: 'move',
      })

      group.add(text)
      yOffset += itemHeight + itemGap
    })

    if (tasks.length === 0) {
      group.add(
        new Text({
          style: {
            text: '暂无未分配任务',
            x: width / 2,
            y: height / 2,
            fontSize: 14,
            fill: '#999',
            align: 'center',
            verticalAlign: 'middle',
          },
          silent: true,
        })
      )
    }
  }
}