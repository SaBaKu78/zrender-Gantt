import { clone, createHashMap, keys, map, reduce } from 'zrender/src/core/util'
import {
  DataStoreDimensionType,
  DimensionIndex,
  DimensionName,
  OptionDataItem,
  ParsedValue,
  ParsedValueNumeric,
} from '../util/types'
import { DataProvider } from './helper/dataProvider'
import { shouldRetrieveDataByName } from './Source'
import { parseDataValue } from './helper/dataValueHelper'
import OrdinalMeta from './OrdinalMeta'

const UNDEFINED = 'undefined'

export const CtorUint32Array =
  typeof Uint32Array === UNDEFINED ? Array : Uint32Array
export const CtorUint16Array =
  typeof Uint16Array === UNDEFINED ? Array : Uint16Array
export const CtorInt32Array =
  typeof Int32Array === UNDEFINED ? Array : Int32Array
export const CtorFloat64Array =
  typeof Float64Array === UNDEFINED ? Array : Float64Array

/**
 * Multi dimensional data store
 */
const dataCtors = {
  float: CtorFloat64Array,
  int: CtorInt32Array,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: CtorFloat64Array,
} as const

type DataValueChunk = ArrayLike<ParsedValue>
type DataTypedArray = Uint32Array | Int32Array | Uint16Array | Float64Array

type DataTypedArrayConstructor =
  | typeof Uint32Array
  | typeof Int32Array
  | typeof Uint16Array
  | typeof Float64Array
type DataArrayLikeConstructor = typeof Array | DataTypedArrayConstructor

type EachCb0 = (idx: number) => void
type EachCb1 = (x: ParsedValue, idx: number) => void
type EachCb2 = (x: ParsedValue, y: ParsedValue, idx: number) => void
type EachCb = (...args: any) => void
type FilterCb0 = (idx: number) => boolean
type FilterCb1 = (x: ParsedValue, idx: number) => boolean
type FilterCb = (...args: any) => boolean

type MapCb = (...args: any) => ParsedValue | ParsedValue[]

export type DimValueGetter = (
  this: DataStore,
  dataItem: any,
  property: string,
  dataIndex: number,
  dimIndex: DimensionIndex
) => ParsedValue

export interface DataStoreDimensionDefine {
  type?: DataStoreDimensionType
  property?: string
  ordinalMeta?: OrdinalMeta
  ordinalOffset?: number
}

let defaultDimValueGetters: { [sourceFormat: string]: DimValueGetter }

class DataStore {
  private _chunks: DataValueChunk[] = []
  private _count: number = 0
  private _rawCount: number = 0
  private _provider: DataProvider
  private _rawExtent: [number, number][] = []
  private _extent: [number, number][] = []
  private _dimensions: DataStoreDimensionDefine[]

  private _indices: ArrayLike<any>

  private _calcDimNameToIdx = createHashMap<DimensionIndex, DimensionName>()

  private _dimValueGetter: DimValueGetter

  defaultDimValueGetter: DimValueGetter

  initData(
    provider: DataProvider,
    inputDimensions: DataStoreDimensionDefine[],
    dimValueGetter?: DimValueGetter
  ): void {
    this._provider = provider

    //清状态
    this._chunks = []
    this._indices = null
    this.getRawIndex = this._getRawIdxIdentity

    const source = provider.getSource()
    const defaultGetter = (this.defaultDimValueGetter =
      defaultDimValueGetters[source.sourceFormat])
    // Default dim value getter
    this._dimValueGetter = dimValueGetter || defaultGetter
    // Reset raw extent.
    this._rawExtent = []
    const willRetrieveDataByName = shouldRetrieveDataByName(source)
    this._dimensions = map(inputDimensions, (dim) => {
      return {
        type: dim.type,
        property: dim.property,
      }
    })
    this._initDataFromProvider(0, provider.count())
  }

  count(): number {
    return this._count
  }

