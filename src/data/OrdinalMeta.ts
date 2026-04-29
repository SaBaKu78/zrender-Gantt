import { createHashMap, HashMap } from 'zrender/src/core/util'
import { OrdinalNumber, OrdinalRawValue } from '../util/types'
import Model from '../model/Model'
import { isObject, isString, map } from 'zrender/lib/core/util'

let uidBase = 0

class OrdinalMeta {
  readonly categories: OrdinalRawValue[]

  private _needCollect: boolean

  private _deduplication: boolean

  private _map: HashMap<OrdinalNumber>

  readonly uid: number

  constructor(opt: {
    categories?: OrdinalRawValue[]
    needCollect?: boolean
    deduplication?: boolean
  }) {
    this.categories = opt.categories || []
    this._needCollect = opt.needCollect
    this._deduplication = opt.deduplication
    this.uid = ++uidBase
  }

  getOrdinal(category: OrdinalRawValue): OrdinalNumber {
    // @ts-ignore
    return this._getOrCreateMap().get(category)
  }

  parseAndCollect(category: OrdinalRawValue | OrdinalNumber): OrdinalNumber {
    let index
    const needCollect = this._needCollect

    // The value of category dim can be the index of the given category set.
    // This feature is only supported when !needCollect, because we should
    // consider a common case: a value is 2017, which is a number but is
    // expected to be tread as a category. This case usually happen in dataset,
    // where it happent to be no need of the index feature.
    if (!isString(category) && !needCollect) {
      return category
    }

    // Optimize for the scenario:
    // category is ['2012-01-01', '2012-01-02', ...], where the input
    // data has been ensured not duplicate and is large data.
    // Notice, if a dataset dimension provide categroies, usually echarts
    // should remove duplication except user tell echarts dont do that
    // (set axis.deduplication = false), because echarts do not know whether
    // the values in the category dimension has duplication (consider the
    // parallel-aqi example)
    if (needCollect && !this._deduplication) {
      index = this.categories.length
      this.categories[index] = category
      return index
    }

    const map = this._getOrCreateMap()
    // @ts-ignore
    index = map.get(category)

    if (index == null) {
      if (needCollect) {
        index = this.categories.length
        this.categories[index] = category
        // @ts-ignore
        map.set(category, index)
      } else {
        index = NaN
      }
    }

    return index
  }

  private _getOrCreateMap(): HashMap<OrdinalNumber> {
    return (
      this._map || (this._map = createHashMap<OrdinalNumber>(this.categories))
    )
  }

  static createByAxisModel(axisModel: Model): OrdinalMeta {
    const option = axisModel.option
    const data = option.data
    const categories = data && map(data, getName)

    return new OrdinalMeta({
      categories: categories,
      needCollect: !categories,
      // deduplication is default in axis.
      deduplication: option.dedplication !== false,
    })
  }
}

function getName(obj: any): string {
  if (isObject(obj) && obj.value != null) {
    return obj.value
  } else {
    return obj + ''
  }
}

export default OrdinalMeta
