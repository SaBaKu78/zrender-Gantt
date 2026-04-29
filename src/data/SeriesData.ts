import { map } from 'zrender/src/core/util'
import Model from '../model/Model'
import {
  DecalObject,
  DimensionIndex,
  DimensionLoose,
  DimensionName,
  ModelOption,
  OptionDataItem,
  OptionSourceData,
  OrdinalNumber,
  OrdinalRawValue,
  ParsedValue,
  SeriesDataType,
  SOURCE_FORMAT_ORIGINAL,
  SOURCE_FORMAT_TYPED_ARRAY,
} from '../util/types'
import DataStore, {
  DataStoreDimensionDefine,
  DimValueGetter,
} from './DataStore'
import { isSeriesDataSchema, SeriesDataSchema } from './helper/SeriesDataSchema'
import SeriesDimensionDefine from './helper/SeriesDimensionDefine'
import { Dictionary, FunctionPropertyNames } from 'zrender/src/core/types'
import * as zrUtil from 'zrender/src/core/util'
import { DimensionSummary, summarizeDimensions } from './helper/dimensionHelper'
import { isSourceInstance, Source } from './Source'
import { DataProvider, DefaultDataProvider } from './helper/dataProvider'
import { PathStyleProps } from 'zrender/src/graphic/Path'
import DataDiffer from './DataDiffer'
import { setCommonPIData } from '../util/innerStore'
import { Element } from 'zrender'
import { convertOptionIdName, isDataItemOption } from '../util/model'

type SeriesDimensionName = DimensionName
type SeriesDimensionLoose = DimensionLoose
type SeriesDimensionDefineLoose = string | object | SeriesDimensionDefine
type NameRepeatCount = { [name: string]: number }

const CtorInt32Array = typeof Int32Array === 'undefined' ? Array : Int32Array

const ID_PREFIX = 'p\0\0'
const INDEX_NOT_FOUND = -1

type ItrParamDims = DimensionLoose | Array<DimensionLoose>

type CtxOrList<Ctx> = unknown extends Ctx ? SeriesData : Ctx
type EachCb<Ctx> = (this: CtxOrList<Ctx>, ...agrs: any) => void
type EachCb0<Ctx> = (this: CtxOrList<Ctx>, idx: number) => void
type EachCb1<Ctx> = (this: CtxOrList<Ctx>, x: ParsedValue, idx: number) => void
type EachCb2<Ctx> = (
  this: CtxOrList<Ctx>,
  x: ParsedValue,
  y: ParsedValue,
  idx: number
) => void
type FilterCb0<Ctx> = (this: CtxOrList<Ctx>, idx: number) => boolean
type FilterCb1<Ctx> = (
  this: CtxOrList<Ctx>,
  x: ParsedValue,
  idx: number
) => boolean
type FilterCb2<Ctx> = (
  this: CtxOrList<Ctx>,
  x: ParsedValue,
  y: ParsedValue,
  idx: number
) => boolean
type FilterCb<Ctx> = (this: CtxOrList<Ctx>, ...args: any) => boolean

type MapCb1<Ctx> = (
  this: CtxOrList<Ctx>,
  x: ParsedValue,
  idx: number
) => ParsedValue | ParsedValue[]
type MapCb2<Ctx> = (
  this: CtxOrList<Ctx>,
  x: ParsedValue,
  y: ParsedValue,
  idx: number
) => ParsedValue | ParsedValue[]
type MapCb<Ctx> = (
  this: CtxOrList<Ctx>,
  ...args: any
) => ParsedValue | ParsedValue[]

const TRANSFERABLE_PROPERTIES = [
  'hasItemOption',
  '_nameList',
  '_idList',
  '_invertedIndicesMap',
  '_dimSummary',
  'userOutput',
  '_rawData',
  '_dimValueGetter',
  '_nameDimIdx',
  '_idDimIdx',
  '_nameRepeatCount',
]

const CLONE_PROPERTIES = ['_approximateExtent']

export interface DataCalculationInfo<SERIES_MODEL> {
  stackedDimension: DimensionName
  stackedByDimension: DimensionName
  isStackedByIndex: boolean
  stackedOverDimension: DimensionName
  stackResultDimension: DimensionName
  stackedOnSeries?: SERIES_MODEL
}

export interface DefaultDataVisual {
  style: PathStyleProps
  // Draw type determined which prop should be set with encoded color.
  // It's only available on the global visual. Use getVisual('drawType') to access it.
  // It will be set in visual/style.ts module in the first priority.
  drawType: 'fill' | 'stroke'

