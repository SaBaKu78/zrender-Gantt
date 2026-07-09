import GlobalModel from "../../model/Global";
import ComponentView from "../../view/Component";
import GridModel from "./GridModel";
import { Line } from 'zrender'

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
    const yAxis = grid.getCartesians()[0]?.getAxis('y')
    if (!yAxis) return

    const min = yAxis.model.get('min') as number
    const max = yAxis.model.get('max') as number
    const totalRowCount = max - min

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