import { getFont } from '../../label/labelStyle'
import { ColorString, LabelOption } from '../../util/types'
import Model from '../Model'

const PATH_COLOR = ['textStyle', 'color'] as const


export type LabelFontOption = Pick<LabelOption, 'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'>

class TextStyleMixin {
  getTextColor(this: Model, isEmphasis?: boolean): ColorString {
    const piModel = this.piModel
    return (
      this.getShallow('color') ||
      (!isEmphasis && piModel ? piModel.get(PATH_COLOR) : null)
    )
  }

  getFont(this: Model<LabelFontOption>) {
    return getFont(
      {
        fontStyle: this.getShallow('fontStyle'),
        fontWeight: this.getShallow('fontWeight'),
        fontSize: this.getShallow('fontSize'),
        fontFamily: this.getShallow('fontFamily'),
      },
      this.piModel
    )
  }
}

export default TextStyleMixin
