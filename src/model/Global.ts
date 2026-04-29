import {
  clone,
  createHashMap,
  each,
  extend,
  filter,
  HashMap,
  isArray,
  isFunction,
  isObject,
  isString,
  merge,
} from 'zrender/src/core/util'
import ComponentModel, { ComponentModelConstructor } from '../model/Component'
import Model from '../model/Model'
import {
  ComponentMainType,
  ComponentOption,
  ComponentSubType,
  GanttBaseOption,
  GanttUnitOption,
  OptionId,
  OptionName,
  Payload,
} from '../util/types'
import OptionManager from './OptionManager'
import * as modelUtil from '../util/model'
import globalDefault from './globalDefault'
import { concatInternalOptions } from './internalComponentCreator'
import SeriesModel from './Series'
import Scheduler from '../core/Scheduler'
import { LocaleOption } from '../core/locale'

export interface GlobalModelSetOptionOpts {
  replaceMerge: ComponentMainType | ComponentMainType[]
}

export interface InnerSetOptionOpts {
  replaceMergeMainTypeMap: HashMap<boolean, string>
}

export interface QueryConditionKindA {
  mainType: ComponentMainType
  subType?: ComponentSubType
  query?: {
    [k: string]: number | number[] | string | string[]
  }
  filter?: (cmpt: ComponentModel) => boolean
}

export interface QueryConditionKindB {
  mainType: ComponentMainType
  subType?: ComponentSubType
  index?: number | number[]
  id?: OptionId | OptionId[]
  name?: OptionName | OptionName[]
}

export interface EachComponentAllCallback {
  (mainType: string, model: ComponentModel, componentIndex: number): void
}

interface EachComponentInMainTypeCallback {
  (model: ComponentModel, componentIndex: number): void
}

let reCreateSeriesIndices: (piModel: GlobalModel) => void
let initBase: (piModel: GlobalModel, baseOption: GanttUnitOption) => void

const OPTION_INNER_KEY = '\0_pi_inner'

class GlobalModel extends Model {
  option: GanttUnitOption

  private _locale: Model

  private _optionManager: OptionManager

  private _componentsMap: HashMap<ComponentModel[], ComponentMainType>

  private _componentsCount: HashMap<number>

  private _seriesIndices: number[]

  private _seriesIndicesMap: HashMap<any>

  private _payload: Payload

  scheduler: Scheduler

  /**
   * 初始化
   * @param optionManager 配置项处理器
   */
  init(
    option: GanttBaseOption,
    parentModel: Model,
    piModel: GlobalModel,
    locale: object,
    optionManager: OptionManager
  ) {
    this.option = null // Mark as not initialized.
    this._locale = new Model(locale)
    this._optionManager = optionManager
  }

  setOption(option: GanttBaseOption, opts: GlobalModelSetOptionOpts) {
    // const innerOpt = normalizeSetOptionInput(opts)
    this._optionManager.setOption(option)
    this._resetOption('recreate')
  }

  /**
   * 重置option
   * @param type 标识重置option得来源
   * @returns
   */
  private _resetOption(type?: 'recreate'): boolean {
    let optionChanged = false
    const optionManager = this._optionManager
    if (!type || type == 'recreate') {
      const baseOption = optionManager.mountOption(type == 'recreate')
      if (!this.option || type == 'recreate') {
        initBase(this, baseOption)
      }
      optionChanged = true
    }

    return optionChanged
  }

  restoreData(payload?: Payload): void {
    reCreateSeriesIndices(this)

    const componentsMap = this._componentsMap
    const componentTypes: string[] = []
    componentsMap.each(function (components, componentType) {
      if (ComponentModel.hasClass(componentType)) {
        componentTypes.push(componentType)
      }
    })
    ;(ComponentModel as ComponentModelConstructor).topologicalTravel(
      componentTypes,
      (ComponentModel as ComponentModelConstructor).getAllClassMainTypes(),
      function (componentType) {
        each(componentsMap.get(componentType), function (component) {
          if (
            component &&
            (componentType !== 'series' ||
              !isNotTargetSeries(component as SeriesModel, payload))
          ) {
            component.restoreData()
          }
        })
      }
    )
  }

