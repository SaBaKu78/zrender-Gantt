import {
  assert,
  createHashMap,
  each,
  HashMap,
  indexOf,
  isArray,
  isNumber,
  isObject,
  isString,
  isStringSafe,
  map,
} from 'zrender/src/core/util'
import {
  ComponentMainType,
  ComponentOption,
  ComponentSubType,
  Dictionary,
  OptionDataItem,
  OptionDataValue,
  OptionId,
  OptionName,
  Payload,
} from './types'
import ComponentModel, { ComponentModelConstructor } from '../model/Component'
import { getRandomIdBase } from './number'
import GlobalModel from '../model/Global'
import SeriesModel from '../model/Series'
import CartesianAxisModel from '../coord/cartesian/AxisModel'
import GridModel from '../component/gird/GridModel'
import SeriesData from '../data/SeriesData'

const DUMMY_COMPONENT_NAME_PREFIX = 'series\0'
const INTERNAL_COMPONENT_ID_PREFIX = '\0_pi_\0'

export function setAttribute(dom: HTMLElement, key: string, value: any) {
  dom.setAttribute ? dom.setAttribute(key, value) : ((dom as any)[key] = value)
}

export function getAttribute(dom: HTMLElement, key: string): any {
  return dom.getAttribute ? dom.getAttribute(key) : (dom as any)[key]
}

export function normalizeToArray<T>(value?: T | T[]): T[] {
  return value instanceof Array ? value : value == null ? [] : [value]
}

export interface MappingExistingItem {
  id?: OptionId
  name?: string
}

/**
 * @return return null if not exist.
 */
function makeComparableKey(val: unknown): string {
  return convertOptionIdName(val, '')
}

export function convertOptionIdName(
  idOrName: unknown,
  defaultValue: string
): string {
  if (idOrName == null) {
    return defaultValue
  }
  return isString(idOrName)
    ? idOrName
    : isNumber(idOrName) || isStringSafe(idOrName)
    ? idOrName + ''
    : defaultValue
}

/**
 * @param payload Contains dataIndex (means rawIndex) / dataIndexInside / name
 *                         each of which can be Array or primary type.
 * @return dataIndex If not found, return undefined/null.
 */
export function queryDataIndex(
  data: SeriesData,
  payload: Payload & {
    dataIndexInside?: number | number[]
    dataIndex?: number | number[]
    name?: string | string[]
  }
): number | number[] {
  if (payload.dataIndexInside != null) {
    return payload.dataIndexInside
  } else if (payload.dataIndex != null) {
    return isArray(payload.dataIndex)
      ? map(payload.dataIndex, function (value) {
          return data.indexOfRawIndex(value)
        })
      : data.indexOfRawIndex(payload.dataIndex)
  } else if (payload.name != null) {
    return isArray(payload.name)
      ? map(payload.name, function (value) {
          return data.indexOfName(value)
        })
      : data.indexOfName(payload.name)
  }
}

export function makeInner<T, Host extends object>() {
  const key = '__pi_inner_' + innerUniqueIndex++
  return function (hostObj: Host): T {
    return (hostObj as any)[key] || ((hostObj as any)[key] = {})
  }
}
let innerUniqueIndex = getRandomIdBase()

export function isNameSpecified(componentModel: ComponentModel): boolean {
  const name = componentModel.name
  // Is specified when `indexOf` get -1 or > 0.
  return !!(name && name.indexOf(DUMMY_COMPONENT_NAME_PREFIX))
}

/**
 * @public
 * @param {Object} cmptOption
 * @return {boolean}
 */
export function isComponentIdInternal(cmptOption: {
  id?: MappingExistingItem['id']
}): boolean {
  return (
    cmptOption &&
    cmptOption.id != null &&
    makeComparableKey(cmptOption.id).indexOf(INTERNAL_COMPONENT_ID_PREFIX) === 0
  )
}

type MappingToExistsMode = 'normalMerge' | 'replaceMerge' | 'replaceAll'

type MappingResult<T> = MappingResultItem<T>[]

interface MappingResultItem<
  T extends MappingExistingItem = MappingExistingItem
