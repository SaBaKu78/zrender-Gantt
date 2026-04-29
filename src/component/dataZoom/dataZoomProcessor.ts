import { createHashMap, each } from 'zrender/src/core/util'
import { StageHandler } from '../../util/types'
import SeriesModel from '../../model/Series'
import DataZoomModel, { DataZoomExtendedAxisBaseModel } from './DataZoomModel'
import { DataZoomAxisDimension, getAxisMainType } from './helper'
import AxisProxy from './AxisProxy'

const dataZoomProcessor: StageHandler = {
  getTargetSeries(piModel) {
    function eachAxisModel(
      cb: (
        axisDim: DataZoomAxisDimension,
        axisIndex: number,
        axisModel: DataZoomExtendedAxisBaseModel,
        dataZoomModel: DataZoomModel
      ) => void
    ) {
      piModel.eachComponent(
        'dataZoom',
        function (dataZoomModel: DataZoomModel) {
          dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
            const axisModel = piModel.getComponent(
              getAxisMainType(axisDim),
              axisIndex
            )
            cb(
              axisDim,
              axisIndex,
              axisModel as DataZoomExtendedAxisBaseModel,
              dataZoomModel
            )
          })
        }
      )
    }
    eachAxisModel(function (axisDim, axisIndex, axisModel, dataZoomModel) {
      axisModel.__dzAxisProxy = null
    })
    const proxyList: AxisProxy[] = []
    eachAxisModel(function (axisDim, axisIndex, axisModel, dataZoomModel) {
      // Different dataZooms may constrol the same axis. In that case,
      // an axisProxy serves both of them.
      if (!axisModel.__dzAxisProxy) {
        // Use the first dataZoomModel as the main model of axisProxy.
        axisModel.__dzAxisProxy = new AxisProxy(
          axisDim,
          axisIndex,
          dataZoomModel,
          piModel
        )
        proxyList.push(axisModel.__dzAxisProxy)
      }
    })
    const seriesModelMap = createHashMap<SeriesModel>()
    each(proxyList, function (axisProxy) {
      each(axisProxy.getTargetSeriesModels(), function (seriesModel) {
        seriesModelMap.set(seriesModel.uid, seriesModel)
      })
    })
    return seriesModelMap
  },
  overallReset(piModel, api) {
    piModel.eachComponent('dataZoom', function (dataZoomModel: DataZoomModel) {
      dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
        dataZoomModel.getAxisProxy(axisDim, axisIndex).reset(dataZoomModel)
      })
      dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
        dataZoomModel
          .getAxisProxy(axisDim, axisIndex)
          .filterData(dataZoomModel, api)
      })
    })
  },
}

export default dataZoomProcessor
