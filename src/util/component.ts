import * as zrUtil from 'zrender/src/core/util'
import {
  ComponentFullType,
  ComponentMainType,
  ComponentOption,
  ComponentSubType,
  Dictionary,
} from './types'
import { makePrintable } from './log'
import { ClassManager, parseClassType } from './clazz'

let base = Math.round(Math.random() * 10)

/**
 * @public
 * @param {string} type
 * @return {string}
 */
export function getUID(type: string): string {
  return [type || '', base++].join('_')
}

export function enableSubTypeDefaulter(
  target: SubTypeDefaulterManager & ClassManager
): void {
  const subTypeDefaulters: Dictionary<SubTypeDefaulter> = {}

  target.registerSubTypeDefaulter = function (
    componentType: ComponentFullType,
    defaulter: SubTypeDefaulter
  ): void {
    const componentTypeInfo = parseClassType(componentType)
    subTypeDefaulters[componentTypeInfo.main] = defaulter
  }

  target.determineSubType = function (
    componentType: ComponentFullType,
    option: ComponentOption
  ): string {
    let type = option.type
    if (!type) {
      const componentTypeMain = parseClassType(componentType).main
      if (
        target.hasSubTypes(componentType) &&
        subTypeDefaulters[componentTypeMain]
      ) {
        type = subTypeDefaulters[componentTypeMain](option)
      }
    }
    return type
  }
}

export interface TopologicalTravelable<T> {
  topologicalTravel: (
    targetNameList: ComponentMainType[],
    fullNameList: ComponentMainType[],
    callback: (this: T, mainType: string, dependencies: string[]) => void,
    context?: T
  ) => void
}

// ComponentMainType can be 'bb' or 'aa.xx'.
type DepGraphItem = {
  predecessor: ComponentMainType[]
  successor: ComponentMainType[]
  originalDeps: ComponentMainType[]
  entryCount: number
}
type DepGraph = { [cmptMainType: string]: DepGraphItem }

export function enableTopologicalTravel<T>(
  entity: TopologicalTravelable<T>,
  dependencyGetter: (name: ComponentMainType) => ComponentMainType[]
): void {
  /**
   * @param targetNameList Target Component type list.
   *                       Can be ['aa', 'bb', 'aa.xx']
   * @param fullNameList By which we can build dependency graph.
   * @param callback Params: componentType, dependencies.
   * @param context Scope of callback.
   */
  entity.topologicalTravel = function <Ctx>(
    targetNameList: ComponentMainType[],
    fullNameList: ComponentMainType[],
    callback: (
      this: Ctx,
      mainType: ComponentMainType,
      dependencies: ComponentMainType[]
    ) => void,
    context?: Ctx
  ) {
    if (!targetNameList.length) {
      return
    }

    const result = makeDepndencyGraph(fullNameList)
    const graph = result.graph
    const noEntryList = result.noEntryList
    const targetNameSet: { [cmtpMainType: string]: boolean } = {}
    zrUtil.each(targetNameList, function (name) {
      targetNameSet[name] = true
    })

    while (noEntryList.length) {
      const currComponentType = noEntryList.pop()
      const currVertex = graph[currComponentType]
      const isInTargetNameSet = !!targetNameSet[currComponentType]
      if (isInTargetNameSet) {
        callback.call(
          context,
          currComponentType,
          currVertex.originalDeps.slice()
        )
        delete targetNameSet[currComponentType]
      }
      zrUtil.each(
        currVertex.successor,
        isInTargetNameSet ? removeEdgeAndAdd : removeEdge
      )
    }

    zrUtil.each(targetNameSet, function () {
      let errMsg = ''
      // if (__DEV__) {
      errMsg = makePrintable(
        'Circular dependency may exists: ',
        targetNameSet,
        targetNameList,
        fullNameList
      )
      // }
      throw new Error(errMsg)
    })

    function removeEdge(succComponentType: ComponentMainType): void {
      graph[succComponentType].entryCount--
      if (graph[succComponentType].entryCount === 0) {
        noEntryList.push(succComponentType)
      }
    }

    function removeEdgeAndAdd(succComponentType: ComponentMainType): void {
      targetNameSet[succComponentType] = true
      removeEdge(succComponentType)
    }
  }

  function makeDepndencyGraph(fullNameList: ComponentMainType[]) {
    const graph: DepGraph = {}
    const noEntryList: ComponentMainType[] = []

    zrUtil.each(fullNameList, function (name: ComponentMainType) {
      const thisItem = createDependencyGraphItem(graph, name)
      const originalDeps = (thisItem.originalDeps = dependencyGetter(name))

      const availableDeps = getAvailableDependencies(originalDeps, fullNameList)
      thisItem.entryCount = availableDeps.length
      if (thisItem.entryCount === 0) {
        noEntryList.push(name)
      }

      zrUtil.each(availableDeps, function (dependentName) {
        if (zrUtil.indexOf(thisItem.predecessor, dependentName) < 0) {
          thisItem.predecessor.push(dependentName)
        }
        const thatItem = createDependencyGraphItem(graph, dependentName)
        if (zrUtil.indexOf(thatItem.successor, dependentName) < 0) {
          thatItem.successor.push(name)
        }
      })
    })

    return { graph: graph, noEntryList: noEntryList }
  }

  function createDependencyGraphItem(graph: DepGraph, name: ComponentMainType) {
    if (!graph[name]) {
      graph[name] = { predecessor: [], successor: [] } as DepGraphItem
    }
    return graph[name]
  }

  function getAvailableDependencies(
    originalDeps: ComponentMainType[],
    fullNameList: ComponentMainType[]
  ): ComponentMainType[] {
    const availableDeps = [] as ComponentMainType[]
    zrUtil.each(originalDeps, function (dep) {
      zrUtil.indexOf(fullNameList, dep) >= 0 && availableDeps.push(dep)
    })
    return availableDeps
  }
}

export interface SubTypeDefaulter {
  // return subType.
  (option: ComponentOption): ComponentSubType
}

export interface SubTypeDefaulterManager {
  registerSubTypeDefaulter: (
    componentType: string,
    defaulter: SubTypeDefaulter
  ) => void
  determineSubType: (componentType: string, option: ComponentOption) => string
}

export function inheritDefaultOption<T, K>(superOption: T, subOption: K): K {
  return zrUtil.merge(zrUtil.merge({}, superOption, true), subOption, true)
}
