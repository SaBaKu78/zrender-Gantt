import { each, isTypedArray, map, retrieve2 } from 'zrender/src/core/util'
import { DatasetModel } from '../../component/dataset/DatasetModel'
import SeriesModel from '../../model/Series'
import {
  Dictionary,
  DimensionDefinitionLoose,
  OptionDataValue,
  OptionSourceData,
  OptionSourceHeader,
  SeriesEncodableModel,
  SeriesLayoutBy,
  SOURCE_FORMAT_ORIGINAL,
  SOURCE_FORMAT_TYPED_ARRAY,
  SourceFormat,
} from '../../util/types'

import {
  cloneSourceShallow,
  createSource,
  Source,
  SourceMetaRawOption,
} from '../Source'
import { applyDataTransform } from './transform'
import {
  querySeriesUpstreamDatasetModel,
  querySeriesUpstreamDatasetModels,
} from './SourceHelper'
import { SeriesDataSchema } from './SeriesDataSchema'
import DataStore, { DataStoreDimensionDefine, DimValueGetter } from '../DataStore'
import { DataProvider, DefaultDataProvider } from './dataProvider'
type DataStoreMap = Dictionary<DataStore>;

export class SourceManager {
  private _sourceHost: SeriesModel | DatasetModel

  private _sourceList: Source[] = []
  private _storeList: DataStoreMap[] = []
  private _upstreamSignList: string[] = []

  private _dirty: boolean = true
  private _versionSignBase = 0

  constructor(sourceHost: SeriesModel) {
    this._sourceHost = sourceHost
  }

  private _setLocalSource(
    sourceList: Source[],
    upstreamSignList: string[]
  ): void {
    this._sourceList = sourceList
    this._upstreamSignList = upstreamSignList
    this._versionSignBase++
    if (this._versionSignBase > 9e10) {
      this._versionSignBase = 0
    }
  }

  private _getVersionSign(): string {
    return this._sourceHost.uid + '_' + this._versionSignBase
  }

  prepareSource() {
    if (this._isDirty()) {
      this._createSource()
      this._dirty = false
    }
  }

  private _createSource(): void {
    this._setLocalSource([], [])

    const sourceHost = this._sourceHost
    const upSourceMgrList = this._getUpstreamSourceManagers()
    const hasUpstream = !!upSourceMgrList?.length
    let resultSourceList: Source[]
    let upstreamSignList: string[]
    if (isSeries(sourceHost)) {
      const seriesModel = sourceHost as SeriesEncodableModel
      let data, sourceFormat: SourceFormat, upSource: Source
      if (hasUpstream) {
        const upSourceMgr = upSourceMgrList[0]
        upSourceMgr.prepareSource()
        upSource = upSourceMgr.getSource()
        data = upSource.data
        sourceFormat = upSource.sourceFormat
        upstreamSignList = [upSourceMgr._getVersionSign()]
      } else {
        data = seriesModel.get('data', true) as OptionSourceData
        sourceFormat = isTypedArray(data)
          ? SOURCE_FORMAT_TYPED_ARRAY
          : SOURCE_FORMAT_ORIGINAL
        this._upstreamSignList = []
      }

      const newMetaRawOption =
        this._getSourceMetaRawOption() || ({} as SourceMetaRawOption)
      const upMetaRawOption =
        (upSource && upSource.metaRawOption) || ({} as SourceMetaRawOption)
      const seriesLayoutBy =
        retrieve2(
          newMetaRawOption.seriesLayoutBy,
          upMetaRawOption.seriesLayoutBy
        ) || null
      const sourceHeader = retrieve2(
        newMetaRawOption.sourceHeader,
        upMetaRawOption.sourceHeader
      )
      const dimensions = retrieve2(
        newMetaRawOption.dimensions,
        upMetaRawOption.dimensions
      )

      const needsCreateSource =
        seriesLayoutBy !== upMetaRawOption.seriesLayoutBy ||
        !!sourceHeader !== !!upMetaRawOption.sourceHeader ||
        dimensions
      resultSourceList = needsCreateSource
        ? [
            createSource(
              data,
              { seriesLayoutBy, sourceHeader, dimensions },
              sourceFormat
            ),
          ]
        : []
    } else {
      const datasetModel = sourceHost as DatasetModel

      // Has upstream dataset.
      if (hasUpstream) {
        const result = this._applyTransform(upSourceMgrList)
        resultSourceList = result.sourceList
        upstreamSignList = result.upstreamSignList
      }
      // Is root dataset.
      else {
        const sourceData = datasetModel.get('source', true)
        resultSourceList = [
          createSource(sourceData, this._getSourceMetaRawOption(), null),
        ]
        upstreamSignList = []
      }
    }

    this._setLocalSource(resultSourceList, upstreamSignList)
  }