  get(dim: DimensionIndex, idx: number): ParsedValue {
    if (!(idx >= 0 && idx < this._count)) {
      return NaN
    }
    const dimStore = this._chunks[dim]
    return dimStore ? dimStore[this.getRawIndex(idx)] : NaN
  }

  private _getRawIdxIdentity(idx: number): number {
    return idx
  }

  private _getRawIdx(idx: number): number {
    if (idx < this._count && idx >= 0) {
      return this._indices[idx]
    }
    return -1
  }

  private _updateGetRawIdx(): void {
    this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity
  }
  private _initDataFromProvider(
    start: number,
    end: number,
    append?: boolean
  ): void {
    const provider = this._provider
    const chunks = this._chunks
    const dimensions = this._dimensions
    const dimLen = dimensions.length
    const rawExtent = this._rawExtent
    const dimNames = map(dimensions, (dim) => dim.property)
    for (let i = 0; i < dimLen; i++) {
      const dim = dimensions[i]
      if (!rawExtent[i]) {
        rawExtent[i] = getInitialExtent()
      }
      prepareStore(chunks, i, dim.type, end, append)
    }
    if (provider.fillStorage) {
      provider.fillStorage(start, end, chunks, rawExtent)
    } else {
      let dataItem = [] as OptionDataItem
      for (let idx = start; idx < end; idx++) {
        // NOTICE: Try not to write things into dataItem
        dataItem = provider.getItem(idx, dataItem)
        // Each data item is value
        // [1, 2]
        // 2
        // Bar chart, line chart which uses category axis
        // only gives the 'y' value. 'x' value is the indices of category
        // Use a tempValue to normalize the value to be a (x, y) value

        // Store the data by dimensions
        for (let dimIdx = 0; dimIdx < dimLen; dimIdx++) {
          const dimStorage = chunks[dimIdx]
          // PENDING NULL is empty or zero
          const val = this._dimValueGetter(
            dataItem,
            dimNames[dimIdx],
            idx,
            dimIdx
          ) as ParsedValueNumeric
          ;(dimStorage as ParsedValue[])[idx] = val

          const dimRawExtent = rawExtent[dimIdx]
          val < dimRawExtent[0] && (dimRawExtent[0] = val)
          val > dimRawExtent[1] && (dimRawExtent[1] = val)
        }
      }
    }
    if (!provider.persistent && provider.clean) {
      // Clean unused data if data source is typed array.
      provider.clean()
    }

    this._rawCount = this._count = end
    // Reset data extent
    this._extent = []
  }

  each(dims: DimensionIndex[], cb: EachCb): void {
    if (!this._count) {
      return
    }
    const dimSize = dims.length
    const chunks = this._chunks

    for (let i = 0, len = this.count(); i < len; i++) {
      const rawIdx = this.getRawIndex(i)
      // Simple optimization
      switch (dimSize) {
        case 0:
          ;(cb as EachCb0)(i)
          break
        case 1:
          ;(cb as EachCb1)(chunks[dims[0]][rawIdx], i)
          break
        case 2:
          ;(cb as EachCb2)(chunks[dims[0]][rawIdx], chunks[dims[1]][rawIdx], i)
          break
        default:
          let k = 0
          const value = []
          for (; k < dimSize; k++) {
            value[k] = chunks[dims[k]][rawIdx]
          }
          // Index
          value[k] = i
          ;(cb as EachCb).apply(null, value)
      }
    }
  }

