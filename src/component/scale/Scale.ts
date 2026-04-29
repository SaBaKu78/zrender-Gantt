import { Dictionary } from 'zrender/src/core/types'
import * as clazzUtil from '../../util/clazz'
import {
  DimensionLoose,
  DimensionName,
  OptionDataValue,
  ScaleDataValue,
  ScaleTick,
} from '../../util/types'
import SeriesData from '../../data/SeriesData'
import { ScaleRawExtentInfo } from '../../coord/scaleRawExtentInfo'

export abstract class Scale<
  SETTING extends Dictionary<unknown> = Dictionary<unknown>
> {
  type: string

  private _setting: SETTING

  protected _extent: [number, number]

  private _isBlank: boolean

  readonly rawExtentInfo: ScaleRawExtentInfo

  constructor(setting?: SETTING) {
    this._setting = setting || ({} as SETTING)
    this._extent = [Infinity, -Infinity]
  }

  getSetting<KEY extends keyof SETTING>(name: KEY): SETTING[KEY] {
    return this._setting[name]
  }

  unionExtent(other: [number, number]): void {
    const extent = this._extent
    other[0] < extent[0] && (extent[0] = other[0])
    other[1] > extent[1] && (extent[1] = other[1])
  }

  unionExtentFromData(
    data: SeriesData,
    dim: DimensionName | DimensionLoose
  ): void {
    this.unionExtent(data.getApproximateExtent(dim))
  }

  getExtent(): [number, number] {
    return this._extent.slice() as [number, number]
  }

  setExtent(start: number, end: number): void {
    const thisExtent = this._extent
    if (!isNaN(start)) {
      thisExtent[0] = start
    }
    if (!isNaN(end)) {
      thisExtent[1] = end
    }
  }

  /**
   * 当轴为没数据时,
   * 刻度为空
   */
  isBlank(): boolean {
    return this._isBlank
  }

  setBlank(isBlank: boolean) {
    this._isBlank = isBlank
  }

  /**
   * 更新时间轴刻度
   * @param splitNumber 间隔时差
   * @param minInternal Optional
   * @param maxInternal Optional
   */
  abstract calcTicks(
    splitNumber?: number,
    minInternal?: number,
    maxInternal?: number
  ): void

  abstract normalize(val: ScaleDataValue): number

  abstract parse(val: OptionDataValue): number

  abstract calcNiceExtent(opt?: {
    splitNumber?: number
    fixMin?: boolean
    fixMax?: boolean
    minInterval?: number
    maxInterval?: number
  }): void

  abstract getTicks(): ScaleTick[]

  abstract getLabel(tick: ScaleTick): string

  static registerClass: clazzUtil.ClassManager['registerClass']

  static getClass: clazzUtil.ClassManager['getClass']
}

type ScaleConstructor = typeof Scale & clazzUtil.ClassManager
clazzUtil.enableClassManagement(Scale as ScaleConstructor)