> {
  // Existing component instance.
  existing: T
  // The mapped new component option.
  newOption: ComponentOption
  // Mark that the new component has nothing to do with any of the old components.
  // So they won't share view. Also see `__requireNewView`.
  brandNew: boolean
  // keyInfo for new component.
  // All of them will be assigned to a created component instance.
  keyInfo: {
    name: string
    id: string
    mainType: ComponentMainType
    subType: ComponentSubType
  }
}

export interface MappingExistingItem {
  id?: OptionId
  name?: string
}

export function mappingToExists<T extends MappingExistingItem>(
  existings: T[],
  newCmptOptions: ComponentOption[],
  mode: MappingToExistsMode
): MappingResult<T> {
  const isNormalMergeMode = mode === 'normalMerge'
  const isReplaceMergeMode = mode === 'replaceMerge'
  const isReplaceAllMode = mode === 'replaceAll'
  existings = existings || []
  newCmptOptions = (newCmptOptions || []).slice()
  const existingIdIdxMap = createHashMap<number>()

  // Validate id and name on user input option.
  each(newCmptOptions, function (cmptOption, index) {
    if (!isObject<ComponentOption>(cmptOption)) {
      newCmptOptions[index] = null
      return
    }
  })

  const result = prepareResult(existings, existingIdIdxMap, mode)

  if (isNormalMergeMode || isReplaceMergeMode) {
    mappingById(result, existings, existingIdIdxMap, newCmptOptions)
  }

  if (isNormalMergeMode) {
    mappingByName(result, newCmptOptions)
  }

  if (isNormalMergeMode || isReplaceMergeMode) {
    mappingByIndex(result, newCmptOptions, isReplaceMergeMode)
  } else if (isReplaceAllMode) {
    mappingInReplaceAllMode(result, newCmptOptions)
  }

  makeIdAndName(result)
  return result
}

function prepareResult<T extends MappingExistingItem>(
  existings: T[],
  existingIdIdxMap: HashMap<number>,
  mode: MappingToExistsMode
): MappingResultItem<T>[] {
  const result: MappingResultItem<T>[] = []

  if (mode === 'replaceAll') {
    return result
  }

  // Do not use native `map` to in case that the array `existings`
  // contains elided items, which will be omitted.
  for (let index = 0; index < existings.length; index++) {
    const existing = existings[index]
    // Because of replaceMerge, `existing` may be null/undefined.
    if (existing && existing.id != null) {
      existingIdIdxMap.set(existing.id, index)
    }
    // For non-internal-componnets:
    //     Mode "normalMerge": all existings kept.
    //     Mode "replaceMerge": all existing removed unless mapped by id.
    // For internal-components:
    //     go with "replaceMerge" approach in both mode.
    result.push({
      existing:
        mode === 'replaceMerge' || isComponentIdInternal(existing)
          ? null
          : existing,
      newOption: null,
      keyInfo: null,
      brandNew: null,
    })
  }
  return result
}

function mappingById<T extends MappingExistingItem>(
  result: MappingResult<T>,
  existings: T[],
  existingIdIdxMap: HashMap<number>,
  newCmptOptions: ComponentOption[]
): void {
  // Mapping by id if specified.
  each(newCmptOptions, function (cmptOption, index) {
    if (!cmptOption || cmptOption.id == null) {
      return
    }
    const optionId = makeComparableKey(cmptOption.id)
    const existingIdx = existingIdIdxMap.get(optionId)
    if (existingIdx != null) {
      const resultItem = result[existingIdx]
      assert(
        !resultItem.newOption,
        'Duplicated option on id "' + optionId + '".'
      )
      resultItem.newOption = cmptOption
      // In both mode, if id matched, new option will be merged to
      // the existings rather than creating new component model.
      resultItem.existing = existings[existingIdx]
      newCmptOptions[index] = null
    }
  })
}

