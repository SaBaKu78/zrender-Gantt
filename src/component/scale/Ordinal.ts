import { isString } from 'zrender/src/core/util'
import OrdinalMeta from '../../data/OrdinalMeta'
import { OrdinalNumber, OrdinalRawValue, OrdinalScaleTick } from '../../util/types'
import { Scale } from './Scale'
import * as scaleHelper from './helper'

type OrdinalScaleSetting = {
  ordinalMeta?: OrdinalMeta
  extent?: [number, number]
}

class OrdinalScale extends Scale<OrdinalScaleSetting> {
  static type = 'ordinal'
  readonly type = 'ordinal'

  private _ordinalMeta: OrdinalMeta

  private _ordinalNumbersByTick: OrdinalNumber[]

  private _ticksByOrdinalNumber: number[]

  constructor(setting?: OrdinalScaleSetting) {
    super(setting)

    this._extent = this.getSetting('extent') || [0, 0]
  }

  private _getTickNumber(ordinal: OrdinalNumber): number {
    const ticksByOrdinalNumber = this._ticksByOrdinalNumber
    // also support ordinal out of range of `ordinalMeta.categories.length`,
    // where ordinal numbers are used as tick value directly.
    return ticksByOrdinalNumber &&
      ordinal >= 0 &&
      ordinal < ticksByOrdinalNumber.length
      ? ticksByOrdinalNumber[ordinal]
      : ordinal
  }

  getTicks(): OrdinalScaleTick[] {
    const ticks = []
    const extent = this._extent
    let rank = extent[0]

    while (rank <= extent[1]) {
      ticks.push({
        value: rank,
      })
      rank++
    }

    return ticks
  }

  getRawOrdinalNumber(tickNumber: number): OrdinalNumber {
    const ordinalNumbersByTick = this._ordinalNumbersByTick
    // tickNumber may be out of range, e.g., when axis max is larger than `ordinalMeta.categories.length`.,
    // where ordinal numbers are used as tick value directly.
    return ordinalNumbersByTick &&
      tickNumber >= 0 &&
      tickNumber < ordinalNumbersByTick.length
      ? ordinalNumbersByTick[tickNumber]
      : tickNumber
  }

  parse(val: OrdinalRawValue | OrdinalNumber): OrdinalNumber {
    // Caution: Math.round(null) will return `0` rather than `NaN`
    if (val == null) {
      return NaN
    }
    return isString(val)
      ? this._ordinalMeta.getOrdinal(val)
      : // val might be float.
        Math.round(val)
  }

  normalize(val: OrdinalRawValue | OrdinalNumber): number {
    val = this._getTickNumber(this.parse(val))
    return scaleHelper.normalize(val, this._extent)
  }

  count(): number {
    return this._extent[1] - this._extent[0] + 1
  }

  calcTicks(): void {}

  calcNiceExtent() {}
}

Scale.registerClass(OrdinalScale)

export default OrdinalScale
