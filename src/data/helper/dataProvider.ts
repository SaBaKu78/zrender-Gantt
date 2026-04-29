import { ArrayLike } from 'zrender/src/core/types'
import {
  Dictionary,
  DimensionIndex,
  DimensionName,
  OptionDataItem,
  OptionDataValue,
  OptionSourceData,
  ParsedValue,
  SERIES_LAYOUT_BY_COLUMN,
  SERIES_LAYOUT_BY_ROW,
  SeriesLayoutBy,
  SOURCE_FORMAT_ARRAY_ROWS,
  SOURCE_FORMAT_KEYED_COLUMNS,
  SOURCE_FORMAT_OBJECT_ROWS,
  SOURCE_FORMAT_ORIGINAL,
  SOURCE_FORMAT_TYPED_ARRAY,
  SourceFormat,
} from '../../util/types'
import { getDataItemValue } from '../../util/model'
import {
  createSourceFromSeriesDataOption,
  isSourceInstance,
  Source,
} from '../Source'
import { bind, each, extend } from 'zrender/lib/core/util'

type RawSourceItemGetter = (
  rawData: OptionSourceData,
  startIndex: number,
  dimsDef: { name?: DimensionName }[],
  idx: number,
  // Only used in SOURCE_FORMAT_ARRAY_ROWS + '_' + SERIES_LAYOUT_BY_ROW and SOURCE_FORMAT_KEYED_COLUMNS
  // to avoid create a new [] if `out` is provided.
  out?: ArrayLike<OptionDataValue>
) => OptionDataItem | ArrayLike<OptionDataValue>

const getItemSimply: RawSourceItemGetter = function (
  rawData,
  startIndex,
  dimsDef,
  idx
): OptionDataItem {
  return (rawData as [])[idx]
}

const rawSourceItemGetterMap: Dictionary<RawSourceItemGetter> = {
  [SOURCE_FORMAT_ARRAY_ROWS + '_' + SERIES_LAYOUT_BY_COLUMN]: function (
    rawData,
    startIndex,
    dimsDef,
    idx
  ) {
    return (rawData as OptionDataValue[][])[idx + startIndex]
  },
  [SOURCE_FORMAT_ARRAY_ROWS + '_' + SERIES_LAYOUT_BY_ROW]: function (
    rawData,
    startIndex,
    dimsDef,
    idx,
    out
  ) {
    idx += startIndex
    const item = out || []
    const data = rawData as OptionDataValue[][]
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      item[i] = row ? row[idx] : null
    }
    return item
  },
  [SOURCE_FORMAT_OBJECT_ROWS]: getItemSimply,
  [SOURCE_FORMAT_KEYED_COLUMNS]: function (
    rawData,
    startIndex,
    dimsDef,
    idx,
    out
  ) {
    const item = out || []
    for (let i = 0; i < dimsDef.length; i++) {
      const dimName = dimsDef[i].name
      const col = (rawData as Dictionary<OptionDataValue[]>)[dimName]
      item[i] = col ? col[idx] : null
    }
    return item
  },
  [SOURCE_FORMAT_ORIGINAL]: getItemSimply,
}

function getMethodMapKey(
  sourceFormat: SourceFormat,
  seriesLayoutBy: SeriesLayoutBy
): string {
  return sourceFormat === SOURCE_FORMAT_ARRAY_ROWS
    ? sourceFormat + '_' + seriesLayoutBy
    : sourceFormat
}

export function getRawSourceItemGetter(
  sourceFormat: SourceFormat,
  seriesLayoutBy: SeriesLayoutBy
): RawSourceItemGetter {
  const method =
    rawSourceItemGetterMap[getMethodMapKey(sourceFormat, seriesLayoutBy)]
  return method
}

type RawSourceDataCounter = (
  rawData: OptionSourceData,
  startIndex: number,
  dimsDef: { name?: DimensionName }[]
) => number

export function getRawSourceDataCounter(
  sourceFormat: SourceFormat,
  seriesLayoutBy: SeriesLayoutBy
): RawSourceDataCounter {
  const method =
    rawSourceDataCounterMap[getMethodMapKey(sourceFormat, seriesLayoutBy)]
  return method
}

const countSimply: RawSourceDataCounter = function (
  rawData,
  startIndex,
  dimsDef
) {
  return (rawData as []).length
}

