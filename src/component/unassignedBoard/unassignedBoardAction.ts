import { ExtensionInstallRegisters } from "../../../extension";
import GlobalModel from "../../model/Global";
import ExtensionAPI from "../../core/ExtensionAPI";

export default function installUnassignedBoardAction(registers: ExtensionInstallRegisters) {
  registers.registerAction({
    type: 'updateUnassignedBoardPosition',
  }, function(payload: any, model: GlobalModel, api: ExtensionAPI) {
    const newY = payload.data?.y
    if (newY == null) return

    // 获取垂直分割线位置
    let verticalSplitX = 0
    model.eachComponent('split', function(splitModel: any) {
      if (splitModel.get('orient') === 'vertical') {
        const ratio = splitModel.get('ratio')
        if (ratio != null) {
          verticalSplitX = api.getWidth() * ratio
        }
      }
    })

    model.eachComponent('unassignedBoard', function(boardModel: any) {
      boardModel.option.splitY = newY
      boardModel.option.verticalSplitX = verticalSplitX
      api.getViewOfComponentModel(boardModel)?.updateLayout?.(boardModel, api, { type: 'updateUnassignedBoardPosition', data: { y: newY } })
    })
  })
}