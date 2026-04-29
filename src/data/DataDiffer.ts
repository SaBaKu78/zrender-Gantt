type DiffKeyGetter<Ctx = unknown> = (
  this: DataDiffer<Ctx>,
  value: unknown,
  id: number
) => string

type DiffCallbackAdd = (newIndex: number) => void
type DiffCallbackUpdate = (newIndex: number, oldIndex: number) => void
type DiffCallbackRemove = (oldIndex: number) => void
type DiffCallbackUpdateManyToOne = (
  newIndex: number,
  oldIndex: number[]
) => void
type DiffCallbackUpdateOneToMany = (
  newIndex: number[],
  oldIndex: number
) => void
type DiffCallbackUpdateManyToMany = (
  newIndex: number[],
  oldIndex: number[]
) => void

type DataIndexMap = { [key: string]: number | number[] }
export type DataDiffMode = 'oneToOne' | 'multiple'

function dataIndexMapValueLength(
  valNumOrArrLengthMoreThan2: number | number[]
): number {
  return valNumOrArrLengthMoreThan2 == null
    ? 0
    : (valNumOrArrLengthMoreThan2 as number[]).length || 1
}

function defaultKeyGetter(item: string): string {
  return item
}

class DataDiffer<Ctx = unknown> {
  private _old: ArrayLike<unknown>
  private _new: ArrayLike<unknown>
  private _oldKeyGetter?: DiffKeyGetter
  private _newKeyGetter?: DiffKeyGetter

  private _add: DiffCallbackAdd
  private _update: DiffCallbackUpdate
  private _remove: DiffCallbackRemove

  private _diffModeMultiple: boolean

  readonly context: Ctx

  constructor(
    oldArr: ArrayLike<unknown>,
    newArr: ArrayLike<unknown>,
    oldKeyGetter?: DiffKeyGetter,
    newKeyGetter?: DiffKeyGetter,
    context?: Ctx,
    diffMode?: DataDiffMode
  ) {
    this._old = oldArr
    this._new = newArr
    this._oldKeyGetter = oldKeyGetter || defaultKeyGetter
    this._newKeyGetter = newKeyGetter || defaultKeyGetter

    this.context = context

    this._diffModeMultiple = diffMode === 'multiple'
  }

  add(func: DiffCallbackAdd): this {
    this._add = func
    return this
  }

  update(func: DiffCallbackUpdate): this {
    this._update = func
    return this
  }

  remove(func: DiffCallbackRemove): this {
    this._remove = func
    return this
  }

  execute(): void {
    this[this._diffModeMultiple ? '_executeMultiple' : '_executeOneToOne']()
  }

  private _executeMultiple(): void {}

  private _executeOneToOne(): void {
    const oldArr = this._old
    const newArr = this._new
    const newDataIndexMap: DataIndexMap = {}
    const oldDataKeyArr: string[] = new Array(oldArr.length)
    const newDataKeyArr: string[] = new Array(newArr.length)
    this._initIndexMap(oldArr, null, oldDataKeyArr, '_oldKeyGetter')
    this._initIndexMap(newArr, newDataIndexMap, newDataKeyArr, '_newKeyGetter')

    for (let i = 0; i < oldArr.length; i++) {
      const oldKey = oldDataKeyArr[i]
      const newIdxMapVal = newDataIndexMap[oldKey]
      const newIdxMapValLen = dataIndexMapValueLength(newIdxMapVal)

      // idx can never be empty array here. see 'set null' logic below.
      if (newIdxMapValLen > 1) {
        // Consider there is duplicate key (for example, use dataItem.name as key).
        // We should make sure every item in newArr and oldArr can be visited.
        const newIdx = (newIdxMapVal as number[]).shift()
        if ((newIdxMapVal as number[]).length === 1) {
          newDataIndexMap[oldKey] = (newIdxMapVal as number[])[0]
        }
        this._update && this._update(newIdx as number, i)
      } else if (newIdxMapValLen === 1) {
        newDataIndexMap[oldKey] = null
        this._update && this._update(newIdxMapVal as number, i)
      } else {
        this._remove && this._remove(i)
      }
    }

    this._performRestAdd(newDataKeyArr, newDataIndexMap)
  }

  private _initIndexMap(
    arr: ArrayLike<unknown>,
    // Can be null.
    map: DataIndexMap,
    // In 'byKey', the output `keyArr` is duplication removed.
    // In 'byIndex', the output `keyArr` is not duplication removed and
    //     its indices are accurately corresponding to `arr`.
    keyArr: string[],
    keyGetterName: '_oldKeyGetter' | '_newKeyGetter'
  ): void {
    const cbModeMultiple = this._diffModeMultiple

    for (let i = 0; i < arr.length; i++) {
      // Add prefix to avoid conflict with Object.prototype.
      const key = '_pi_' + this[keyGetterName](arr[i], i)
      if (!cbModeMultiple) {
        keyArr[i] = key
      }
      if (!map) {
        continue
      }

      const idxMapVal = map[key]
      const idxMapValLen = dataIndexMapValueLength(idxMapVal)

      if (idxMapValLen === 0) {
        // Simple optimize: in most cases, one index has one key,
        // do not need array.
        map[key] = i
        if (cbModeMultiple) {
          keyArr.push(key)
        }
      } else if (idxMapValLen === 1) {
        map[key] = [idxMapVal as number, i]
      } else {
        ;(idxMapVal as number[]).push(i)
      }
    }
  }

  private _performRestAdd(
    newDataKeyArr: string[],
    newDataIndexMap: DataIndexMap
  ) {

    for (let i = 0; i < newDataKeyArr.length; i++) {
      const newKey = newDataKeyArr[i]
      const newIdxMapVal = newDataIndexMap[newKey]
      const idxMapValLen = dataIndexMapValueLength(newIdxMapVal)
      if (idxMapValLen > 1) {
        for (let j = 0; j < idxMapValLen; j++) {
          this._add && this._add((newIdxMapVal as number[])[j])
        }
      } else if (idxMapValLen === 1) {
        this._add && this._add(newIdxMapVal as number)
      }
      // Support both `newDataKeyArr` are duplication removed or not removed.
      newDataIndexMap[newKey] = null
    }
  }
}

export default DataDiffer
