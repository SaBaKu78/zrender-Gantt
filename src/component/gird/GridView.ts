import GlobalModel from "../../model/Global";
import ComponentView from "../../view/Component";
import GridModel from "./GridModel";
import { Line, Rect } from 'zrender'

class GridView extends ComponentView {
  static readonly type = 'grid'
  readonly type = 'grid'

  private _horizontalLines: Line[] = []

  render(gridModel: GridModel, piModel: GlobalModel){
    this.group.removeAll()
    this._horizontalLines = []

    const grid = gridModel.coordinateSystem
    if (!grid) return

    const rect = grid.getRect()
    this.group.setClipPath(
      new Rect({
        shape: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
      })
    )

    const yAxis = grid.getCartesians()[0]?.getAxis('y')
    if (!yAxis) return

    const min = yAxis.model.get('min') as number
    const max = yAxis.model.get('max') as number
    const totalRowCount = max - min

    for (let i = 0; i < totalRowCount; i++) {
      if (i % 2 !== 0) continue

      const rowStart = yAxis.toGlobalCoord(yAxis.dataToCoord(min + i))
      const rowEnd = yAxis.toGlobalCoord(yAxis.dataToCoord(min + i + 1))
      const rowY = Math.min(rowStart, rowEnd)
      const rowHeight = Math.abs(rowEnd - rowStart)

      this.group.add(
        new Rect({
          shape: {
            x: rect.x,
            y: rowY,
            width: rect.width,
            height: rowHeight,
          },
          style: {
            fill: '#fff',
          },
          z2: -1,
          silent: true,
        })
      )
    }

    // 画水平线：在每行底部，从 grid 左边缘到右边缘
    // 使用 yAxis.dataToCoord + toGlobalCoord 确保跟随 dataZoom 滚动
    for (let i = 0; i < totalRowCount - 1; i++) {
      const dataValue = min + i + 1
      const localCoord = yAxis.dataToCoord(dataValue)
      const globalY = yAxis.toGlobalCoord(localCoord)
      const line = new Line({
        shape: {
          x1: rect.x,
          y1: globalY,
          x2: rect.x + rect.width,
          y2: globalY,
        },
        style: {
          stroke: '#E2E8ED',
          lineWidth: 1,
        },
        z2: 0,
        silent: true,
      })
      this._horizontalLines.push(line)
      this.group.add(line)
    }
  }
}

export default GridView
