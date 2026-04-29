import { PathStyleProps } from 'zrender'
import { AreaStyleOption } from '../../util/types'
import Model from '../Model'
import makeStyleMapper from './makeStyleMapper'

export const AREA_STYLE_KEY_MAP = [
  ['fill', 'color'],
  ['shadowBlur'],
  ['shadowOffsetX'],
  ['shadowOffsetY'],
  ['opacity'],
  ['shadowColor'],
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
]
const getAreaStyle = makeStyleMapper(AREA_STYLE_KEY_MAP)

type AreaStyleProps = Pick<
  PathStyleProps,
  | 'fill'
  | 'shadowBlur'
  | 'shadowOffsetX'
  | 'shadowOffsetY'
  | 'opacity'
  | 'shadowColor'
>

class AreaStyleMixin {
  getAreaStyle(
    this: Model,
    excludes?: readonly (keyof AreaStyleOption)[],
    includes?: readonly (keyof AreaStyleOption)[]
  ): AreaStyleProps {
    return getAreaStyle(this, excludes, includes)
  }
}

export { AreaStyleMixin }