function mappingByName<T extends MappingExistingItem>(
  result: MappingResult<T>,
  newCmptOptions: ComponentOption[]
): void {
  // Mapping by name if specified.
  each(newCmptOptions, function (cmptOption, index) {
    if (!cmptOption || cmptOption.name == null) {
      return
    }
    for (let i = 0; i < result.length; i++) {
      const existing = result[i].existing
      if (
        !result[i].newOption && // Consider name: two map to one.
        // Can not match when both ids existing but different.
        existing &&
        (existing.id == null || cmptOption.id == null) &&
        !isComponentIdInternal(cmptOption) &&
        !isComponentIdInternal(existing) &&
        keyExistAndEqual('name', existing, cmptOption)
      ) {
        result[i].newOption = cmptOption
        newCmptOptions[index] = null
        return
      }
    }
  })
}

function mappingByIndex<T extends MappingExistingItem>(
  result: MappingResult<T>,
  newCmptOptions: ComponentOption[],
  brandNew: boolean
): void {
  each(newCmptOptions, function (cmptOption) {
    if (!cmptOption) {
      return
    }

    // Find the first place that not mapped by id and not internal component (consider the "hole").
    let resultItem
    let nextIdx = 0
    while (
      // Be `!resultItem` only when `nextIdx >= result.length`.
      (resultItem = result[nextIdx]) &&
      // (1) Existing models that already have id should be able to mapped to. Because
      // after mapping performed, model will always be assigned with an id if user not given.
      // After that all models have id.
      // (2) If new option has id, it can only set to a hole or append to the last. It should
      // not be merged to the existings with different id. Because id should not be overwritten.
      // (3) Name can be overwritten, because axis use name as 'show label text'.
      (resultItem.newOption ||
        isComponentIdInternal(resultItem.existing) ||
        // In mode "replaceMerge", here no not-mapped-non-internal-existing.
        (resultItem.existing &&
          cmptOption.id != null &&
          !keyExistAndEqual('id', cmptOption, resultItem.existing)))
    ) {
      nextIdx++
    }

    if (resultItem) {
      resultItem.newOption = cmptOption
      resultItem.brandNew = brandNew
    } else {
      result.push({
        newOption: cmptOption,
        brandNew: brandNew,
        existing: null,
        keyInfo: null,
      })
    }
    nextIdx++
  })
}

function mappingInReplaceAllMode<T extends MappingExistingItem>(
  result: MappingResult<T>,
  newCmptOptions: ComponentOption[]
): void {
  each(newCmptOptions, function (cmptOption) {
    // The feature "reproduce" requires "hole" will also reproduced
    // in case that component index referring are broken.
    result.push({
      newOption: cmptOption,
      brandNew: true,
      existing: null,
      keyInfo: null,
    })
  })
}

/**
 * Make id and name for mapping result (result of mappingToExists)
 * into `keyInfo` field.
 */
function makeIdAndName(mapResult: MappingResult<MappingExistingItem>): void {
  // We use this id to hash component models and view instances
  // in echarts. id can be specified by user, or auto generated.

  // The id generation rule ensures new view instance are able
  // to mapped to old instance when setOption are called in
  // no-merge mode. So we generate model id by name and plus
  // type in view id.

  // name can be duplicated among components, which is convenient
  // to specify multi components (like series) by one name.

  // Ensure that each id is distinct.
  const idMap = createHashMap()

  each(mapResult, function (item) {
    const existing = item.existing
    existing && idMap.set(existing.id, item)
  })

  each(mapResult, function (item) {
    const opt = item.newOption

    // Force ensure id not duplicated.
    assert(
      !opt ||
        opt.id == null ||
        !idMap.get(opt.id) ||
        idMap.get(opt.id) === item,
      'id duplicates: ' + (opt && opt.id)
    )

    opt && opt.id != null && idMap.set(opt.id, item)
    !item.keyInfo && (item.keyInfo = {} as MappingResultItem['keyInfo'])
  })

  // Make name and id.
  each(mapResult, function (item, index) {
    const existing = item.existing
    const opt = item.newOption
    const keyInfo = item.keyInfo

    if (!isObject<ComponentOption>(opt)) {
      return
    }

    // Name can be overwritten. Consider case: axis.name = '20km'.
    // But id generated by name will not be changed, which affect
    // only in that case: setOption with 'not merge mode' and view
    // instance will be recreated, which can be accepted.
    keyInfo.name =
      opt.name != null
        ? makeComparableKey(opt.name)
        : existing
        ? existing.name
        : // Avoid that different series has the same name,
          // because name may be used like in color pallet.
          DUMMY_COMPONENT_NAME_PREFIX + index

    if (existing) {
      keyInfo.id = makeComparableKey(existing.id)
    } else if (opt.id != null) {
      keyInfo.id = makeComparableKey(opt.id)
    } else {
      // Consider this situatoin:
      //  optionA: [{name: 'a'}, {name: 'a'}, {..}]
      //  optionB [{..}, {name: 'a'}, {name: 'a'}]
      // Series with the same name between optionA and optionB
      // should be mapped.
      let idNum = 0
      do {
        keyInfo.id = '\0' + keyInfo.name + '\0' + idNum++
      } while (idMap.get(keyInfo.id))
    }

    idMap.set(keyInfo.id, item)
  })
}

