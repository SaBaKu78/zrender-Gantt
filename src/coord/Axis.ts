import { map } from 'zrender/lib/core/util'
import OrdinalScale from '../component/scale/Ordinal'
import { Scale } from '../component/scale/Scale'
import Model from '../model/Model'
import { getPixelPrecision, linearMap } from '../util/number'
import { DimensionName, ScaleDataValue, ScaleTick } from '../util/types'
import { AxisBaseModel } from './AxisBaseModel'
import {
  AxisBaseOption,
  CategoryAxisBaseOption,
  OptionAxisType,
} from './axisCommonTypes'
import {
  calculateCategoryInterval,
  createAxisLabels,
  createAxisTicks,
} from './axisTickLabelBuilder'

const NORMALIZED_EXTENT = [0, 1] as [number, number]

interface TickCoord {
  coord: number
  // That is `scaleTick.value`.
  tickValue?: ScaleTick['value']
}

class Axis {
  type: OptionAxisType

  scale: Scale

  readonly dim: DimensionName

  private _extent: [number, number]

  model: AxisBaseModel

  onBand: CategoryAxisBaseOption['boundaryGap'] = false
  inverse: AxisBaseOption['inverse'] = false

  constructor(dim: DimensionName, scale: Scale, extent: [number, number]) {
    this.scale = scale
    this.dim = dim
    this._extent = extent || [0, 0]
  }

  contain(coord: number): boolean {
    const extent = this._extent
    const min = Math.min(extent[0], extent[1])
    const max = Math.max(extent[0], extent[1])
    return coord >= min && coord <= max
  }

  /**
   * Get coord extent.
   */
  getExtent(): [number, number] {
    return this._extent.slice() as [number, number]
  }

  /**
   * Set coord extent
   */
  setExtent(start: number, end: number): void {
    const extent = this._extent
    extent[0] = start
    extent[1] = end
  }

  /**
   * Get precision used for formatting
   */
  getPixelPrecision(dataExtent?: [number, number]): number {
    return getPixelPrecision(dataExtent || this.scale.getExtent(), this._extent)
  }

  /**
   * Convert data to coord. Data is the rank if it has an ordinal scale
   */
  dataToCoord(data: ScaleDataValue, clamp?: boolean): number {
    let extent = this._extent
    const scale = this.scale
    data = scale.normalize(data)

    if (this.onBand && scale.type === 'ordinal') {
      extent = extent.slice() as [number, number]
      fixExtentWithBands(extent, (scale as OrdinalScale).count())
    }

    return linearMap(data, NORMALIZED_EXTENT, extent, clamp)
  }

  getTicksCoords(opt?: { tickModel?: Model; clamp?: boolean }): TickCoord[] {
    opt = opt || {}

    const tickModel = opt.tickModel || this.getTickModel()
    const result = createAxisTicks(this, tickModel as AxisBaseModel)
    const ticks = result.ticks
    const ticksCoords = map(
      ticks,
      function (tickVal) {
        return {
          coord: this.dataToCoord(
            this.scale.type === 'ordinal'
              ? (this.scale as OrdinalScale).getRawOrdinalNumber(tickVal)
              : tickVal
          ),
          tickValue: tickVal,
        }
      },
      this
    )
    const alignWithLabel = tickModel.get('alignWithLabel')

    fixOnBandTicksCoords(this, ticksCoords, alignWithLabel, opt.clamp)

    return ticksCoords
  }

  getViewLabels(): ReturnType<typeof createAxisLabels>['labels'] {
    return createAxisLabels(this).labels
  }

  getLabelModel(): Model<AxisBaseOption['axisLabel']> {
    return this.model.getModel('axisLabel')
  }
  getTickModel(): Model {
    return this.model.getModel('axisTick')
  }

  /**
   * Get width of band
   */
  getBandWidth(): number {
    const axisExtent = this._extent
    const dataExtent = this.scale.getExtent()

    let len = dataExtent[1] - dataExtent[0] + (this.onBand ? 1 : 0)
    // Fix #2728, avoid NaN when only one data.
    len === 0 && (len = 1)

    const size = Math.abs(axisExtent[1] - axisExtent[0])

    return Math.abs(size) / len
  }

  calculateCategoryInterval(): ReturnType<typeof calculateCategoryInterval> {
    return calculateCategoryInterval(this)
  }

  getRotate: () => number
}

function fixExtentWithBands(extent: [number, number], nTick: number): void {
  const size = extent[1] - extent[0]
  const len = nTick
  const margin = size / len / 2
  extent[0] += margin
  extent[1] -= margin
}

function fixOnBandTicksCoords(
  axis: Axis,
  ticksCoords: TickCoord[],
  alignWithLabel: boolean,
  clamp: boolean
) {}

export default Axis
