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
        const nextAxisMax = updateYAxisVirtualPadding(model, api, newY)
        const valueRange =
          dataZoomModel.findRepresentativeAxisProxy?.()?.getDataValueWindow?.()
        const percentRange = dataZoomModel.getPercentRange()
        const range = getStableValueRange(valueRange, percentRange, nextAxisMax)
        dataZoomModel.option.bottom = bottom
        dataZoomModel.option.height = undefined
        dataZoomModel.setRawRange({
          startValue: range[0],
          endValue: range[1],
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

function updateYAxisVirtualPadding(
  model: GlobalModel,
  api: ExtensionAPI,
  splitY: number
): number {
  let nextMax = 0
  let grid: any

  model.eachComponent('grid', function(gridModel: any) {
    if (!grid && gridModel.coordinateSystem) {
      grid = gridModel.coordinateSystem
    }
  })

  model.eachComponent('yAxis', function(axisModel: any) {
    if (nextMax) return

    const resourceCount = axisModel.option.resourceCount ?? axisModel.get('resourceCount')
    if (typeof resourceCount !== 'number') return

    const yAxis = grid?.getCartesians?.()[0]?.getAxis?.('y')
    const measuredRowHeight = Math.abs(
      yAxis
        ? yAxis.toGlobalCoord(yAxis.dataToCoord(1)) -
            yAxis.toGlobalCoord(yAxis.dataToCoord(0))
        : 0
    )
    const rowHeight =
      measuredRowHeight || axisModel.option.targetRowHeight || axisModel.get('targetRowHeight') || 44
    const panelHeight = Math.max(0, api.getHeight() - splitY)
    const paddingRows = Math.max(1, Math.ceil(panelHeight / rowHeight) + 1)

    nextMax = resourceCount + paddingRows
    axisModel.option.max = nextMax
  })

  return nextMax
}

function getStableValueRange(
  valueRange: number[] | undefined,
  percentRange: number[] | undefined,
  nextAxisMax: number
): number[] {
  if (!valueRange || valueRange.length < 2 || !nextAxisMax) {
    return [0, nextAxisMax || 1]
  }

  const span = Math.max(1, valueRange[1] - valueRange[0])
  const isAtBottom = Math.abs((percentRange?.[1] ?? 0) - 100) < 0.5

  if (isAtBottom) {
    return [Math.max(0, nextAxisMax - span), nextAxisMax]
  }

  const start = Math.max(0, Math.min(valueRange[0], nextAxisMax - span))
  return [start, Math.min(nextAxisMax, start + span)]
}
