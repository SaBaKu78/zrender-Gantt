import { getCoordSysInfoBySeries } from '../../model/referHelper'
import SeriesModel from '../../model/Series'
import {
  DimensionDefinition,
  DimensionDefinitionLoose,
  EncodeDefaulter,
  OptionSourceData,
  SOURCE_FORMAT_ORIGINAL,
} from '../../util/types'
import { createSourceFromSeriesDataOption, Source } from '../Source'
import * as zrUtil from 'zrender/src/core/util'
import { getDimensionTypeByAxis } from './dimensionHelper'
import CoordinateSystemManager from '../../core/CoordinateSystem'
import SeriesData from '../SeriesData'
import prepareSeriesDataSchema from './createDimensions'
import DataStore from '../DataStore'
import { getDataItemValue } from '../../util/model'
import { makeSeriesEncodeForAxisCoordSys } from './SourceHelper'
import SeriesDimensionDefine from './SeriesDimensionDefine'
import { enableDataStack } from './dataStackHelper'

function getCoordSysDimDefs(
  seriesModel: SeriesModel,
  coordSysInfo: ReturnType<typeof getCoordSysInfoBySeries>
) {
  const coordSysName = seriesModel.get('coordinateSystem')
  const registeredCoordSys = CoordinateSystemManager.get(coordSysName)

  let coordSysDimDefs: DimensionDefinitionLoose[]
  if (coordSysInfo && coordSysInfo.coordSysDims) {
    coordSysDimDefs = zrUtil.map(coordSysInfo.coordSysDims, function (dim) {
      const dimInfo = {
        name: dim,
      } as DimensionDefinition
      const axisModel = coordSysInfo.axisMap.get(dim)
      if (axisModel) {
        const axisType = axisModel.get('type')
        dimInfo.type = getDimensionTypeByAxis(axisType)
      }
      return dimInfo
    })
  }

  if (!coordSysDimDefs) {
    coordSysDimDefs = (registeredCoordSys &&
      (registeredCoordSys.getDimensionsInfo
        ? registeredCoordSys.getDimensionsInfo()
        : registeredCoordSys.dimensions.slice())) || ['x', 'y']
  }

  return coordSysDimDefs
}

export function createSeriesData(
  sourceRaw: OptionSourceData | null | undefined,
  seriesModel: SeriesModel,
  opt?: {
    generateCoord?: string
    useEncodeDefaulter?: boolean | EncodeDefaulter
    // By default: auto. If `true`, create inverted indices for all ordinal dimension on coordSys.
    createInvertedIndices?: boolean
  }
) {
  opt = opt || {}
  const sourceManager = seriesModel.getSourceManager()
  let source
  let isOriginalSource = false
  if (sourceRaw) {
    isOriginalSource = true
    source = createSourceFromSeriesDataOption(sourceRaw)
  } else {
    source = sourceManager.getSource()
    // Is series.data. not dataset.
    isOriginalSource = source.sourceFormat === SOURCE_FORMAT_ORIGINAL
  }

  const coordSysInfo = getCoordSysInfoBySeries(seriesModel)
  const coordSysDimDefs = getCoordSysDimDefs(seriesModel, coordSysInfo)
  const useEncodeDefaulter = opt.useEncodeDefaulter
  const encodeDefaulter = zrUtil.isFunction(useEncodeDefaulter)
    ? useEncodeDefaulter
    : useEncodeDefaulter
    ? zrUtil.curry(
        makeSeriesEncodeForAxisCoordSys,
        coordSysDimDefs,
        seriesModel
      )
    : null
  const createDimensionOptions = {
    coordDimensions: coordSysDimDefs,  
    generateCoord: opt.generateCoord,
    encodeDefine: seriesModel.getEncode(),
    encodeDefaulter: encodeDefaulter,
    canOmitUnusedDimensions: !isOriginalSource,
  }
  const schema = prepareSeriesDataSchema(source, createDimensionOptions)
  const firstCategoryDimIndex = injectOrdinalMeta(
    schema?.dimensions,
    opt.createInvertedIndices,
    coordSysInfo
  )

  const store = !isOriginalSource
    ? sourceManager.getSharedDataStore(schema)
    : null

  const stackCalculationInfo = enableDataStack(seriesModel, { schema, store })
  const data = new SeriesData(schema, seriesModel)
  data.setCalculationInfo(stackCalculationInfo)

  const dimValueGetter =
    firstCategoryDimIndex != null && isNeedCompleteOrdinalData(source)
      ? function (
          this: DataStore,
          itemOpt: any,
          dimName: string,
          dataIndex: number,
          dimIndex: number
        ) {
          // Use dataIndex as ordinal value in categoryAxis
          return dimIndex === firstCategoryDimIndex
            ? dataIndex
            : this.defaultDimValueGetter(itemOpt, dimName, dataIndex, dimIndex)
        }
      : null

  data.hasItemOption = false
  data.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    isOriginalSource ? source : store,
    null,
    dimValueGetter
  )
  return data
}

function injectOrdinalMeta(
  dimInfoList: SeriesDimensionDefine[],
  createInvertedIndices: boolean,
  coordSysInfo: ReturnType<typeof getCoordSysInfoBySeries>
) {
  let firstCategoryDimIndex: number
  let hasNameEncode: boolean
  coordSysInfo &&
    zrUtil.each(dimInfoList, function (dimInfo, dimIndex) {
      const coordDim = dimInfo.coordDim
      const categoryAxisModel = coordSysInfo.categoryAxisMap.get(coordDim)
      if (categoryAxisModel) {
        if (firstCategoryDimIndex == null) {
          firstCategoryDimIndex = dimIndex
        }
        dimInfo.ordinalMeta = categoryAxisModel.getOrdinalMeta()
        if (createInvertedIndices) {
          dimInfo.createInvertedIndices = true
        }
      }
      if (dimInfo.otherDims.itemName != null) {
        hasNameEncode = true
      }
    })
  if (!hasNameEncode && firstCategoryDimIndex != null) {
    dimInfoList[firstCategoryDimIndex].otherDims.itemName = 0
  }
  return firstCategoryDimIndex
}

function isNeedCompleteOrdinalData(source: Source) {
  if (source.sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    const sampleItem = firstDataNotNull((source.data as ArrayLike<any>) || [])
    return !zrUtil.isArray(getDataItemValue(sampleItem))
  }
}
function firstDataNotNull(arr: ArrayLike<any>) {
  let i = 0
  while (i < arr.length && arr[i] == null) {
    i++
  }
  return arr[i]
}