  getDataExtent(dim: DimensionIndex): [number, number] {
    // Make sure use concrete dim as cache name.
    const dimData = this._chunks[dim]
    const initialExtent = getInitialExtent()
    if (!dimData) {
      return initialExtent
    }

    // Make more strict checkings to ensure hitting cache.
    const currEnd = this.count()

    const useRaw = !this._indices
    let dimExtent: [number, number]
    if (useRaw) {
      return this._rawExtent[dim].slice() as [number, number]
    }
    dimExtent = this._extent[dim]
    if (dimExtent) {
      return dimExtent.slice() as [number, number]
    }
    dimExtent = initialExtent

    let min = dimExtent[0]
    let max = dimExtent[1]

    for (let i = 0; i < currEnd; i++) {
      const rawIdx = this.getRawIndex(i)
      const value = dimData[rawIdx] as ParsedValueNumeric
      value < min && (min = value)
      value > max && (max = value)
    }

    dimExtent = [min, max]

    this._extent[dim] = dimExtent

    return dimExtent
  }

  getRawIndex: (idx: number) => number

  getProvider(): DataProvider {
    return this._provider
  }

  ensureCalculationDimension(
    dimName: DimensionName,
    type: DataStoreDimensionType
  ): DimensionIndex {
    const calcDimNameToIdx = this._calcDimNameToIdx
    const dimensions = this._dimensions

    let calcDimIdx = calcDimNameToIdx.get(dimName)
    if (calcDimIdx != null) {
      if (dimensions[calcDimIdx].type === type) {
        return calcDimIdx
      }
    } else {
      calcDimIdx = dimensions.length
    }

    dimensions[calcDimIdx] = { type: type }
    calcDimNameToIdx.set(dimName, calcDimIdx)

    this._chunks[calcDimIdx] = new dataCtors[type || 'float'](this._rawCount)
    this._rawExtent[calcDimIdx] = getInitialExtent()
    return calcDimIdx
  }

  getRawDataItem(idx: number): OptionDataItem {
    const rawIdx = this.getRawIndex(idx)
    if (!this._provider.persistent) {
      const val = []
      const chunks = this._chunks
      for (let i = 0; i < chunks?.length; i++) {
        val.push(chunks[i][rawIdx])
      }
      return val
    } else {
      return this._provider.getItem(rawIdx)
    }
  }

  clone(clonedDims?: DimensionIndex[], ignoreIndices?: boolean): DataStore {
    const target = new DataStore()
    const chunks = this._chunks
    const clonedDimsMap =
      clonedDims &&
      reduce(
        clonedDims,
        (obj, dimIdx) => {
          obj[dimIdx] = true
          return obj
        },
        {} as Record<DimensionIndex, boolean>
      )

    if (clonedDimsMap) {
      for (let i = 0; i < chunks.length; i++) {
        // Not clone if dim is not picked.
        target._chunks[i] = !clonedDimsMap[i]
          ? chunks[i]
          : cloneChunk(chunks[i])
      }
    } else {
      target._chunks = chunks
    }
    this._copyCommonProps(target)

    if (!ignoreIndices) {
      target._indices = this._cloneIndices()
    }
    target._updateGetRawIdx()
    return target
  }

  private _copyCommonProps(target: DataStore): void {
    target._count = this._count
    target._rawCount = this._rawCount
    target._provider = this._provider
    target._dimensions = this._dimensions

    target._extent = clone(this._extent)
    target._rawExtent = clone(this._rawExtent)
  }

  private _cloneIndices(): DataStore['_indices'] {
    if (this._indices) {
      const Ctor = this._indices.constructor as DataArrayLikeConstructor
      let indices
      if (Ctor === Array) {
        const thisCount = this._indices.length
        indices = new Ctor(thisCount)
        for (let i = 0; i < thisCount; i++) {
          indices[i] = this._indices[i]
        }
      } else {
        indices = new (Ctor as DataTypedArrayConstructor)(this._indices)
      }
      return indices
    }
    return null
  }

