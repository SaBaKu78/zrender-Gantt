import { RectLike } from 'zrender/src/core/BoundingRect'
import GlobalModel from '../model/Global'
import ExtensionAPI from '../core/ExtensionAPI'
import { DimensionDefinitionLoose, DimensionName } from '../util/types'
import ComponentModel from '../model/Component'
import Axis from './Axis'
import { PrepareCustomInfo } from '../component/custom/CustomModel'

export interface CoordinateSystemCreator {
  create: (piModel: GlobalModel, api: ExtensionAPI) => CoordinateSystemMaster[]
  dimensions?: DimensionName[]
  getDimensionsInfo?: () => DimensionDefinitionLoose[]
}

export interface CoordinateSystemMaster {
  update?: (piModel: GlobalModel, api: ExtensionAPI) => void
  getRect?: () => RectLike
  containPoint(point: number[]): boolean
}

export interface CoordinateSystem {
  type: string

  master?: CoordinateSystemMaster

  dimensions: DimensionName[]

  model?: ComponentModel

  getAxes?: () => Axis[]

  getAxis?: (dim?: DimensionName) => Axis

  getBaseAxis?: () => Axis

  getOtherAxis?: (baseAxis: Axis) => Axis

  prepareCustoms?: PrepareCustomInfo
}
