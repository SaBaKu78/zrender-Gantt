import {
  isArray,
  isObject,
  isString,
  isTypedArray,
} from 'zrender/src/core/util'
import { DatasetModel } from '../../component/dataset/DatasetModel'
import {
  getDataItemValue,
  makeInner,
  queryReferringComponents,
  SINGLE_REFERRING,
} from '../../util/model'
import {
  DimensionIndex,
  DimensionName,
  OptionDataValue,
  OptionEncode,
  OptionSourceDataArrayRows,
  OptionSourceDataKeyedColumns,
  OptionSourceDataObjectRows,
  OptionSourceDataOriginal,
  SERIES_LAYOUT_BY_ROW,
  SeriesEncodableModel,
  SOURCE_FORMAT_ARRAY_ROWS,
  SOURCE_FORMAT_KEYED_COLUMNS,
  SOURCE_FORMAT_OBJECT_ROWS,
  SOURCE_FORMAT_ORIGINAL,
} from '../../util/types'
import { Source } from '../Source'
import { CoordDimensionDefinition } from './createDimensions'
import SeriesModel from '../../model/Series'
import { each, HashMap } from 'zrender/lib/core/util'
import GlobalModel from '../../model/Global'

export const BE_ORDINAL = {
  Must: 1, // Encounter string but not '-' and not number-like.
  Might: 2, // Encounter string but number-like.
  Not: 3, // Other cases
}

const innerGlobalModel = makeInner<
  {
    datasetMap: HashMap<DatasetRecord, string>
  },
  GlobalModel
>()

interface DatasetRecord {
  categoryWayDim: number
  valueWayDim: number
}

type BeOrdinalValue = (typeof BE_ORDINAL)[keyof typeof BE_ORDINAL]

type SeriesEncodeInternal = {
  [key in keyof OptionEncode]: DimensionIndex[]
}

export function querySeriesUpstreamDatasetModel(
  seriesModel: SeriesEncodableModel
): DatasetModel {
  const thisData = seriesModel.get('data', true)
  if (!thisData) {
    return queryReferringComponents(
      seriesModel.piModel,
      'dataset',
      {
        index: seriesModel.get('datasetIndex', true),
        id: seriesModel.get('datasetId', true),
      },
      SINGLE_REFERRING
    ).models[0] as DatasetModel
  }
}

export function querySeriesUpstreamDatasetModels(
  datasetModel: DatasetModel
): DatasetModel[] {
  if (
    !datasetModel.get('transform', true) &&
    !datasetModel.get('fromTransformResult', true)
  ) {
    return []
  }
  return queryReferringComponents(
    datasetModel.piModel,
    'dataset',
    {
      index: datasetModel.get('fromDatasetIndex', true),
      id: datasetModel.get('fromDatasetId', true),
    },
    SINGLE_REFERRING
  ).models as DatasetModel[]
}

export function guessOrdinal(
  source: Source,
  dimIndex: DimensionIndex
): BeOrdinalValue {
  return doGuessOrdinal(
    source.data,
    source.sourceFormat,
    source.seriesLayoutBy,
    source.dimensionsDefine,
    source.startIndex,
    dimIndex
  )
}