  symbol?: string
  symbolSize?: number | number[]
  symbolRotate?: number
  symbolKeepAspect?: boolean
  symbolOffset?: string | number | (string | number)[]

  liftZ?: number
  // For legend.
  legendIcon?: string
  // legendLineStyle?: LineStyleProps

  // // visualMap will inject visualMeta data
  // visualMeta?: VisualMeta[]

  // If color is encoded from palette
  colorFromPalette?: boolean

  decal?: DecalObject
}

// --------------------------------
// 内部方法
// --------------------------------
let prepareInvertedIndex: (data: SeriesData) => void
let normalizeDimensions: (dimensions: ItrParamDims) => Array<DimensionLoose>
let getId: (data: SeriesData, rawIndex: number) => string
let getIdNameFromStore: (
  data: SeriesData,
  dimIdx: number,
  dataIdx: number
) => string
let transferProperties: (target: SeriesData, source: SeriesData) => void
let cloneListForMapAndSample: (original: SeriesData) => SeriesData
let makeIdFromName: (data: SeriesData, idx: number) => void

class SeriesData<
  HostModel extends Model = Model,
  Visual extends DefaultDataVisual = DefaultDataVisual
> {
  private _store: DataStore

  private _schema?: SeriesDataSchema

  readonly hostModel: HostModel

  /**
   * @readonly
   */
  dataType: SeriesDataType

  readonly dimensions: SeriesDimensionName[]

  private _dimInfos: Record<SeriesDimensionName, SeriesDimensionDefine>

  private _dimSummary: DimensionSummary

  private __wrappedMethods: string[]

  private _idList: string[] = []

  private _calculationInfo: DataCalculationInfo<HostModel> =
    {} as DataCalculationInfo<HostModel>

  private _visual: Dictionary<any> = {}

  private _graphicEls: Element[] = []

  private _itemVisuals: Dictionary<any>[] = []

  private _dimOmitted = false
  hasItemOption: boolean = false

  TRANSFERABLE_METHODS = [
    'cloneShallow',
    'downSample',
    'lttbDownSample',
    'map',
  ] as const
  CHANGABLE_METHODS = ['filterSelf', 'selectRange'] as const
  DOWNSAMPLE_METHODS = ['downSample', 'lttbDownSample'] as const
  constructor(
    dimensionsInput: SeriesDataSchema | SeriesDimensionDefineLoose[],
    hostModel: HostModel
  ) {
    let dimensions: SeriesDimensionDefineLoose[]
    let assignStoreDimIdx = false
    if (isSeriesDataSchema(dimensionsInput)) {
      dimensions = dimensionsInput.dimensions
      this._dimOmitted = dimensionsInput.isDimensionOmitted()
      this._schema = dimensionsInput
    } else {
      assignStoreDimIdx = true
      dimensions = dimensionsInput as SeriesDimensionDefineLoose[]
    }
    dimensions = dimensions || ['x', 'y']

    const dimensionInfos: Dictionary<SeriesDimensionDefine> = {}
    let needsHasOwn = false
    const dimensionNames = []
    const emptyObj = {}
    for (let i = 0; i < dimensions?.length; i++) {
      const dimInfoInput = dimensions[i]
      const dimensionInfo: SeriesDimensionDefine = zrUtil.isString(dimInfoInput)
        ? new SeriesDimensionDefine({ name: dimInfoInput })
        : !(dimInfoInput instanceof SeriesDimensionDefine)
        ? new SeriesDimensionDefine(dimInfoInput)
        : dimInfoInput

      const dimensionName = dimensionInfo?.name
      dimensionInfo['type'] = dimensionInfo?.type || 'float'

      if (!dimensionInfo.coordDim) {
        dimensionInfo.coordDim = dimensionName
        dimensionInfo.coordDimIndex = 0
      }

      const otherDims = (dimensionInfo.otherDims =
        dimensionInfo.otherDims || {})

      dimensionNames.push(dimensionName)
      dimensionInfos[dimensionName] = dimensionInfo
      if ((emptyObj as any)[dimensionName] != null) {
        needsHasOwn = true
      }
    }
    this.dimensions = dimensionNames
    this._dimInfos = dimensionInfos
    this._initGetDimensionInfo(needsHasOwn)

    this.hostModel = hostModel
  }

  private _getDimInfo: (dimName: SeriesDimensionName) => SeriesDimensionDefine
  private _dimIdxToName?: zrUtil.HashMap<DimensionName, DimensionIndex>
  private _idDimIdx: number
  private _nameList: string[] = []
  private _dimensions: DataStoreDimensionDefine[]
  private _approximateExtent: Record<SeriesDimensionName, [number, number]> = {}
  private _nameDimIdx: number
  private _invertedIndicesMap: Record<SeriesDimensionName, ArrayLike<number>>

  private _nameRepeatCount: NameRepeatCount
  userOutput: DimensionSummary['userOutput']

  private _getStoreDimIndex(dim: DimensionLoose): DimensionIndex {
    const dimIdx = this.getDimensionIndex(dim)
    return dimIdx
  }

  private _initGetDimensionInfo(needsHasOwn: boolean): void {
    const dimensionInfos = this._dimInfos
    this._getDimInfo = needsHasOwn
      ? (dimName) =>
          dimensionInfos.hasOwnProperty(dimName)
            ? dimensionInfos[dimName]
            : undefined
      : (dimName) => dimensionInfos[dimName]
  }

  getId(idx: number): string {
    return getId(this, this.getRawIndex(idx))
  }

  getStore() {
    return this._store
  }

  /**
   * Retrieve the index with given name
   */
  indexOfName(name: string): number {
    for (let i = 0, len = this._store.count(); i < len; i++) {
      if (this.getName(i) === name) {
        return i
      }
    }
    return -1
  }

  getRawIndex(idx: number) {
    return this._store.getRawIndex(idx)
  }

  indexOfRawIndex(rawIndex: number): number {
    return this._store.indexOfRawIndex(rawIndex)
  }

  getIndices() {
    return this._store.getIndices()
  }

  getDataExtent(dim: DimensionLoose): [number, number] {
    return this._store.getDataExtent(this._getStoreDimIndex(dim))
  }

  getDimensionIndex(dim: DimensionLoose): DimensionIndex {
    const dimIdx = this._recognizeDimIndex(dim)
    if (dimIdx != null) {
      return dimIdx
    }

    if (dim == null) {
      return -1
    }

    const dimInfo = this._getDimInfo(dim as DimensionName)
    return dimInfo
      ? dimInfo.storeDimIndex
      : this._dimOmitted
      ? this._schema.getSourceDimensionIndex(dim as DimensionName)
      : -1
  }

  getDimensionInfo(dim: SeriesDimensionLoose): SeriesDimensionDefine {
    // Do not clone, because there may be categories in dimInfo.
    return this._getDimInfo(this.getDimension(dim))
  }

  getDimension(dim: SeriesDimensionLoose): DimensionName {
    let dimIdx = this._recognizeDimIndex(dim)
    if (dimIdx == null) {
      return dim as DimensionName
    }
    dimIdx = dim as DimensionIndex

    if (!this._dimOmitted) {
      return this.dimensions[dimIdx]
    }

    // Retrieve from series dimension definition because it probably contains
    // generated dimension name (like 'x', 'y').
    const dimName = this._dimIdxToName.get(dimIdx)
    if (dimName != null) {
      return dimName
    }

    const sourceDimDef = this._schema.getSourceDimension(dimIdx)
    if (sourceDimDef) {
      return sourceDimDef.name
    }
  }

  getItemModel<ItemOpts extends unknown = unknown>(
    idx: number
  ): Model<ItemOpts> {
    // Extract item option with value key. FIXME will cause incompatible issue
    // Extract<HostModel['option']['data'][number], { value?: any }>
    const hostModel = this.hostModel
    const dataItem = this.getRawDataItem(idx) as ModelOption
    return new Model(dataItem, hostModel, hostModel && hostModel.piModel)
  }

  private _getCategory(dimIdx: number, idx: number): OrdinalRawValue {
    const ordinal = this._store.get(dimIdx, idx)
    const ordinalMeta = this._store.getOrdinalMeta(dimIdx)
    if (ordinalMeta) {
      return ordinalMeta.categories[ordinal as OrdinalNumber]
    }
    return ordinal
  }

  initData(
    data: Source | OptionSourceData | DataStore | DataProvider,
    nameList?: string[],
    dimValueGetter?: DimValueGetter
  ): void {
    let store: DataStore
    if (data instanceof DataStore) {
      store = data
    }
    if (!store) {
      const dimensions = this.dimensions
      const provider =
        isSourceInstance(data) || zrUtil.isArrayLike(data)
          ? new DefaultDataProvider(
              data as Source | OptionSourceData,
              dimensions?.length
            )
          : (data as DataProvider)
      store = new DataStore()
      const dimensionInfos: DataStoreDimensionDefine[] = map(
        dimensions,
        (dimName) => ({
          type: this._dimInfos[dimName].type,
          property: dimName,
        })
      )
      store.initData(provider, dimensionInfos, dimValueGetter)
    }
    this._store = store
    this._nameList = (nameList || []).slice()
    this._idList = []
    this._nameRepeatCount = {}

    this._doInit(0, store.count())

    // Cache summary info for fast visit. See "dimensionHelper".
    // Needs to be initialized after store is prepared.
    this._dimSummary = summarizeDimensions(this, this._schema)
    this.userOutput = this._dimSummary.userOutput
  }

  private _updateOrdinalMeta(): void {
    const store = this._store
    const dimensions = this.dimensions
    for (let i = 0; i < dimensions.length; i++) {
      const dimInfo = this._dimInfos[dimensions[i]]
      if (dimInfo.ordinalMeta) {
        store.collectOrdinalMeta(dimInfo.storeDimIndex, dimInfo.ordinalMeta)
      }
    }
  }

  private _doInit(start: number, end: number): void {
    if (start >= end) {
      return
    }

    const store = this._store
    const provider = store.getProvider()

    this._updateOrdinalMeta()

    const nameList = this._nameList
    const idList = this._idList
    const sourceFormat = provider.getSource().sourceFormat
    const isFormatOriginal = sourceFormat === SOURCE_FORMAT_ORIGINAL
    if (isFormatOriginal && !provider.pure) {
      const sharedDataItem = [] as OptionDataItem
      for (let idx = start; idx < end; idx++) {
        // NOTICE: Try not to write things into dataItem
        const dataItem = provider.getItem(idx, sharedDataItem)
        if (!this.hasItemOption && isDataItemOption(dataItem)) {
          this.hasItemOption = true
        }
        if (dataItem) {
          const itemName = (dataItem as any).name
          if (nameList[idx] == null && itemName != null) {
            nameList[idx] = convertOptionIdName(itemName, null)
          }
          const itemId = (dataItem as any).id
          if (idList[idx] == null && itemId != null) {
            idList[idx] = convertOptionIdName(itemId, null)
          }
        }
      }
    }

    if (this._shouldMakeIdFromName()) {
      for (let idx = start; idx < end; idx++) {
        makeIdFromName(this, idx)
      }
    }

    prepareInvertedIndex(this)
  }

  private _shouldMakeIdFromName(): boolean {
    const provider = this._store.getProvider()
    return (
      this._idDimIdx == null &&
      provider.getSource().sourceFormat !== SOURCE_FORMAT_TYPED_ARRAY &&
      !provider.fillStorage
    )
  }

  //创建一个数据的对比器
  diff(otherList: SeriesData) {
    const thisList = this
            console.log(">>>>",this.getStore())

    return new DataDiffer(
      otherList ? otherList.getStore().getIndices() : [],
      this.getStore().getIndices(),
      function (idx: number) {
        return getId(otherList, idx)
      },
      function (idx: number) {
        return getId(thisList, idx)
      }
    )
  }

  /**
   * Set graphic element relative to data. It can be set as null
   */
  setItemGraphicEl(idx: number, el: Element): void {
    const seriesIndex = this.hostModel && (this.hostModel as any).seriesIndex

    setCommonPIData(seriesIndex, this.dataType, idx, el)

    this._graphicEls[idx] = el
  }

  getItemGraphicEl(idx: number): Element {
    return this._graphicEls[idx]
  }

  eachItemGraphicEl<Ctx = unknown>(
    cb: (this: Ctx, el: Element, idx: number) => void,
    context?: Ctx
  ): void {
    zrUtil.each(this._graphicEls, function (el, idx) {
      if (el) {
        cb && cb.call(context, el, idx)
      }
    })
  }

  private _recognizeDimIndex(dim: DimensionLoose): DimensionIndex {
    if (
      zrUtil.isNumber(dim) ||
      // If being a number-like string but not being defined as a dimension name.
      (dim != null &&
        !isNaN(dim as any) &&
        !this._getDimInfo(dim) &&
        (!this._dimOmitted || this._schema.getSourceDimensionIndex(dim) < 0))
    ) {
      return +dim
    }
  }

  count(): number {
    return this._store.count()
  }

  cloneShallow(list?: SeriesData<HostModel>): SeriesData<HostModel> {
    if (!list) {
      list = new SeriesData(
        this._schema
          ? this._schema
          : map(this.dimensions, this._getDimInfo, this),
        this.hostModel
      )
    }
    transferProperties(list, this) //需要复制数据属性
    list._store = this._store
    return list
  }

  each<Ctx>(cb: EachCb0<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): void
  each<Ctx>(dims: DimensionLoose, cb: EachCb1<Ctx>, ctx?: Ctx): void
  each<Ctx>(dims: [DimensionLoose], cb: EachCb1<Ctx>, ctx?: Ctx): void
  each<Ctx>(
    dims: [DimensionLoose, DimensionLoose],
    cb: EachCb2<Ctx>,
    ctx?: Ctx
  ): void
  each<Ctx>(dims: ItrParamDims, cb: EachCb<Ctx>, ctx?: Ctx): void
  each<Ctx>(
    dims: ItrParamDims | EachCb<Ctx>,
    cb: EachCb<Ctx> | Ctx,
    ctx?: Ctx
  ): void {
    'use strict'

    if (zrUtil.isFunction(dims)) {
      ctx = cb as Ctx
      cb = dims
      dims = []
    }

    // ctxCompat just for compat echarts3
    const fCtx = (ctx || this) as CtxOrList<Ctx>

    const dimIndices = map(
      normalizeDimensions(dims),
      this._getStoreDimIndex,
      this
    )

    this._store.each(
      dimIndices,
      (fCtx ? zrUtil.bind(cb as any, fCtx as any) : cb) as any
    )
  }

  filterSelf<Ctx>(cb: FilterCb0<Ctx>, ctx?: Ctx, ctxCompat?: Ctx): this
  filterSelf<Ctx>(dims: DimensionLoose, cb: FilterCb1<Ctx>, ctx?: Ctx): this
  filterSelf<Ctx>(dims: [DimensionLoose], cb: FilterCb1<Ctx>, ctx?: Ctx): this
  filterSelf<Ctx>(
    dims: [DimensionLoose, DimensionLoose],
    cb: FilterCb2<Ctx>,
    ctx?: Ctx
  ): this
  filterSelf<Ctx>(dims: ItrParamDims, cb: FilterCb<Ctx>, ctx?: Ctx): this
  filterSelf<Ctx>(
    dims: ItrParamDims | FilterCb<Ctx>,
    cb: FilterCb<Ctx> | Ctx,
    ctx?: Ctx
  ): SeriesData {
    'use strict'

    if (zrUtil.isFunction(dims)) {
      ctx = cb as Ctx
      cb = dims
      dims = []
    }

    // ctxCompat just for compat echarts3
    const fCtx = (ctx || this) as CtxOrList<Ctx>

    const dimIndices = map(
      normalizeDimensions(dims),
      this._getStoreDimIndex,
      this
    )

    this._store = this._store.filter(
      dimIndices,
      (fCtx ? zrUtil.bind(cb as any, fCtx as any) : cb) as any
    )

    return this
  }

  selectRange(range: Record<string, [number, number]>): SeriesData {
    'use strict'

    const innerRange: Record<number, [number, number]> = {}
    const dims = zrUtil.keys(range)
    const dimIndices: number[] = []
    zrUtil.each(dims, (dim) => {
      const dimIdx = this._getStoreDimIndex(dim)
      innerRange[dimIdx] = range[dim]
      dimIndices.push(dimIdx)
    })
    this._store = this._store.selectRange(innerRange)
    return this
  }
  getRawDataItem(idx: number) {
    return this._store.getRawDataItem(idx)
  }

  map<Ctx>(
    dims: DimensionLoose,
    cb: MapCb1<Ctx>,
    ctx?: Ctx,
    ctxCompat?: Ctx
  ): SeriesData<HostModel>
  map<Ctx>(
    dims: [DimensionLoose],
    cb: MapCb1<Ctx>,
    ctx?: Ctx,
    ctxCompat?: Ctx
  ): SeriesData<HostModel>
  // eslint-disable-next-line max-len
  map<Ctx>(
    dims: [DimensionLoose, DimensionLoose],
    cb: MapCb2<Ctx>,
    ctx?: Ctx,
    ctxCompat?: Ctx
  ): SeriesData<HostModel>
  map<Ctx>(
    dims: ItrParamDims,
    cb: MapCb<Ctx>,
    ctx?: Ctx,
    ctxCompat?: Ctx
  ): SeriesData {
    'use strict'

    // ctxCompat just for compat echarts3
    const fCtx = (ctx || ctxCompat || this) as CtxOrList<Ctx>

    const dimIndices = map(
      normalizeDimensions(dims),
      this._getStoreDimIndex,
      this
    )

    const list = cloneListForMapAndSample(this)
    list._store = this._store.map(dimIndices, fCtx ? zrUtil.bind(cb, fCtx) : cb)
    return list
  }

  wrapMethod(
    methodName: FunctionPropertyNames<SeriesData>,
    injectFunction: (...args: any) => any
  ): void {
    const originalMethod = this[methodName]
    if (!zrUtil.isFunction(originalMethod)) {
      return
    }
    this.__wrappedMethods = this.__wrappedMethods || []
    this.__wrappedMethods.push(methodName)
    this[methodName] = function () {
      const res = (originalMethod as any).apply(this, arguments)
      return injectFunction.apply(this, [res].concat(zrUtil.slice(arguments)))
    }
  }

  mapDimension(coordDim: SeriesDimensionName): SeriesDimensionName
  mapDimension(coordDim: SeriesDimensionName, idx: number): SeriesDimensionName
  mapDimension(
    coordDim: SeriesDimensionName,
    idx?: number
  ): SeriesDimensionName {
    const dimensionsSummary = this._dimSummary

    if (idx == null) {
      return dimensionsSummary.encodeFirstDimNotExtra[coordDim] as any
    }

    const dims = dimensionsSummary.encode[coordDim]
    return dims ? (dims[idx as number] as any) : null
  }

  mapDimensionsAll(coordDim: SeriesDimensionName): SeriesDimensionName[] {
    const dimensionsSummary = this._dimSummary
    const dims = dimensionsSummary.encode[coordDim]
    return (dims || []).slice()
  }

  getApproximateExtent(dim: SeriesDimensionLoose): [number, number] {
    return (
      this._approximateExtent[dim] ||
      this._store.getDataExtent(this._getStoreDimIndex(dim))
    )
  }

  setApproximateExtent(
    extent: [number, number],
    dim: SeriesDimensionLoose
  ): void {
    dim = this.getDimension(dim)
    this._approximateExtent[dim] = extent.slice() as [number, number]
  }

  /**
   * @return Never be null/undefined. `number` will be converted to string. Because:
   * In most cases, name is used in display, where returning a string is more convenient.
   * In other cases, name is used in query (see `indexOfName`), where we can keep the
   * rule that name `2` equals to name `'2'`.
   */
  getName(idx: number): string {
    const rawIndex = this.getRawIndex(idx)
    let name = this._nameList[rawIndex]
    if (name == null && this._nameDimIdx != null) {
      name = getIdNameFromStore(this, this._nameDimIdx, rawIndex)
    }
    if (name == null) {
      name = ''
    }
    return name
  }

  setCalculationInfo(key: DataCalculationInfo<HostModel>): void
  setCalculationInfo<
    CALC_INFO_KEY extends keyof DataCalculationInfo<HostModel>
  >(
    key: CALC_INFO_KEY,
    value: DataCalculationInfo<HostModel>[CALC_INFO_KEY]
  ): void
  setCalculationInfo(
    key: keyof DataCalculationInfo<HostModel> | DataCalculationInfo<HostModel>,
    value?: DataCalculationInfo<HostModel>[keyof DataCalculationInfo<HostModel>]
  ): void {
    zrUtil.isObject(key)
      ? zrUtil.extend(this._calculationInfo, key as object)
      : ((this._calculationInfo as any)[key] = value)
  }

  getCalculationInfo<
    CALC_INFO_KEY extends keyof DataCalculationInfo<HostModel>
  >(key: CALC_INFO_KEY): DataCalculationInfo<HostModel>[CALC_INFO_KEY] {
    return this._calculationInfo[key]
  }

  setItemVisual<K extends keyof Visual>(
    idx: number,
    key: K,
    value: Visual[K]
  ): void
  setItemVisual(idx: number, kvObject: Partial<Visual>): void
  // eslint-disable-next-line
  setItemVisual<K extends keyof Visual>(
    idx: number,
    key: K | Partial<Visual>,
    value?: Visual[K]
  ): void {
    const itemVisual = this._itemVisuals[idx] || {}
    this._itemVisuals[idx] = itemVisual

    if (zrUtil.isObject(key)) {
      zrUtil.extend(itemVisual, key)
    } else {
      itemVisual[key as string] = value
    }
  }

  clearAllVisual(): void {
    this._visual = {}
    this._itemVisuals = []
  }

  private static internalField = (function () {
    prepareInvertedIndex = function (data: SeriesData): void {
      const invertedIndicesMap = data._invertedIndicesMap
      zrUtil.each(invertedIndicesMap, function (invertedIndices, dim) {
        const dimInfo = data._dimInfos[dim]
        // Currently, only dimensions that has ordinalMeta can create inverted indices.
        const ordinalMeta = dimInfo.ordinalMeta
        const store = data._store
        if (ordinalMeta) {
          invertedIndices = invertedIndicesMap[dim] = new CtorInt32Array(
            ordinalMeta.categories.length
          )
          // The default value of TypedArray is 0. To avoid miss
          // mapping to 0, we should set it as INDEX_NOT_FOUND.
          for (let i = 0; i < invertedIndices.length; i++) {
            //@ts-ignore
            invertedIndices[i] = INDEX_NOT_FOUND
          }
          for (let i = 0; i < store.count(); i++) {
            // Only support the case that all values are distinct.
            //@ts-ignore
            invertedIndices[store.get(dimInfo.storeDimIndex, i) as number] = i
          }
        }
      })
    }
    normalizeDimensions = function (
      dimensions: ItrParamDims
    ): Array<DimensionLoose> {
      if (!zrUtil.isArray(dimensions)) {
        dimensions = dimensions !== null ? [dimensions] : []
      }
      return dimensions
    }

    cloneListForMapAndSample = function (original: SeriesData): SeriesData {
      const list = new SeriesData(
        original._schema
          ? original._schema
          : map(original.dimensions, original._getDimInfo, original),
        original.hostModel
      )
      // FIXME If needs stackedOn, value may already been stacked
      transferProperties(list, original)
      return list
    }

    transferProperties = function (
      target: SeriesData,
      source: SeriesData
    ): void {
      zrUtil.each(
        TRANSFERABLE_PROPERTIES.concat(source.__wrappedMethods || []),
        function (propName) {
          if (source.hasOwnProperty(propName)) {
            ;(target as any)[propName] = (source as any)[propName]
          }
        }
      )

      target.__wrappedMethods = source.__wrappedMethods

      zrUtil.each(CLONE_PROPERTIES, function (propName) {
        ;(target as any)[propName] = zrUtil.clone((source as any)[propName])
      })

      target._calculationInfo = zrUtil.extend({}, source._calculationInfo)
    }

    getId = function (data: SeriesData, rawIndex: number): string {
      let id = data._idList[rawIndex]
      if (id == null && data._idDimIdx != null) {
        id = getIdNameFromStore(data, data._idDimIdx, rawIndex)
      }
      if (id == null) {
        id = ID_PREFIX + rawIndex
      }
      return id
    }

    getIdNameFromStore = function (
      data: SeriesData,
      dimIdx: number,
      idx: number
    ): string {
      return convertOptionIdName(data._getCategory(dimIdx, idx), null)
    }

    makeIdFromName = function (data: SeriesData, idx: number): void {
      const nameList = data._nameList
      const idList = data._idList
      const nameDimIdx = data._nameDimIdx
      const idDimIdx = data._idDimIdx

      let name = nameList[idx]
      let id = idList[idx]

      if (name == null && nameDimIdx != null) {
        nameList[idx] = name = getIdNameFromStore(data, nameDimIdx, idx)
      }
      if (id == null && idDimIdx != null) {
        idList[idx] = id = getIdNameFromStore(data, idDimIdx, idx)
      }
      if (id == null && name != null) {
        const nameRepeatCount = data._nameRepeatCount
        const nmCnt = (nameRepeatCount[name] = (nameRepeatCount[name] || 0) + 1)
        id = name
        if (nmCnt > 1) {
          id += '__pi__' + nmCnt
        }
        idList[idx] = id
      }
    }
  })()
}

interface SeriesData {
  getLinkedData(dataType?: SeriesDataType): SeriesData
  getLinkedDataAll(): { data: SeriesData; type?: SeriesDataType }[]
}

export default SeriesData
