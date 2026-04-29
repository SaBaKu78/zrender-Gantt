import { DataVisualDimensions, DimensionType } from '../../util/types'
import OrdinalMeta from '../OrdinalMeta'
import * as zrUtil from 'zrender/src/core/util'

export default class SeriesDimensionDefine {
  type?: DimensionType

  name?: string

  displayName?: string

  storeDimIndex?: number

  coordDim?: string
  isExtraCoord?: boolean

  coordDimIndex?: number
  otherDims?: DataVisualDimensions = {}
  ordinalMeta?: OrdinalMeta
  createInvertedIndices?: boolean
  defaultTooltip?: boolean
  isCalculationCoord?: boolean

  constructor(opt?: object | SeriesDimensionDefine) {
    if (opt != null) {
      zrUtil.extend(this, opt)
    }
  }
}