function keyExistAndEqual(
  attr: 'id' | 'name',
  obj1: { id?: OptionId; name?: OptionName },
  obj2: { id?: OptionId; name?: OptionName }
): boolean {
  const key1 = convertOptionIdName(obj1[attr], null)
  const key2 = convertOptionIdName(obj2[attr], null)
  // See `MappingExistingItem`. `id` and `name` trade string equals to number.
  return key1 != null && key2 != null && key1 === key2
}

export function setComponentTypeToKeyInfo(
  mappingResult: MappingResult<
    MappingExistingItem & { subType?: ComponentSubType }
  >,
  mainType: ComponentMainType,
  componentModelCtor: ComponentModelConstructor
): void {
  // Set mainType and complete subType.
  each(mappingResult, function (item) {
    const newOption = item.newOption
    if (isObject(newOption)) {
      item.keyInfo.mainType = mainType
      item.keyInfo.subType = determineSubType(
        mainType,
        newOption,
        item.existing,
        componentModelCtor
      )
    }
  })
}

function determineSubType(
  mainType: ComponentMainType,
  newCmptOption: ComponentOption,
  existComponent: { subType?: ComponentSubType },
  componentModelCtor: ComponentModelConstructor
): ComponentSubType {
  const subType = newCmptOption.type
    ? newCmptOption.type
    : existComponent
    ? existComponent.subType
    : // Use determineSubType only when there is no existComponent.
      (componentModelCtor as ComponentModelConstructor).determineSubType(
        mainType,
        newCmptOption
      )

  return subType
}

export const SINGLE_REFERRING: QueryReferringOpt = {
  useDefault: true,
  enableAll: false,
  enableNone: false,
}

export const MULTIPLE_REFERRING: QueryReferringOpt = {
  useDefault: false,
  enableAll: true,
  enableNone: true,
}

export type QueryReferringOpt = {
  useDefault?: boolean
  enableAll?: boolean
  enableNone?: boolean
}

export function queryReferringComponents(
  piModel: GlobalModel,
  mainType: ComponentMainType,
  userOption: QueryReferringUserOption,
  opt?: QueryReferringOpt
): {
  models: ComponentModel[]
  specified: boolean
} {
  opt = opt || (SINGLE_REFERRING as QueryReferringOpt)
  let indexOption = userOption.index
  let idOption = userOption.id
  let nameOption = userOption.name
  const result = {
    models: null as ComponentModel[],
    specified: indexOption != null || idOption != null || nameOption != null,
  }

  if (!result.specified) {
    let firstCmpt
    result.models =
      opt.useDefault && (firstCmpt = piModel.getComponent(mainType))
        ? [firstCmpt]
        : []
    return result
  }

  if (indexOption === 'none' || indexOption === false) {
    result.models = []
    return result
  }

  if (indexOption === 'all') {
    indexOption = idOption = nameOption = null
  }
  result.models = piModel.queryComponents({
    mainType: mainType,
    index: indexOption as number | number[],
    id: idOption,
    name: nameOption,
  })
  return result
}

export type ModelFinderIndexQuery = number | number[] | 'all' | 'none' | false
export type ModelFinderIdQuery = OptionId | OptionId[]
export type ModelFinderNameQuery = OptionId | OptionId[]

