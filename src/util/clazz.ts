import * as zrUtil from 'zrender/src/core/util'
import {
  ComponentFullType,
  ComponentMainType,
  ComponentSubType,
  ComponentTypeInfo,
} from './types'

const TYPE_DELIMITER = '.'
const IS_EXTENDED_CLASS = '___PI__EXTENDED_CLASS___' as const
const IS_CONTAINER = '___PI__COMPONENT__CONTAINER___' as const

export type Constructor = new (...args: any) => any

type SubclassContainer = { [subType: string]: Constructor } & {
  [IS_CONTAINER]?: true
}

export interface ClassManager {
  registerClass: (clz: Constructor) => Constructor
  getClass: (
    componentMainType: ComponentMainType,
    subType?: ComponentSubType,
    throwWhenNotFound?: boolean
  ) => Constructor
  getClassesByMainType: (componentType: ComponentMainType) => Constructor[]
  hasClass: (componentType: ComponentFullType) => boolean
  getAllClassMainTypes: () => ComponentMainType[]
  hasSubTypes: (componentType: ComponentFullType) => boolean
}

function checkClassType(componentType: ComponentFullType): void {
  zrUtil.assert(
    /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(componentType),
    'componentType "' + componentType + '" illegal'
  )
}

export function isExtendedClass(clz: any): boolean {
  return !!(clz && clz[IS_EXTENDED_CLASS])
}

export function parseClassType(
  componentType: ComponentFullType
): ComponentTypeInfo {
  const ret = { main: '', sub: '' }
  if (componentType) {
    const typeArr = componentType.split(TYPE_DELIMITER)
    ret.main = typeArr[0] || ''
    ret.sub = typeArr[1] || ''
  }
  return ret
}

export interface ExtendableConstructor {
  new (...args: any): any
  $constructor?: new (...args: any) => any
  extend: (proto: { [name: string]: any }) => ExtendableConstructor
  superCall: (context: any, methodName: string, ...args: any) => any
  superApply: (context: any, methodName: string, args: []) => any
  superClass?: ExtendableConstructor
  [IS_EXTENDED_CLASS]?: boolean
}

export function enableClassManagement(target: ClassManager): void {
  const storage: {
    [componentMainType: string]: Constructor | SubclassContainer
  } = {}

  target.registerClass = function (clz: Constructor): Constructor {
    const componentFullType = (clz as any).type || clz.prototype.type
    if (componentFullType) {
      checkClassType(componentFullType)

      clz.prototype.type = componentFullType

      const componentTypeInfo = parseClassType(componentFullType)
      if (!componentTypeInfo.sub) {
        if (storage[componentTypeInfo.main]) {
          console.warn(componentTypeInfo.main + ' exists.')
        }
        storage[componentTypeInfo.main] = clz
      } else if (componentTypeInfo.sub !== IS_CONTAINER) {
        const container = makeContainer(componentTypeInfo)
        container[componentTypeInfo.sub] = clz
      }
    }
    return clz
  }

  target.getClass = function (
    mainType: ComponentMainType,
    subType?: ComponentSubType,
    throwWhenNotFound?: boolean
  ): Constructor {
    let clz = storage[mainType]

    if (clz && (clz as SubclassContainer)[IS_CONTAINER]) {
      clz = subType ? (clz as SubclassContainer)[subType] : null
    }
    return clz as Constructor
  }

  target.getAllClassMainTypes = function (): ComponentMainType[] {
    const types: string[] = []
    zrUtil.each(storage, function (obj, type) {
      types.push(type)
    })
    return types
  }

  target.getClassesByMainType = function (
    componentType: ComponentFullType
  ): Constructor[] {
    const componentTypeInfo = parseClassType(componentType)

    const result: Constructor[] = []
    const obj = storage[componentTypeInfo.main]
    if (obj && (obj as SubclassContainer)[IS_CONTAINER]) {
      zrUtil.each(obj as SubclassContainer, function (o, type) {
        type !== IS_CONTAINER && result.push(o as Constructor)
      })
    } else {
      result.push(obj as Constructor)
    }

    return result
  }

  target.hasClass = function (componentType: ComponentFullType): boolean {
    const componentTypeInfo = parseClassType(componentType)
    return !!storage[componentTypeInfo.main]
  }

  /**
   * If a main type is container and has sub types
   */
  target.hasSubTypes = function (componentType: ComponentFullType): boolean {
    const componentTypeInfo = parseClassType(componentType)
    const obj = storage[componentTypeInfo.main]
    return obj && (obj as SubclassContainer)[IS_CONTAINER]
  }

  function makeContainer(
    componentTypeInfo: ComponentTypeInfo
  ): SubclassContainer {
    let container = storage[componentTypeInfo.main]
    if (!container || !(container as SubclassContainer)[IS_CONTAINER]) {
      container = storage[componentTypeInfo.main] = {}
      container[IS_CONTAINER] = true
    }
    return container as SubclassContainer
  }
}
