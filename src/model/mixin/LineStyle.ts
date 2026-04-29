import { PathStyleProps } from 'zrender'
import Model from '../Model'
import { LineStyleOption } from '../../util/types'
import makeStyleMapper from './makeStyleMapper'

export const LINE_STYLE_KEY_MAP = [
  ['lineWidth', 'width'],
  ['stroke', 'color'],
  ['opacity'],
  ['shadowBlur'],
  ['shadowOffsetX'],
  ['shadowOffsetY'],
  ['shadowColor'],
  ['lineDash', 'type'],
  ['lineDashOffset', 'dashOffset'],
  ['lineCap', 'cap'],
  ['lineJoin', 'join'],
  ['miterLimit'],
]

const getLineStyle = makeStyleMapper(LINE_STYLE_KEY_MAP)

type LineStyleKeys =
  | 'lineWidth'
  | 'stroke'
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

export type LineStyleProps = Pick<PathStyleProps, LineStyleKeys>

class LineStyleMixin {
  getLineStyle(
    this: Model,
    excludes?: readonly (keyof LineStyleOption)[]
  ): LineStyleProps {
    return getLineStyle(this, excludes)
  }
}

export { LineStyleMixin }