const rawSourceDataCounterMap: Dictionary<RawSourceDataCounter> = {
  [SOURCE_FORMAT_ARRAY_ROWS + '_' + SERIES_LAYOUT_BY_COLUMN]: function (
    rawData,
    startIndex,
    dimsDef
  ) {
    return Math.max(0, (rawData as OptionDataItem[][]).length - startIndex)
  },
  [SOURCE_FORMAT_ARRAY_ROWS + '_' + SERIES_LAYOUT_BY_ROW]: function (
    rawData,
    startIndex,
    dimsDef
  ) {
    const row = (rawData as OptionDataValue[][])[0]
    return row ? Math.max(0, row.length - startIndex) : 0
  },
  [SOURCE_FORMAT_OBJECT_ROWS]: countSimply,
  [SOURCE_FORMAT_KEYED_COLUMNS]: function (rawData, startIndex, dimsDef) {
    const dimName = dimsDef[0].name
    const col = (rawData as Dictionary<OptionDataValue[]>)[dimName]
    return col ? col.length : 0
  },
  [SOURCE_FORMAT_ORIGINAL]: countSimply,
}

type RawSourceValueGetter = (
  dataItem: OptionDataItem,
  dimIndex: DimensionIndex,
  property: DimensionName
) => OptionDataValue

const getRawValueSimply = function (
  dataItem: ArrayLike<OptionDataValue>,
  dimIndex: number,
  property: string
): OptionDataValue {
  return dataItem[dimIndex]
}

const rawSourceValueGetterMap: Partial<
  Record<SourceFormat, RawSourceValueGetter>
> = {
  [SOURCE_FORMAT_ARRAY_ROWS]: getRawValueSimply,

  [SOURCE_FORMAT_OBJECT_ROWS]: function (
    dataItem: Dictionary<OptionDataValue>,
    dimIndex: number,
    property: string
  ): OptionDataValue {
    return dataItem[property]
  },

  [SOURCE_FORMAT_KEYED_COLUMNS]: getRawValueSimply,

  [SOURCE_FORMAT_ORIGINAL]: function (
    dataItem: OptionDataItem,
    dimIndex: number,
    property: string
  ): OptionDataValue {
    // FIXME: In some case (markpoint in geo (geo-map.html)),
    // dataItem is {coord: [...]}
    const value = getDataItemValue(dataItem)
    return !(value instanceof Array) ? value : value[dimIndex]
  },

  [SOURCE_FORMAT_TYPED_ARRAY]: getRawValueSimply,
}

export function getRawSourceValueGetter(
  sourceFormat: SourceFormat
): RawSourceValueGetter {
  const method = rawSourceValueGetterMap[sourceFormat]
  return method
}

export interface DataProvider {
  pure?: boolean
  persistent?: boolean
  count(): number
  getItem(idx: number, out?: OptionDataItem): OptionDataItem
  getSource(): Source
  fillStorage?(
    start: number,
    end: number,
    out: ArrayLike<ParsedValue>[],
    extent: number[][]
  ): void
  clean?(): void
}

export interface DefaultDataProvider {
  fillStorage?(
    start: number,
    end: number,
    out: ArrayLike<ParsedValue>[],
    extent: number[][]
  ): void
}

let providerMethods: Dictionary<any>

let mountMethods: (
  provider: DefaultDataProvider,
  data: OptionSourceData,
  source: Source
) => void

export class DefaultDataProvider implements DataProvider {
  private _source: Source

  private _data: OptionSourceData
  private _offset: number

  private _dimSize: number