  public mergeOption(option: GanttUnitOption): void {
    this._mergeOption(option, null)
  }

  private _mergeOption(
    newOption: GanttUnitOption,
    opt: InnerSetOptionOpts
  ): void {
    const option = this.option
    const componentsMap = this._componentsMap
    const componentsCount = this._componentsCount
    const newCmptTypes: ComponentMainType[] = []
    const newCmptTypesMap = createHashMap<boolean, string>()
    const replaceMergeMainTypeMap = opt?.replaceMergeMainTypeMap
    //componentOption: 配置项值，mainType：配置项key
    each(newOption, function (componentOption, mainType: ComponentMainType) {
      if (!componentOption) return
      if (!ComponentModel.hasClass(mainType)) {
        option[mainType] = option[mainType]
          ? clone(componentOption)
          : merge(option[mainType], componentOption, true)
      } else if (mainType) {
        newCmptTypes.push(mainType)
        newCmptTypesMap.set(mainType, true)
      }
    })
    ;(ComponentModel as ComponentModelConstructor).topologicalTravel(
      newCmptTypes,
      (ComponentModel as ComponentModelConstructor).getAllClassMainTypes(),
      visitComponent,
      this
    )

    function visitComponent(
      this: GlobalModel,
      mainType: ComponentMainType
    ): void {
      const newCmptOptionList = concatInternalOptions(
        this,
        mainType,
        modelUtil.normalizeToArray(newOption[mainType])
      )
      const oldCmptList = componentsMap.get(mainType)
      const mergeMode =
        // `!oldCmptList` means init. See the comment in `mappingToExists`
        !oldCmptList
          ? 'replaceAll'
          : replaceMergeMainTypeMap && replaceMergeMainTypeMap.get(mainType)
          ? 'replaceMerge'
          : 'normalMerge'
      const mappingResult = modelUtil.mappingToExists(
        oldCmptList,
        newCmptOptionList,
        mergeMode
      )
      // Set mainType and complete subType.
      modelUtil.setComponentTypeToKeyInfo(
        mappingResult,
        mainType,
        ComponentModel as ComponentModelConstructor
      )

      // Empty it before the travel, in order to prevent `this._componentsMap`
      // from being used in the `init`/`mergeOption`/`optionUpdated` of some
      // components, which is probably incorrect logic.
      option[mainType] = null
      componentsMap.set(mainType, null)
      componentsCount.set(mainType, 0)

      const optionsByMainType = [] as ComponentOption[]
      const cmptsByMainType = [] as ComponentModel[]
      let cmptsCountByMainType = 0

      let tooltipExists: boolean
      let tooltipWarningLogged: boolean

      each(
        mappingResult,
        function (resultItem, index) {
          let componentModel = resultItem.existing
          const newCmptOption = resultItem.newOption

          if (!newCmptOption) {
            if (componentModel) {
              // Consider where is no new option and should be merged using {},
              // see removeEdgeAndAdd in topologicalTravel and
              // ComponentModel.getAllClassMainTypes.
              componentModel.mergeOption({}, this)
            }
            // If no both `resultItem.exist` and `resultItem.option`,
            // either it is in `replaceMerge` and not matched by any id,
            // or it has been removed in previous `replaceMerge` and left a "hole" in this component index.
          } else {
            const isSeriesType = mainType === 'series'
            const ComponentModelClass = (
              ComponentModel as ComponentModelConstructor
            ).getClass(
              mainType,
              resultItem.keyInfo.subType,
              !isSeriesType // Give a more detailed warn later if series don't exists
            )
            if (!ComponentModelClass) {
              // if (__DEV__) {
              // const subType = resultItem.keyInfo.subType
              // const seriesImportName =
              //   BUILTIN_CHARTS_MAP[subType as keyof typeof BUILTIN_CHARTS_MAP]
              // if (!componetsMissingLogPrinted[subType]) {
              //   componetsMissingLogPrinted[subType] = true
              //   if (seriesImportName) {
              //     error(`Series ${subType} is used but not imported.
              //           import { ${seriesImportName} } from 'echarts/charts';
              //           echarts.use([${seriesImportName}]);`)
              //   } else {
              //     error(`Unknown series ${subType}`)
              //   }
              // }
              // }
              return
            }

            // TODO Before multiple tooltips get supported, we do this check to avoid unexpected exception.
            if (mainType === 'tooltip') {
              if (tooltipExists) {
                return
              }
              tooltipExists = true
            }

            if (
              componentModel &&
              componentModel.constructor === ComponentModelClass
            ) {
              componentModel.name = resultItem.keyInfo.name
              // componentModel.settingTask && componentModel.settingTask.dirty();

              componentModel.mergeOption(newCmptOption, this)
              componentModel.optionUpdated(newCmptOption, false)
            } else {
              // PENDING Global as parent ?
              const extraOpt = extend(
                {
                  componentIndex: index,
                },
                resultItem.keyInfo
              )
              componentModel = new ComponentModelClass(
                newCmptOption,
                this,
                this,
                extraOpt
              )
              // Assign `keyInfo`
              extend(componentModel, extraOpt)
              if (resultItem.brandNew) {
                componentModel.__requireNewView = true
              }
              componentModel.init(newCmptOption, this, this)
              // Call optionUpdated after init.
              // newCmptOption has been used as componentModel.option
              // and may be merged with theme and default, so pass null
              // to avoid confusion.
              componentModel.optionUpdated(null, true)
            }
          }

          if (componentModel) {
            optionsByMainType.push(componentModel.option)
            cmptsByMainType.push(componentModel)
            cmptsCountByMainType++
          } else {
            // Always do assign to avoid elided item in array.
            optionsByMainType.push(void 0)
            cmptsByMainType.push(void 0)
          }
        },
        this
      )

      option[mainType] = optionsByMainType
      componentsMap.set(mainType, cmptsByMainType)
      componentsCount.set(mainType, cmptsCountByMainType)

      // Backup series for filtering.
      if (mainType === 'series') {
        reCreateSeriesIndices(this)
      }
    }
  }