function doGuessOrdinal(
  data: Source['data'],
  sourceFormat: Source['sourceFormat'],
  seriesLayoutBy: Source['seriesLayoutBy'],
  dimensionsDefine: Source['dimensionsDefine'],
  startIndex: Source['startIndex'],
  dimIndex: DimensionIndex
): BeOrdinalValue {
  let result
  // Experience value.
  const maxLoop = 5

  if (isTypedArray(data)) {
    return BE_ORDINAL.Not
  }

  // When sourceType is 'objectRows' or 'keyedColumns', dimensionsDefine
  // always exists in source.
  let dimName
  let dimType
  if (dimensionsDefine) {
    const dimDefItem = dimensionsDefine[dimIndex]
    if (isObject(dimDefItem)) {
      dimName = dimDefItem.name
      dimType = dimDefItem.type
    } else if (isString(dimDefItem)) {
      dimName = dimDefItem
    }
  }

  if (dimType != null) {
    return dimType === 'ordinal' ? BE_ORDINAL.Must : BE_ORDINAL.Not
  }

  if (sourceFormat === SOURCE_FORMAT_ARRAY_ROWS) {
    const dataArrayRows = data as OptionSourceDataArrayRows
    if (seriesLayoutBy === SERIES_LAYOUT_BY_ROW) {
      const sample = dataArrayRows[dimIndex]
      for (let i = 0; i < (sample || []).length && i < maxLoop; i++) {
        if ((result = detectValue(sample[startIndex + i])) != null) {
          return result
        }
      }
    } else {
      for (let i = 0; i < dataArrayRows.length && i < maxLoop; i++) {
        const row = dataArrayRows[startIndex + i]
        if (row && (result = detectValue(row[dimIndex])) != null) {
          return result
        }
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_OBJECT_ROWS) {
    const dataObjectRows = data as OptionSourceDataObjectRows
    if (!dimName) {
      return BE_ORDINAL.Not
    }
    for (let i = 0; i < dataObjectRows.length && i < maxLoop; i++) {
      const item = dataObjectRows[i]
      if (item && (result = detectValue(item[dimName])) != null) {
        return result
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_KEYED_COLUMNS) {
    const dataKeyedColumns = data as OptionSourceDataKeyedColumns
    if (!dimName) {
      return BE_ORDINAL.Not
    }
    const sample = dataKeyedColumns[dimName]
    if (!sample || isTypedArray(sample)) {
      return BE_ORDINAL.Not
    }
    for (let i = 0; i < sample.length && i < maxLoop; i++) {
      if ((result = detectValue(sample[i])) != null) {
        return result
      }
    }
  } else if (sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    const dataOriginal = data as OptionSourceDataOriginal
    for (let i = 0; i < dataOriginal.length && i < maxLoop; i++) {
      const item = dataOriginal[i]
      const val = getDataItemValue(item)
      if (!isArray(val)) {
        return BE_ORDINAL.Not
      }
      if ((result = detectValue(val[dimIndex])) != null) {
        return result
      }
    }
  }

  function detectValue(val: OptionDataValue): BeOrdinalValue {
    const beStr = isString(val)
    // Consider usage convenience, '1', '2' will be treated as "number".
    // `isFinit('')` get `true`.
    if (val != null && isFinite(val as number) && val !== '') {
      return beStr ? BE_ORDINAL.Might : BE_ORDINAL.Not
    } else if (beStr && val !== '-') {
      return BE_ORDINAL.Must
    }
  }

  return BE_ORDINAL.Not
}

export function makeSeriesEncodeForAxisCoordSys(
  coordDimensions: (DimensionName | CoordDimensionDefinition)[],
  seriesModel: SeriesModel,
  source: Source
): SeriesEncodeInternal {
  const encode: SeriesEncodeInternal = {}

  const datasetModel = querySeriesUpstreamDatasetModel(seriesModel)
  // Currently only make default when using dataset, util more reqirements occur.
  if (!datasetModel || !coordDimensions) {
    return encode
  }

  const encodeItemName: DimensionIndex[] = []
  const encodeSeriesName: DimensionIndex[] = []

  const ecModel = seriesModel.piModel
  const datasetMap = innerGlobalModel(ecModel).datasetMap
  const key = datasetModel.uid + '_' + source.seriesLayoutBy

  let baseCategoryDimIndex: number
  let categoryWayValueDimStart
  coordDimensions = coordDimensions.slice()
  each(coordDimensions, function (coordDimInfoLoose, coordDimIdx) {
    const coordDimInfo: CoordDimensionDefinition = isObject(coordDimInfoLoose)
      ? coordDimInfoLoose
      : (coordDimensions[coordDimIdx] = {
          name: coordDimInfoLoose as DimensionName,
        })
    if (coordDimInfo.type === 'ordinal' && baseCategoryDimIndex == null) {
      baseCategoryDimIndex = coordDimIdx
      categoryWayValueDimStart = getDataDimCountOnCoordDim(coordDimInfo)
    }
    encode[coordDimInfo.name] = []
  })

  const datasetRecord =
    datasetMap.get(key) ||
    datasetMap.set(key, {
      categoryWayDim: categoryWayValueDimStart,
      valueWayDim: 0,
    })

  // TODO
  // Auto detect first time axis and do arrangement.
  each(
    coordDimensions,
    function (coordDimInfo: CoordDimensionDefinition, coordDimIdx) {
      const coordDimName = coordDimInfo.name
      const count = getDataDimCountOnCoordDim(coordDimInfo)

      // In value way.
      if (baseCategoryDimIndex == null) {
        const start = datasetRecord.valueWayDim
        pushDim(encode[coordDimName], start, count)
        pushDim(encodeSeriesName, start, count)
        datasetRecord.valueWayDim += count

        // ??? TODO give a better default series name rule?
        // especially when encode x y specified.
        // consider: when multiple series share one dimension
        // category axis, series name should better use
        // the other dimension name. On the other hand, use
        // both dimensions name.
      }
      // In category way, the first category axis.
      else if (baseCategoryDimIndex === coordDimIdx) {
        pushDim(encode[coordDimName], 0, count)
        pushDim(encodeItemName, 0, count)
      }
      // In category way, the other axis.
      else {
        const start = datasetRecord.categoryWayDim
        pushDim(encode[coordDimName], start, count)
        pushDim(encodeSeriesName, start, count)
        datasetRecord.categoryWayDim += count
      }
    }
  )

  function pushDim(
    dimIdxArr: DimensionIndex[],
    idxFrom: number,
    idxCount: number
  ) {
    for (let i = 0; i < idxCount; i++) {
      dimIdxArr.push(idxFrom + i)
    }
  }

  function getDataDimCountOnCoordDim(coordDimInfo: CoordDimensionDefinition) {
    const dimsDef = coordDimInfo.dimsDef
    return dimsDef ? dimsDef.length : 1
  }

  encodeItemName.length && (encode.itemName = encodeItemName)
  encodeSeriesName.length && (encode.seriesName = encodeSeriesName)

  return encode
}