  /**
   * Retrieve the index with given raw data index.
   */
  indexOfRawIndex(rawIndex: number): number {
    if (rawIndex >= this._rawCount || rawIndex < 0) {
      return -1
    }

    if (!this._indices) {
      return rawIndex
    }

    // Indices are ascending
    const indices = this._indices

    // If rawIndex === dataIndex
    const rawDataIndex = indices[rawIndex]
    if (
      rawDataIndex != null &&
      rawDataIndex < this._count &&
      rawDataIndex === rawIndex
    ) {
      return rawIndex
    }

    let left = 0
    let right = this._count - 1
    while (left <= right) {
      const mid = ((left + right) / 2) | 0
      if (indices[mid] < rawIndex) {
        left = mid + 1
      } else if (indices[mid] > rawIndex) {
        right = mid - 1
      } else {
        return mid
      }
    }
    return -1
  }

  getIndices(): ArrayLike<number> {
    let newIndices
    const indices = this._indices

    if (indices) {
      const Ctor = indices.constructor as DataArrayLikeConstructor
      const thisCount = this._count
      if (Ctor === Array) {
        newIndices = new Ctor(thisCount)
        for (let i = 0; i < thisCount; i++) {
          newIndices[i] = indices[i]
        }
      } else {
        newIndices = new (Ctor as DataTypedArrayConstructor)(
          (indices as DataTypedArray)?.buffer,
          0,
          thisCount
        )
      }
    } else {
      const Ctor = getIndicesCtor(this._rawCount)
      newIndices = new Ctor(this.count())
      for (let i = 0; i < newIndices.length; i++) {
        newIndices[i] = i
      }
    }
    return newIndices
  }

  filter(dims: DimensionIndex[], cb: FilterCb): DataStore {
    if (!this._count) {
      return this
    }

    const newStore = this.clone()
    const count = newStore.count()
    const Ctor = getIndicesCtor(newStore._rawCount)
    const newIndices = new Ctor(count)
    const value = []
    const dimSize = dims.length
    let offset = 0
    const dim0 = dims[0]
    const chunks = newStore._chunks

    for (let i = 0; i < count; i++) {
      let keep
      const rawIdx = newStore.getRawIndex(i)
      // Simple optimization
      if (dimSize === 0) {
        keep = (cb as FilterCb0)(i)
      } else if (dimSize === 1) {
        const val = chunks[dim0][rawIdx]
        keep = (cb as FilterCb1)(val, i)
      } else {
        let k = 0
        for (; k < dimSize; k++) {
          value[k] = chunks[dims[k]][rawIdx]
        }
        value[k] = i
        keep = (cb as FilterCb).apply(null, value)
      }
      if (keep) {
        newIndices[offset++] = rawIdx
      }
    }

    // Set indices after filtered.
    if (offset < count) {
      newStore._indices = newIndices
    }
    newStore._count = offset
    // Reset data extent
    newStore._extent = []

    newStore._updateGetRawIdx()

    return newStore
  }