  /**
   * Get option for output (cloned option and inner info removed)
   */
  getOption(): GanttUnitOption {
    const option = clone(this.option)

    each(option, function (optInMainType, mainType) {
      if (ComponentModel.hasClass(mainType)) {
        const opts = modelUtil.normalizeToArray(optInMainType)
        // Inner cmpts need to be removed.
        // Inner cmpts might not be at last since ec5.0, but still
        // compatible for users: if inner cmpt at last, splice the returned array.
        let realLen = opts.length
        let metNonInner = false
        for (let i = realLen - 1; i >= 0; i--) {
          // Remove options with inner id.
          if (opts[i] && !modelUtil.isComponentIdInternal(opts[i])) {
            metNonInner = true
          } else {
            opts[i] = null
            !metNonInner && realLen--
          }
        }
        opts.length = realLen
        option[mainType] = opts
      }
    })

    delete option[OPTION_INNER_KEY]
    return option
  }

  getSeriesByType(subType: ComponentSubType): SeriesModel[] {
    return filter(
      this._componentsMap.get('series') as SeriesModel[],
      (oneSeries) => !!oneSeries && oneSeries.subType === subType
    )
  }

  getSeriesByIndex(seriesIndex: number): SeriesModel {
    return this._componentsMap.get('series')[seriesIndex] as SeriesModel
  }

  getSeries(): SeriesModel[] {
    return filter(
      this._componentsMap.get('series') as SeriesModel[],
      (oneSeries) => !!oneSeries
    )
  }

  getLocaleModel(): Model<LocaleOption> {
    return this._locale
  }

  setUpdatePayload(payload: Payload) {
    this._payload = payload
  }