export type ModelFinder = string | ModelFinderObject
export type ModelFinderObject = {
  seriesIndex?: ModelFinderIndexQuery
  seriesId?: ModelFinderIdQuery
  seriesName?: ModelFinderNameQuery
  geoIndex?: ModelFinderIndexQuery
  geoId?: ModelFinderIdQuery
  geoName?: ModelFinderNameQuery
  bmapIndex?: ModelFinderIndexQuery
  bmapId?: ModelFinderIdQuery
  bmapName?: ModelFinderNameQuery
  xAxisIndex?: ModelFinderIndexQuery
  xAxisId?: ModelFinderIdQuery
  xAxisName?: ModelFinderNameQuery
  yAxisIndex?: ModelFinderIndexQuery
  yAxisId?: ModelFinderIdQuery
  yAxisName?: ModelFinderNameQuery
  gridIndex?: ModelFinderIndexQuery
  gridId?: ModelFinderIdQuery
  gridName?: ModelFinderNameQuery
  dataIndex?: number
  dataIndexInside?: number
  // ... (can be extended)
}

export type ParsedModelFinder = {
  // other components
  [key: string]: ComponentModel | ComponentModel[] | undefined
}

export type ParsedModelFinderKnown = ParsedModelFinder & {
  seriesModels?: SeriesModel[]
  seriesModel?: SeriesModel
  xAxisModels?: CartesianAxisModel[]
  xAxisModel?: CartesianAxisModel
  yAxisModels?: CartesianAxisModel[]
  yAxisModel?: CartesianAxisModel
  gridModels?: GridModel[]
  gridModel?: GridModel
  dataIndex?: number
  dataIndexInside?: number
}

export function preParseFinder(
  finderInput: ModelFinder,
  opt?: {
    // If pervided, types out of this list will be ignored.
    includeMainTypes?: ComponentMainType[]
  }
): {
  mainTypeSpecified: boolean
  queryOptionMap: HashMap<QueryReferringUserOption, ComponentMainType>
  others: Partial<Pick<ParsedModelFinderKnown, 'dataIndex' | 'dataIndexInside'>>
} {
  let finder: ModelFinderObject
  if (isString(finderInput)) {
    const obj = {}
    ;(obj as any)[finderInput + 'Index'] = 0
    finder = obj
  } else {
    finder = finderInput
  }

  const queryOptionMap = createHashMap<
    QueryReferringUserOption,
    ComponentMainType
  >()
  const others = {} as Partial<
    Pick<ParsedModelFinderKnown, 'dataIndex' | 'dataIndexInside'>
  >
  let mainTypeSpecified = false

  each(finder, function (value, key) {
    // Exclude 'dataIndex' and other illgal keys.
    if (key === 'dataIndex' || key === 'dataIndexInside') {
      others[key] = value as number
      return
    }

    const parsedKey = key.match(/^(\w+)(Index|Id|Name)$/) || []
    const mainType = parsedKey[1]
    const queryType = (
      parsedKey[2] || ''
    ).toLowerCase() as keyof QueryReferringUserOption

    if (
      !mainType ||
      !queryType ||
      (opt &&
        opt.includeMainTypes &&
        indexOf(opt.includeMainTypes, mainType) < 0)
    ) {
      return
    }

    mainTypeSpecified = mainTypeSpecified || !!mainType

    const queryOption =
      queryOptionMap.get(mainType) || queryOptionMap.set(mainType, {})
    queryOption[queryType] = value as any
  })

  return { mainTypeSpecified, queryOptionMap, others }
}

export type QueryReferringUserOption = {
  index?: ModelFinderIndexQuery
  id?: ModelFinderIdQuery
  name?: ModelFinderNameQuery
}

export function getDataItemValue(
  dataItem: OptionDataItem
): OptionDataValue | OptionDataValue[] {
  return isObject(dataItem) && !isArray(dataItem) && !(dataItem instanceof Date)
    ? (dataItem as Dictionary<OptionDataValue>).value
    : dataItem
}

export function isDataItemOption(dataItem: OptionDataItem): boolean {
  return isObject(dataItem) && !(dataItem instanceof Array)
}