  selectRange(range: { [dimIdx: number]: [number, number] }): DataStore {
    const newStore = this.clone()

    const len = newStore._count

    if (!len) {
      return this
    }

    const dims = keys(range)
    const dimSize = dims.length
    if (!dimSize) {
      return this
    }
 
    const originalCount = newStore.count()
    const Ctor = getIndicesCtor(newStore._rawCount)
    const newIndices = new Ctor(originalCount)
    let offset = 0
    const dim0 = dims[0]

    const min = range[dim0][0]
    const max = range[dim0][1]
    const storeArr = newStore._chunks
    let quickFinished = false
    if (!newStore._indices) {
      // Extreme optimization for common case. About 2x faster in chrome.
      let idx = 0
      if (dimSize === 1) {
        const dimStorage = storeArr[dims[0]]
        for (let i = 0; i < len; i++) {
          const val = <number>dimStorage[i]
          // NaN will not be filtered. Consider the case, in line chart, empty
          // value indicates the line should be broken. But for the case like
          // scatter plot, a data item with empty value will not be rendered,
          // but the axis extent may be effected if some other dim of the data
          // item has value. Fortunately it is not a significant negative effect.
          if ((val >= min && val <= max) || isNaN(val as any)) {
            newIndices[offset++] = idx
          }
          idx++
        }
        quickFinished = true
      } else if (dimSize === 2) {
        const dimStorage = storeArr[dims[0]]
        const dimStorage2 = storeArr[dims[1]]
        const min2 = range[dims[1]][0]
        const max2 = range[dims[1]][1]
        for (let i = 0; i < len; i++) {
          const val = <number>dimStorage[i]
          const val2 = <number>dimStorage2[i]
          // Do not filter NaN, see comment above.
          if (
            ((val >= min && val <= max) || isNaN(val as any)) &&
            ((val2 >= min2 && val2 <= max2) || isNaN(val2 as any))
          ) {
            newIndices[offset++] = idx
          }
          idx++
        }
        quickFinished = true
      }
    }
    if (!quickFinished) {
      if (dimSize === 1) {
        for (let i = 0; i < originalCount; i++) {
          const rawIndex = newStore.getRawIndex(i)
          const val = <number>storeArr[dims[0]][rawIndex]
          // Do not filter NaN, see comment above.
          if ((val >= min && val <= max) || isNaN(val as any)) {
            newIndices[offset++] = rawIndex
          }
        }
      } else {
        for (let i = 0; i < originalCount; i++) {
          let keep = true
          const rawIndex = newStore.getRawIndex(i)
          for (let k = 0; k < dimSize; k++) {
            const dimk = dims[k]
            const val = <number>storeArr[dimk][rawIndex]
            // Do not filter NaN, see comment above.
            if (val < range[dimk][0] || val > range[dimk][1]) {
              keep = false
            }
          }
          if (keep) {
            newIndices[offset++] = newStore.getRawIndex(i)
          }
        }
      }
    }

    // Set indices after filtered.
    if (offset < originalCount) {
      newStore._indices = newIndices
    }
    newStore._count = offset
    // Reset data extent
    newStore._extent = []

    newStore._updateGetRawIdx()

    return newStore
  }

  map(dims: DimensionIndex[], cb: MapCb): DataStore {
    // TODO only clone picked chunks.
    const target = this.clone(dims)
    this._updateDims(target, dims, cb)
    return target
  }

  private _updateDims(target: DataStore, dims: DimensionIndex[], cb: MapCb) {
    const targetChunks = target._chunks

    const tmpRetValue = []
    const dimSize = dims.length
    const dataCount = target.count()
    const values = []
    const rawExtent = target._rawExtent

    for (let i = 0; i < dims.length; i++) {
      rawExtent[dims[i]] = getInitialExtent()
    }

    for (let dataIndex = 0; dataIndex < dataCount; dataIndex++) {
      const rawIndex = target.getRawIndex(dataIndex)

      for (let k = 0; k < dimSize; k++) {
        values[k] = targetChunks[dims[k]][rawIndex]
      }
      values[dimSize] = dataIndex

      let retValue = cb && cb.apply(null, values)
      if (retValue != null) {
        // a number or string (in oridinal dimension)?
        if (typeof retValue !== 'object') {
          tmpRetValue[0] = retValue
          retValue = tmpRetValue
        }

        for (let i = 0; i < retValue.length; i++) {
          const dim = dims[i]
          const val = retValue[i]
          const rawExtentOnDim = rawExtent[dim]

          const dimStore = targetChunks[dim]
          if (dimStore) {
            ;(dimStore as ParsedValue[])[rawIndex] = val
          }

          if (val < rawExtentOnDim[0]) {
            rawExtentOnDim[0] = val as number
          }
          if (val > rawExtentOnDim[1]) {
            rawExtentOnDim[1] = val as number
          }
        }
      }
    }
  }

  getOrdinalMeta(dimIdx: number): OrdinalMeta {
    const dimInfo = this._dimensions[dimIdx]
    const ordinalMeta = dimInfo.ordinalMeta
    return ordinalMeta
  }