  getUpdatePayload(): Payload {
    return this._payload
  }

  eachRawSeriesByType<T>(
    subType: ComponentSubType,
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void,
    context?: T
  ): void {
    return each(this.getSeriesByType(subType), cb, context)
  }

  isSeriesFiltered(seriesModel: SeriesModel): boolean {
    return this._seriesIndicesMap.get(seriesModel.componentIndex) == null
  }

  eachRawSeries<T>(
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void,
    context?: T
  ): void {
    each(this._componentsMap.get('series'), function (series) {
      series && cb.call(context, series, series.componentIndex)
    })
  }

  /**
   * After filtering, series may be different.
   * from raw series.
   */
  eachSeriesByType<T>(
    subType: ComponentSubType,
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void,
    context?: T
  ): void {
    each(
      this._seriesIndices,
      function (rawSeriesIndex) {
        const series = this._componentsMap.get('series')[
          rawSeriesIndex
        ] as SeriesModel
        if (series.subType === subType) {
          cb.call(context, series, rawSeriesIndex)
        }
      },
      this
    )
  }

  private static internalField = (function () {
    reCreateSeriesIndices = function (piModel: GlobalModel): void {
      const seriesIndices: number[] = (piModel._seriesIndices = [])

      each(piModel._componentsMap.get('series'), function (series) {
        // series may have been removed by `replaceMerge`.
        series && seriesIndices.push(series.componentIndex)
      })
      piModel._seriesIndicesMap = createHashMap(seriesIndices)
    }

    initBase = function (
      piModel: GlobalModel,
      baseOption: GanttUnitOption
    ): void {
      piModel.option = {} as GanttUnitOption
      piModel._componentsMap = createHashMap({ series: [] })
      piModel._componentsCount = createHashMap()
      merge(baseOption, globalDefault, false)
      piModel._mergeOption(baseOption, null)
    }
  })()

  /**
   * @param idx If not specified, return the first one.
   */
  getComponent(mainType: ComponentMainType, idx?: number): ComponentModel {
    const list = this._componentsMap.get(mainType)
    if (list) {
      const cmpt = list[idx || 0]
      if (cmpt) {
        return cmpt
      } else if (idx == null) {
        for (let i = 0; i < list.length; i++) {
          if (list[i]) {
            return list[i]
          }
        }
      }
    }
  }

  queryComponents(condition: QueryConditionKindB): ComponentModel[] {
    const mainType = condition.mainType
    if (!mainType) {
      return []
    }

    const index = condition.index
    const id = condition.id
    const name = condition.name
    const cmpts = this._componentsMap.get(mainType)
    if (!cmpts || !cmpts.length) {
      return []
    }

    let result: ComponentModel[]

    if (index != null) {
      result = []
      each(modelUtil.normalizeToArray(index), function (idx) {
        cmpts[idx] && result.push(cmpts[idx])
      })
    } else if (id != null) {
      result = queryByIdOrName('id', id, cmpts)
    } else if (name != null) {
      result = queryByIdOrName('name', name, cmpts)
    } else {
      // Return all non-empty components in that mainType
      result = filter(cmpts, (cmpt) => !!cmpt)
    }

    return filterBySubType(result, condition)
  }

  findComponents(condition: QueryConditionKindA): ComponentModel[] {
    const query = condition.query
    const mainType = condition.mainType

    const queryCond = getQueryCond(query)
    const result = queryCond
      ? this.queryComponents(queryCond)
      : // Retrieve all non-empty components.
        filter(this._componentsMap.get(mainType), (cmpt) => !!cmpt)

    return doFilter(filterBySubType(result, condition))

    function getQueryCond(
      q: QueryConditionKindA['query']
    ): QueryConditionKindB {
      const indexAttr = mainType + 'Index'
      const idAttr = mainType + 'Id'
      const nameAttr = mainType + 'Name'
      return q &&
        (q[indexAttr] != null || q[idAttr] != null || q[nameAttr] != null)
        ? {
            mainType: mainType,
            // subType will be filtered finally.
            index: q[indexAttr] as number | number[],
            id: q[idAttr] as OptionId | OptionId[],
            name: q[nameAttr] as OptionName | OptionName[],
          }
        : null
    }

    function doFilter(res: ComponentModel[]) {
      return condition.filter ? filter(res, condition.filter) : res
    }
  }

