import { ExtensionInstallRegisters } from "../../../extension";
import GlobalModel from "../../model/Global";
import ExtensionAPI from "../../core/ExtensionAPI";
import { DATAZOOM_SPLIT_GAP } from '../split/SliderSplitView';

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

    model.eachComponent('dataZoom', function(dataZoomModel: any) {
      if (
        dataZoomModel.subType !== 'slider' ||
        dataZoomModel.getOrient() !== 'horizontal' ||
        dataZoomModel.get('show') === false
      ) {
        return
      }

      const height = dataZoomModel.get('height') || 0
      dataZoomModel.option.bottom = Math.max(api.getHeight() - newY + DATAZOOM_SPLIT_GAP, 0)
      dataZoomModel.option.top = undefined
      dataZoomModel.option.height = height
      const dataZoomView = api.getViewOfComponentModel(dataZoomModel) as any
      if (dataZoomView?.updateLayout) {
        dataZoomView.updateLayout(dataZoomModel, api, { type: 'updateUnassignedBoardPosition', data: { y: newY } })
      } else {
        dataZoomView?.render?.(
          dataZoomModel,
          model,
          api,
          { type: 'updateUnassignedBoardPosition', data: { y: newY } }
        )
      }
    })

    model.eachComponent('unassignedBoard', function(boardModel: any) {
      boardModel.option.splitY = newY
      boardModel.option.verticalSplitX = verticalSplitX
      api.getViewOfComponentModel(boardModel)?.updateLayout?.(boardModel, api, { type: 'updateUnassignedBoardPosition', data: { y: newY } })
    })
  })
}