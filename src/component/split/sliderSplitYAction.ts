import { ExtensionInstallRegisters } from "../../../extension";
import GlobalModel from "../../model/Global";
import ExtensionAPI from "../../core/ExtensionAPI";

let gridRightCache: number | null = null

export default function installSliderSplitYAction(registers: ExtensionInstallRegisters) {
  registers.registerAction({
    type: 'updateYAxisPosition',
  }, function(payload: any, model: GlobalModel, api: ExtensionAPI) {
    const newX = payload.data?.x
    if (newX == null) return

    model.eachComponent('grid', function(gridModel: any) {
      const grid = gridModel.coordinateSystem
      if (!grid) return

      if (gridRightCache === null) {
        const gridRect = grid.getRect()
        gridRightCache = gridRect.x + gridRect.width
      }

      const gridRight = gridRightCache

      gridModel.option.left = newX
      gridModel.option.width = gridRight - newX
      gridModel.option.right = undefined

      grid.resize(gridModel, api, true)
    })

    api.getZr().refresh()
  })
}