  private _applyTransform(upMgrList: SourceManager[]): {
    sourceList: Source[]
    upstreamSignList: string[]
  } {
    const datasetModel = this._sourceHost as DatasetModel
    const transformOption = datasetModel.get('transform', true)
    const fromTransformResult = datasetModel.get('fromTransformResult', true)

    if (fromTransformResult != null) {
      let errMsg = ''
      if (upMgrList.length !== 1) {
        doThrow(errMsg)
      }
    }

    let sourceList: Source[]
    const upSourceList: Source[] = []
    const upstreamSignList: string[] = []
    each(upMgrList, (upMgr) => {
      upMgr.prepareSource()
      const upSource = upMgr.getSource(fromTransformResult || 0)
      let errMsg = ''
      if (fromTransformResult != null && !upSource) {
        doThrow(errMsg)
      }
      upSourceList.push(upSource)
      upstreamSignList.push(upMgr._getVersionSign())
    })

    if (transformOption) {
      sourceList = applyDataTransform(transformOption, upSourceList, {
        datasetIndex: datasetModel.componentIndex,
      })
    } else if (fromTransformResult != null) {
      sourceList = [cloneSourceShallow(upSourceList[0])]
    }

    return { sourceList, upstreamSignList }
  }

  private _isDirty(): boolean {
    if (this._dirty) {
      return true
    }

    const upSourceMgrList = this._getUpstreamSourceManagers()
    for (let i = 0; i < upSourceMgrList.length; i++) {
      const upSrcMgr = upSourceMgrList[i]
      if (
        upSrcMgr._isDirty() ||
        this._upstreamSignList[i] !== upSrcMgr._getVersionSign()
      ) {
        return true
      }
    }
  }

  getSource(sourceIndex?: number): Source {
    sourceIndex = sourceIndex || 0
    const source = this._sourceList[sourceIndex]
    if (!source) {
      const upSourceMgrList = this._getUpstreamSourceManagers()
      return upSourceMgrList[0]?.getSource(sourceIndex)
    }
    return source
  }

  getSharedDataStore(seriesDimRequest: SeriesDataSchema): DataStore {
    const schema = seriesDimRequest.makeStoreSchema()
    return this._innerGetDataStore(
      schema.dimensions,
      seriesDimRequest.source,
      schema.hash
    )
  }

  private _innerGetDataStore(
    storeDims: DataStoreDimensionDefine[],
    seriesSource: Source,
    sourceReadKey: string
  ): DataStore | undefined {
    // TODO Can use other sourceIndex?
    const sourceIndex = 0

    const storeList = this._storeList

    let cachedStoreMap = storeList[sourceIndex]

    if (!cachedStoreMap) {
      cachedStoreMap = storeList[sourceIndex] = {}
    }

    let cachedStore = cachedStoreMap[sourceReadKey]
    if (!cachedStore) {
      const upSourceMgr = this._getUpstreamSourceManagers()[0]

      if (isSeries(this._sourceHost) && upSourceMgr) {
        cachedStore = upSourceMgr._innerGetDataStore(
          storeDims,
          seriesSource,
          sourceReadKey
        )
      } else {
        cachedStore = new DataStore()
        // Always create store from source of series.
        cachedStore.initData(
          new DefaultDataProvider(seriesSource, storeDims.length),
          storeDims
        )
      }
      cachedStoreMap[sourceReadKey] = cachedStore
    }

    return cachedStore
  }

  private _getUpstreamSourceManagers(): SourceManager[] {
    const sourceHost = this._sourceHost
    if (isSeries(sourceHost)) {
      const datasetModel = querySeriesUpstreamDatasetModel(sourceHost)
      return !datasetModel ? [] : [datasetModel.getSourceManager()]
    } else {
      return map(
        querySeriesUpstreamDatasetModels(sourceHost as DatasetModel),
        (datasetModel) => datasetModel.getSourceManager()
      )
    }
  }

  private _getSourceMetaRawOption(): SourceMetaRawOption {
    const sourceHost = this._sourceHost
    let seriesLayoutBy: SeriesLayoutBy,
      sourceHeader: OptionSourceHeader,
      dimensions: DimensionDefinitionLoose[]
    if (isSeries(sourceHost)) {
      seriesLayoutBy = sourceHost.get('seriesLayoutBy', true)
      sourceHeader = sourceHost.get('sourceHeader', true)
      dimensions = sourceHost.get('dimensions', true)
    } else if (!this._getUpstreamSourceManagers()?.length) {
      const model = sourceHost as DatasetModel
      seriesLayoutBy = model.get('seriesLayoutBy', true)
      sourceHeader = model.get('sourceHeader', true)
      dimensions = model.get('dimensions', true)
    }
    return { seriesLayoutBy, sourceHeader, dimensions }
  }
}

function isSeries(
  sourceHost: SourceManager['_sourceHost']
): sourceHost is SeriesEncodableModel {
  // Avoid circular dependency with Series.ts
  return (sourceHost as SeriesModel).mainType === 'series'
}

function doThrow(errMsg: string): void {
  throw new Error(errMsg)
}