  constructor(sourceParam: Source | OptionSourceData, dimSize?: number) {
    const source: Source = !isSourceInstance(sourceParam)
      ? createSourceFromSeriesDataOption(sourceParam as OptionSourceData)
      : (sourceParam as Source)

    // declare source is Source;
    this._source = source
    const data = (this._data = source.data)
    if (source.sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {
      this._offset = 0
      this._dimSize = dimSize
      this._data = data
    }
    mountMethods(this, data, source)
  }

  count(): number {
    return 0
  }

  getItem(idx: number, out?: OptionDataItem): OptionDataItem {
    return
  }

  getSource(): Source {
    return this._source
  }

  private static internalField = (function () {
    mountMethods = function (provider, data, source) {
      const sourceFormat = source.sourceFormat
      const seriesLayoutBy = source.seriesLayoutBy
      const startIndex = source.startIndex
      const dimsDef = source.dimensionsDefine
      const methods =
        providerMethods[getMethodMapKey(sourceFormat, seriesLayoutBy)]
      extend(provider, methods)
      if (sourceFormat === SOURCE_FORMAT_TYPED_ARRAY) {
        provider.getItem = getItemForTypedArray
        provider.count = countForTypedArray
        provider.fillStorage = fillStorageForTypedArray
      } else {
        const rawItemGetter = getRawSourceItemGetter(
          sourceFormat,
          seriesLayoutBy
        )
        provider.getItem = bind(rawItemGetter, null, data, startIndex, dimsDef)
        const rawCounter = getRawSourceDataCounter(sourceFormat, seriesLayoutBy)
        provider.count = bind(rawCounter, null, data, startIndex, dimsDef)
      }
    }

    const getItemForTypedArray: DefaultDataProvider['getItem'] = function (
      this: DefaultDataProvider,
      idx: number,
      out: ArrayLike<number>
    ): ArrayLike<number> {
      idx = idx - this._offset
      out = out || []
      const data = this._data
      const dimSize = this._dimSize
      const offset = dimSize * idx
      for (let i = 0; i < dimSize; i++) {
        out[i] = (data as ArrayLike<number>)[offset + i]
      }
      return out
    }

    const fillStorageForTypedArray: DefaultDataProvider['fillStorage'] =
      function (
        this: DefaultDataProvider,
        start: number,
        end: number,
        storage: ArrayLike<ParsedValue>[],
        extent: number[][]
      ) {
        const data = this._data as ArrayLike<number>
        const dimSize = this._dimSize

        for (let dim = 0; dim < dimSize; dim++) {
          const dimExtent = extent[dim]
          let min = dimExtent[0] == null ? Infinity : dimExtent[0]
          let max = dimExtent[1] == null ? -Infinity : dimExtent[1]
          const count = end - start
          const arr = storage[dim]
          for (let i = 0; i < count; i++) {
            // appendData with TypedArray will always do replace in provider.
            const val = data[i * dimSize + dim]
            arr[start + i] = val
            val < min && (min = val)
            val > max && (max = val)
          }
          dimExtent[0] = min
          dimExtent[1] = max
        }
      }

    const countForTypedArray: DefaultDataProvider['count'] = function (
      this: DefaultDataProvider
    ) {
      return this._data
        ? (this._data as ArrayLike<number>).length / this._dimSize
        : 0
    }

    providerMethods = {
      [SOURCE_FORMAT_ARRAY_ROWS + '_' + SERIES_LAYOUT_BY_COLUMN]: {
        pure: true,
        appendData: appendDataSimply,
      },

      [SOURCE_FORMAT_ARRAY_ROWS + '_' + SERIES_LAYOUT_BY_ROW]: {
        pure: true,
        appendData: function () {
          throw new Error(
            'Do not support appendData when set seriesLayoutBy: "row".'
          )
        },
      },

      [SOURCE_FORMAT_OBJECT_ROWS]: {
        pure: true,
        appendData: appendDataSimply,
      },

      [SOURCE_FORMAT_KEYED_COLUMNS]: {
        pure: true,
        appendData: function (
          this: DefaultDataProvider,
          newData: Dictionary<OptionDataValue[]>
        ) {
          const data = this._data as Dictionary<OptionDataValue[]>
          each(newData, function (newCol, key) {
            const oldCol = data[key] || (data[key] = [])
            for (let i = 0; i < (newCol || []).length; i++) {
              oldCol.push(newCol[i])
            }
          })
        },
      },

      [SOURCE_FORMAT_ORIGINAL]: {
        appendData: appendDataSimply,
      },

      [SOURCE_FORMAT_TYPED_ARRAY]: {
        persistent: false,
        pure: true,
        appendData: function (
          this: DefaultDataProvider,
          newData: ArrayLike<number>
        ): void {
          this._data = newData
        },

        // Clean self if data is already used.
        clean: function (this: DefaultDataProvider): void {
          // PENDING
          this._offset += this.count()
          this._data = null
        },
      },
    }

    function appendDataSimply(
      this: DefaultDataProvider,
      newData: ArrayLike<OptionDataItem>
    ): void {
      for (let i = 0; i < newData.length; i++) {
        ;(this._data as any[]).push(newData[i])
      }
    }
  })()
}
