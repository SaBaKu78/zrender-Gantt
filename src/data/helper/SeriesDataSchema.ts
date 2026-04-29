import { HashMap, retrieve2 } from 'zrender/src/core/util'
import { makeInner } from '../../util/model'
import {
  DimensionDefinition,
  DimensionDefinitionLoose,
  DimensionIndex,
  DimensionName,
} from '../../util/types'
import { Source } from '../Source'
import { DataStoreDimensionDefine } from '../DataStore'
import SeriesDimensionDefine from './SeriesDimensionDefine'
import { createHashMap, isObject } from 'zrender/src/core/util'

const inner = makeInner<
  {
    dimNameMap: HashMap<DimensionIndex, DimensionName>
  },
  Source
>()

export class SeriesDataSchema {
  readonly source: Source
  private _fullDimCount: number

  private _dimNameMap: ReturnType<typeof inner>['dimNameMap']
  private _dimOmitted: boolean

  readonly dimensions: SeriesDimensionDefine[]

  constructor(opt: {
    source: Source
    dimensions: SeriesDimensionDefine[]
    fullDimensionCount: number
    dimensionOmitted: boolean
  }) {
    this.dimensions = opt.dimensions
    this._dimOmitted = opt.dimensionOmitted
    this.source = opt.source
    this._fullDimCount = opt.fullDimensionCount

    this._updateDimOmitted(opt.dimensionOmitted)
  }

  private _updateDimOmitted(dimensionOmitted: boolean): void {
    this._dimOmitted = dimensionOmitted
    if (!dimensionOmitted) {
      return
    }
    if (!this._dimNameMap) {
      this._dimNameMap = ensureSourceDimNameMap(this.source)
    }
  }

  getSourceDimension(dimIndex: DimensionIndex): DimensionDefinition {
    const dimensionsDefine = this.source.dimensionsDefine
    if (dimensionsDefine) {
      return dimensionsDefine[dimIndex]
    }
  }

  getSourceDimensionIndex(dimName: DimensionName): DimensionIndex {
    return retrieve2(this._dimNameMap.get(dimName), -1)
  }

  makeStoreSchema(): {
    dimensions: DataStoreDimensionDefine[]
    hash: string
  } {
    return
  }

  isDimensionOmitted(): boolean {
    return this._dimOmitted
  }

  appendCalculationDimension(dimDef: SeriesDimensionDefine): void {
    this.dimensions.push(dimDef)
    dimDef.isCalculationCoord = true
    this._fullDimCount++
    // If append dimension on a data store, consider the store
    // might be shared by different series, series dimensions not
    // really map to store dimensions.
    this._updateDimOmitted(true)
  }
}

export function isSeriesDataSchema(schema: any): schema is SeriesDataSchema {
  return schema instanceof SeriesDataSchema
}

export function createDimNameMap(
  dimsDef: DimensionDefinitionLoose[]
): HashMap<DimensionIndex, DimensionName> {
  const dataDimNameMap = createHashMap<DimensionIndex, DimensionName>()
  for (let i = 0; i < (dimsDef || []).length; i++) {
    const dimDefItemRaw = dimsDef[i]
    const userDimName = isObject(dimDefItemRaw)
      ? dimDefItemRaw.name
      : dimDefItemRaw
    if (userDimName != null && dataDimNameMap.get(userDimName) == null) {
      dataDimNameMap.set(userDimName, i)
    }
  }
  return dataDimNameMap
}

export function ensureSourceDimNameMap(
  source: Source
): HashMap<DimensionIndex, DimensionName> {
  const innerSource = inner(source)
  return (
    innerSource.dimNameMap ||
    (innerSource.dimNameMap = createDimNameMap(source.dimensionsDefine))
  )
}

export function shouldOmitUnusedDimensions(dimCount: number): boolean {
  return dimCount > 30
}
