import { PathStyleProps } from 'zrender'
import { ItemStyleOption } from '../../util/types'
import Model from '../Model'
import makeStyleMapper from './makeStyleMapper'

export const ITEM_STYLE_KEY_MAP = [
  ['fill', 'color'],
  ['stroke', 'borderColor'],
  ['lineWidth', 'borderWidth'],
  ['opacity'],
  ['shadowBlur'],
  ['shadowOffsetX'],
  ['shadowOffsetY'],
  ['shadowColor'],
  ['lineDash', 'borderType'],
  ['lineDashOffset', 'borderDashOffset'],
  ['lineCap', 'borderCap'],
  ['lineJoin', 'borderJoin'],
  ['miterLimit', 'borderMiterLimit'],
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
]

const getItemStyle = makeStyleMapper(ITEM_STYLE_KEY_MAP)

export type ItemStyleProps = Pick<PathStyleProps, ItemStyleKeys>

type ItemStyleKeys =
  | 'fill'
  | 'stroke'
  | 'decal'
  | 'lineWidth'
  | 'opacity'
  | 'shadowBlur'
  | 'shadowOffsetX'
  | 'shadowOffsetY'
  | 'shadowColor'
  | 'lineDash'
  | 'lineDashOffset'
  | 'lineCap'
  | 'lineJoin'
  | 'miterLimit'
class ItemStyleMixin {
  getItemStyle(
    this: Model,
    excludes?: readonly (keyof ItemStyleOption)[],
    includes?: readonly (keyof ItemStyleOption)[]
  ): ItemStyleProps {
    return getItemStyle(this, excludes, includes)
  }
}

export { ItemStyleMixin }
