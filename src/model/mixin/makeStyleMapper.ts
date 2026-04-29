import { PathStyleProps } from 'zrender'
import { Dictionary } from 'zrender/lib/core/types'
import Model from '../Model'
import { indexOf } from 'zrender/lib/core/util'

export default function makeStyleMapper(
  properties: readonly string[][],
  ignoreParent?: boolean
) {
  // Normalize
  for (let i = 0; i < properties.length; i++) {
    if (!properties[i][1]) {
      properties[i][1] = properties[i][0]
    }
  }

  ignoreParent = ignoreParent || false

  return function (
    model: Model,
    excludes?: readonly string[],
    includes?: readonly string[]
  ) {
    const style: Dictionary<any> = {}
    for (let i = 0; i < properties.length; i++) {
      const propName = properties[i][1]
      if (
        (excludes && indexOf(excludes, propName) >= 0) ||
        (includes && indexOf(includes, propName) < 0)
      ) {
        continue
      }
      const val = model.getShallow(propName, ignoreParent)
      if (val != null) {
        style[properties[i][0]] = val
      }
    }
    // TODO Text or image?
    return style as PathStyleProps
  }
}
