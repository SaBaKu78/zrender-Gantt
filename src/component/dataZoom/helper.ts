import { createHashMap, HashMap, indexOf } from 'zrender/src/core/util'
import SeriesModel from '../../model/Series'
import DataZoomModel from './DataZoomModel'
import { AxisBaseModel } from '../../coord/AxisBaseModel'
import { CoordinateSystemHostModel } from '../../core/CoordinateSystem'
import GlobalModel from '../../model/Global'
import { Payload } from '../../util/types'

export type DataZoomAxisDimension = 'x' | 'y'

type DataZoomAxisMainType = 'xAxis' | 'yAxis'

export const DATA_ZOOM_AXIS_DIMENSIONS = ['x', 'y'] as const

const SERIES_COORDS = ['cartesian2d'] as const

export type DataZoomCoordSysMainType = 'polar' | 'grid' | 'singleAxis'

export interface DataZoomPayloadBatchItem {
  dataZoomId: string
  start?: number
  end?: number
  startValue?: number
  endValue?: number
}

export interface DataZoomReferCoordSysInfo {
  model: CoordinateSystemHostModel
  axisModels: AxisBaseModel[]
}

export function getAxisMainType(
  axisDim: DataZoomAxisDimension
): DataZoomAxisMainType {
  return (axisDim + 'Axis') as DataZoomAxisMainType
}

export function isCoordSupported(seriesModel: SeriesModel): boolean {
  const coordType = seriesModel.get('coordinateSystem')
  return indexOf(SERIES_COORDS, coordType) >= 0
}

export function collectReferCoordSysModelInfo(dataZoomModel: DataZoomModel): {
  infoList: DataZoomReferCoordSysInfo[]
  // Key: coordSysModel.uid
  infoMap: HashMap<DataZoomReferCoordSysInfo, string>
} {
  const piModel = dataZoomModel.piModel
  const coordSysInfoWrap = {
    infoList: [] as DataZoomReferCoordSysInfo[],
    infoMap: createHashMap<DataZoomReferCoordSysInfo, string>(),
  }

  dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
    const axisModel = piModel.getComponent(
      getAxisMainType(axisDim),
      axisIndex
    ) as AxisBaseModel
    if (!axisModel) {
      return
    }
    const coordSysModel = axisModel.getCoordSysModel()
    if (!coordSysModel) {
      return
    }

    const coordSysUid = coordSysModel.uid
    let coordSysInfo = coordSysInfoWrap.infoMap.get(coordSysUid)
    if (!coordSysInfo) {
      coordSysInfo = { model: coordSysModel, axisModels: [] }
      coordSysInfoWrap.infoList.push(coordSysInfo)
      coordSysInfoWrap.infoMap.set(coordSysUid, coordSysInfo)
    }

    coordSysInfo.axisModels.push(axisModel)
  })
  return coordSysInfoWrap
}

export function findEffectedDataZooms(
  ecModel: GlobalModel,
  payload: Payload
): DataZoomModel[] {
  // Key: `DataZoomAxisDimension`
  const axisRecords = createHashMap<boolean[], DataZoomAxisDimension>()
  const effectedModels: DataZoomModel[] = []
  // Key: uid of dataZoomModel
  const effectedModelMap = createHashMap<boolean>()

  // Find the dataZooms specified by payload.
  ecModel.eachComponent(
    { mainType: 'dataZoom', query: payload },
    function (dataZoomModel: DataZoomModel) {
      if (!effectedModelMap.get(dataZoomModel.uid)) {
        addToEffected(dataZoomModel)
      }
    }
  )

  // Start from the given dataZoomModels, travel the graph to find
  // all of the linked dataZoom models.
  let foundNewLink
  do {
    foundNewLink = false
    ecModel.eachComponent('dataZoom', processSingle)
  } while (foundNewLink)

  function processSingle(dataZoomModel: DataZoomModel): void {
    if (!effectedModelMap.get(dataZoomModel.uid) && isLinked(dataZoomModel)) {
      addToEffected(dataZoomModel)
      foundNewLink = true
    }
  }

  function addToEffected(dataZoom: DataZoomModel): void {
    effectedModelMap.set(dataZoom.uid, true)
    effectedModels.push(dataZoom)
    markAxisControlled(dataZoom)
  }

  function isLinked(dataZoomModel: DataZoomModel): boolean {
    let isLink = false
    dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
      const axisIdxArr = axisRecords.get(axisDim)
      if (axisIdxArr && axisIdxArr[axisIndex]) {
        isLink = true
      }
    })
    return isLink
  }

  function markAxisControlled(dataZoomModel: DataZoomModel) {
    dataZoomModel.eachTargetAxis(function (axisDim, axisIndex) {
      ;(axisRecords.get(axisDim) || axisRecords.set(axisDim, []))[axisIndex] =
        true
    })
  }

  return effectedModels
}