  eachComponent<T>(cb: EachComponentAllCallback, context?: T): void
  eachComponent<T>(
    mainType: string,
    cb: EachComponentInMainTypeCallback,
    context?: T
  ): void
  eachComponent<T>(
    mainType: QueryConditionKindA,
    cb: EachComponentInMainTypeCallback,
    context?: T
  ): void
  eachComponent<T>(
    mainType: string | QueryConditionKindA | EachComponentAllCallback,
    cb?: EachComponentInMainTypeCallback | T,
    context?: T
  ) {
    const componentsMap = this._componentsMap
    if (isFunction(mainType)) {
      const ctxForAll = cb as T
      const cbForAll = mainType as EachComponentAllCallback
      componentsMap.each(function (cmpts, componentType) {
        for (let i = 0; cmpts && i < cmpts.length; i++) {
          const cmpt = cmpts[i]
          cmpt &&
            cbForAll.call(ctxForAll, componentType, cmpt, cmpt.componentIndex)
        }
      })
    } else {
      const cmpts = isString(mainType)
        ? componentsMap.get(mainType)
        : isObject(mainType)
        ? this.findComponents(mainType)
        : null
      for (let i = 0; cmpts && i < cmpts.length; i++) {
        const cmpt = cmpts[i]
        cmpt &&
          (cb as EachComponentInMainTypeCallback).call(
            context,
            cmpt,
            cmpt.componentIndex
          )
      }
    }
  }

  eachSeries<T>(
    cb: (this: T, series: SeriesModel, rawSeriesIndex: number) => void,
    context?: T
  ) {
    each(
      this._seriesIndices,
      function (rawSeriesIndex: number) {
        const series = this._componentsMap.get('series')[
          rawSeriesIndex
        ] as SeriesModel
        cb.call(context, series, rawSeriesIndex)
      },
      this
    )
  }
}

function queryByIdOrName<T extends { id?: string; name?: string }>(
  attr: 'id' | 'name',
  idOrName: string | number | (string | number)[],
  cmpts: T[]
): T[] {
  if (isArray(idOrName)) {
    const keyMap = createHashMap<boolean>()
    each(idOrName, function (idOrNameItem) {
      if (idOrNameItem != null) {
        const idName = modelUtil.convertOptionIdName(idOrNameItem, null)
        idName != null && keyMap.set(idOrNameItem, true)
      }
    })
    return filter(cmpts, (cmpt) => cmpt && keyMap.get(cmpt[attr]))
  } else {
    const idName = modelUtil.convertOptionIdName(idOrName, null)
    return filter(
      cmpts,
      (cmpt) => cmpt && idName != null && cmpt[attr] === idName
    )
  }
}

function filterBySubType(
  components: ComponentModel[],
  condition: QueryConditionKindA | QueryConditionKindB
): ComponentModel[] {
  return condition.hasOwnProperty('subType')
    ? filter(components, (cmpt) => cmpt && cmpt.subType === condition.subType)
    : components
}

function normalizeSetOptionInput(
  opts: GlobalModelSetOptionOpts
): InnerSetOptionOpts {
  const replaceMergeMainTypeMap = createHashMap<boolean, string>()
  return
}

function isNotTargetSeries(
  seriesModel: SeriesModel,
  payload: Payload
): boolean {
  if (payload) {
    const index = payload.seriesIndex
    const id = payload.seriesId
    const name = payload.seriesName
    return (
      (index != null && seriesModel.componentIndex !== index) ||
      (id != null && seriesModel.id !== id) ||
      (name != null && seriesModel.name !== name)
    )
  }
}

export default GlobalModel
