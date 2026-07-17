import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import ExtensionAPI from '../../core/ExtensionAPI'
import { Group, Rect, Text } from 'zrender'
import ComponentModel from '../../model/Component'
import { Payload } from '../../util/types'
import { parseRatio } from '../split/SliderSplitView'

const BOARD_ZLEVEL = 999

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

  private _backgroundRect: Rect

  private _emptyText: Text

  render(model: ComponentModel, piModel: GlobalModel, api: ExtensionAPI, payload?: Payload): void {
    this.group.removeAll()
    this.piModel = piModel
    this.api = api

    let splitY = api.getHeight()

    ;(piModel as any).eachComponent('split', function(splitModel: any) {
      if (splitModel.get('orient') === 'horizontal') {
        const ratio = splitModel.get('ratio')
        if (ratio != null) {
          splitY = api.getHeight() * parseRatio(ratio, 'horizontal')
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
          fill: 'rgb(240, 242, 245)',
        },
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 0,
        silent: true,
      })
    group.add(this._backgroundRect)

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
        zlevel: BOARD_ZLEVEL,
        z: 0,
        z2: 1,
        cursor: 'move',
      })

      group.add(text)
      yOffset += itemHeight + itemGap
    })

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
}