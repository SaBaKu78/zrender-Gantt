import { createHashMap, HashMap } from 'zrender/src/core/util'
import SeriesModel from './Series'
import { AxisBaseModel } from '../coord/AxisBaseModel'
import { SeriesOnCartesinaOptionMixin, SeriesOption } from '../util/types'
import { SINGLE_REFERRING } from '../util/model'

type SupportedCoordSys = 'cartesian2d'
type Fetcher = (
  seriesModel: SeriesModel,
  result: CoordSysInfo,
  axisMap: HashMap<AxisBaseModel>,
  categoryAxisMap: HashMap<AxisBaseModel>
) => void

class CoordSysInfo {
  coordSysName: string

  coordSysDims: string[] = []

  axisMap = createHashMap<AxisBaseModel>()

  categoryAxisMap = createHashMap<AxisBaseModel>()

  firstCategoryDimIndex: number

  constructor(coordSysName: string) {
    this.coordSysName = coordSysName
  }
}

export function getCoordSysInfoBySeries(seriesModel: SeriesModel) {
  const coordSysName = seriesModel.get('coordinateSystem')
  const coordSysInfo = new CoordSysInfo(coordSysName)
  const fetch = fetchs[coordSysName]
  if (fetch) {
    fetch(
      seriesModel,
      coordSysInfo,
      coordSysInfo.axisMap,
      coordSysInfo.categoryAxisMap
    )
    return coordSysInfo
  }
}

const fetchs: Record<SupportedCoordSys, Fetcher> = {
  cartesian2d: function (
    seriesModel: SeriesModel<SeriesOption & SeriesOnCartesinaOptionMixin>,
    result,
    axisMap,
    categoryAxisMap
  ) {
    const xAxisModel = seriesModel.getReferringComponents(
      'xAxis',
      SINGLE_REFERRING
    ).models[0] as AxisBaseModel
    const yAxisModel = seriesModel.getReferringComponents(
      'yAxis',
      SINGLE_REFERRING
    ).models[0] as AxisBaseModel
    result.coordSysDims = ['x', 'y']
    axisMap.set('x', xAxisModel)
    axisMap.set('y', yAxisModel)

    if (isCategory(xAxisModel)) {
      categoryAxisMap.set('x', xAxisModel)
      result.firstCategoryDimIndex = 0
    }
    if (isCategory(yAxisModel)) {
      categoryAxisMap.set('y', yAxisModel)
      result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1)
    }
  },
}

function isCategory(axisModel: AxisBaseModel) {
  return axisModel.get('type') === 'category'
}
