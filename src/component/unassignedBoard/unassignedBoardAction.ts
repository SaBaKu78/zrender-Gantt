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
        dataZoomModel.get('show') === false
      ) {
        return
      }

      const orient = dataZoomModel.getOrient()
      const dataZoomView = api.getViewOfComponentModel(dataZoomModel) as any
      const bottom = Math.max(api.getHeight() - newY + DATAZOOM_SPLIT_GAP, 0)

      if (orient === 'horizontal') {
        const height = dataZoomModel.get('height') || 0
        dataZoomModel.option.bottom = bottom
        dataZoomModel.option.top = undefined
        dataZoomModel.option.height = height

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
      } else if (orient === 'vertical') {
        const range = dataZoomModel.getPercentRange()
        dataZoomModel.option.bottom = bottom
        dataZoomModel.option.height = undefined
        dataZoomModel.setRawRange({
          start: range[0],
          end: range[1],
        })
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