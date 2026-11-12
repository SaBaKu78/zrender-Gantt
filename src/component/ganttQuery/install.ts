import { ExtensionInstallRegisters } from '../../../extension'
import { install as installGanttQueryModel } from './GanttQueryModel'
import { getTheme } from '../../config/theme'

export function install(registers: ExtensionInstallRegisters) {
  installGanttQueryModel(registers)
  registers.registerAction({
    type: 'updateTheme',
    update: 'update',
  }, function (_payload, model) {
    const theme = getTheme()
    model.eachComponent('xAxis', function (axisModel: any) {
      axisModel.option.axisLabel = {
        ...(axisModel.option.axisLabel || {}),
        color: theme.axisText,
      }
      axisModel.option.axisTick = {
        ...(axisModel.option.axisTick || {}),
        lineStyle: {
          ...(axisModel.option.axisTick?.lineStyle || {}),
          color: theme.axisLine,
        },
      }
      axisModel.option.axisLine = {
        ...(axisModel.option.axisLine || {}),
        lineStyle: {
          ...(axisModel.option.axisLine?.lineStyle || {}),
          color: theme.axisLine,
        },
      }
    })
    model.eachComponent('grid', function (gridModel: any) {
      gridModel.option.backgroundColor = theme.gridBackground
      gridModel.option.borderColor = theme.border
    })
    model.eachComponent('split', function (splitModel: any) {
      splitModel.option.backgroundColor = theme.scrollTrack
    })
    model.eachComponent('dataZoom', function (dataZoomModel: any) {
      if (dataZoomModel.subType !== 'slider') return
      dataZoomModel.option.borderColor = theme.axisLine
      dataZoomModel.option.backgroundColor = theme.gridBackground
      dataZoomModel.option.fillerColor = theme.primarySoft
      dataZoomModel.option.handleStyle = {
        ...(dataZoomModel.option.handleStyle || {}),
        color: theme.surface,
        borderColor: theme.primary,
      }
      dataZoomModel.option.moveHandleStyle = {
        ...(dataZoomModel.option.moveHandleStyle || {}),
        color: theme.scrollThumb,
      }
      dataZoomModel.option.textStyle = {
        ...(dataZoomModel.option.textStyle || {}),
        color: theme.muted,
      }
      dataZoomModel.option.dataBackground = {
        ...(dataZoomModel.option.dataBackground || {}),
        lineStyle: { color: theme.border, width: 0.5 },
        areaStyle: { color: theme.border, opacity: 0.2 },
      }
      dataZoomModel.option.selectedDataBackground = {
        ...(dataZoomModel.option.selectedDataBackground || {}),
        lineStyle: { color: theme.primary, width: 0.5 },
        areaStyle: { color: theme.primary, opacity: 0.2 },
      }
    })
  })
}