  collectOrdinalMeta(dimIdx: number, ordinalMeta: OrdinalMeta): void {
    const chunk = this._chunks[dimIdx]
    const dim = this._dimensions[dimIdx]
    const rawExtents = this._rawExtent

    const offset = dim.ordinalOffset || 0
    const len = chunk.length

    if (offset === 0) {
      // We need to reset the rawExtent if collect is from start.
      // Because this dimension may be guessed as number and calcuating a wrong extent.
      rawExtents[dimIdx] = getInitialExtent()
    }

    const dimRawExtent = rawExtents[dimIdx]

    // Parse from previous data offset. len may be changed after appendData
    for (let i = offset; i < len; i++) {
      const val = ((chunk as any)[i] = ordinalMeta.parseAndCollect(chunk[i]))
      if (!isNaN(val)) {
        dimRawExtent[0] = Math.min(val, dimRawExtent[0])
        dimRawExtent[1] = Math.max(val, dimRawExtent[1])
      }
    }

    dim.ordinalMeta = ordinalMeta
    dim.ordinalOffset = len
    dim.type = 'ordinal' // Force to be ordinal
  }
  private internalField = (function () {
    function getDimValueSimply(
      this: DataStore,
      dataItem: any,
      property: string,
      dataIndex: number,
      dimIndex: number
    ): ParsedValue {
      return parseDataValue(dataItem[dimIndex], this._dimensions[dimIndex])
    }

    defaultDimValueGetters = {
      arrayRows: getDimValueSimply,

      objectRows(
        this: DataStore,
        dataItem: any,
        property: string,
        dataIndex: number,
        dimIndex: number
      ): ParsedValue {
        return parseDataValue(dataItem[property], this._dimensions[dimIndex])
      },

      keyedColumns: getDimValueSimply,

      original(
        this: DataStore,
        dataItem: any,
        property: string,
        dataIndex: number,
        dimIndex: number
      ): ParsedValue {
        // Performance sensitive, do not use modelUtil.getDataItemValue.
        // If dataItem is an plain object with no value field, the let `value`
        // will be assigned with the object, but it will be tread correctly
        // in the `convertValue`.
        const value =
          dataItem && (dataItem.value == null ? dataItem : dataItem.value)

        return parseDataValue(
          value instanceof Array
            ? value[dimIndex]
            : // If value is a single number or something else not array.
              value,
          this._dimensions[dimIndex]
        )
      },

      typedArray: function (
        this: DataStore,
        dataItem: any,
        property: string,
        dataIndex: number,
        dimIndex: number
      ): ParsedValue {
        return dataItem[dimIndex]
      },
    }
  })()
}

function cloneChunk(originalChunk: DataValueChunk): DataValueChunk {
  const Ctor = originalChunk.constructor
  // Only shallow clone is enough when Array.
  return Ctor === Array
    ? (originalChunk as Array<ParsedValue>).slice()
    : new (Ctor as DataTypedArrayConstructor)(originalChunk as DataTypedArray)
}

function prepareStore(
  store: DataValueChunk[],
  dimIdx: number,
  dimType: DataStoreDimensionType,
  end: number,
  append?: boolean
) {
  const DataCtor = dataCtors[dimType || 'float']
  if (append) {
    const oldStore = store[dimIdx]
    const oldLen = oldStore?.length
    if (!(oldLen === end)) {
      const newStore = new DataCtor(end)
      for (let i = 0; i < oldLen; i++) {
        newStore[i] = oldStore[i]
      }
      store[dimIdx] = newStore
    }
  } else {
    store[dimIdx] = new DataCtor(end)
  }
}

function getIndicesCtor(rawCount: number): DataArrayLikeConstructor {
  // The possible max value in this._indicies is always this._rawCount despite of filtering.
  return rawCount > 65535 ? CtorUint32Array : CtorUint16Array
}

function getInitialExtent(): [number, number] {
  return [Infinity, -Infinity]
}

export default DataStore
