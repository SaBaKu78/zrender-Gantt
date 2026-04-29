import { TextStyleProps } from 'zrender'
import Model from '../model/Model'
import { extend, keys, retrieve2, trim } from 'zrender/src/core/util'
import {
  ColorString,
  Dictionary,
  LabelOption,
  TextCommonOption,
  ZRStyleProps,
} from '../util/types'
import GlobalModel from '../model/Global'

type TextCommonParams = {
  /**
   * Whether disable drawing box of block (outer most).
   */
  disableBox?: boolean
  /**
   * Specify a color when color is 'inherit',
   * If inheritColor specified, it is used as default textFill.
   */
  inheritColor?: ColorString

  /**
   * Specify a opacity when opacity is not given.
   */
  defaultOpacity?: number

  defaultOutsidePosition?: LabelOption['position']

  /**
   * If support legacy 'auto' for 'inherit' usage.
   */
  // supportLegacyAuto?: boolean

  textStyle?: ZRStyleProps
}

const EMPTY_OBJ = {}

const TEXT_PROPS_WITH_GLOBAL = [
  'fontStyle',
  'fontWeight',
  'fontSize',
  'fontFamily',
  'textShadowColor',
  'textShadowBlur',
  'textShadowOffsetX',
  'textShadowOffsetY',
] as const
const TEXT_PROPS_SELF = [
  'align',
  'lineHeight',
  'width',
  'height',
  'tag',
  'verticalAlign',
  'ellipsis',
] as const
const TEXT_PROPS_BOX = [
  'padding',
  'borderWidth',
  'borderRadius',
  'borderDashOffset',
  'backgroundColor',
  'borderColor',
  'shadowColor',
  'shadowBlur',
  'shadowOffsetX',
  'shadowOffsetY',
] as const

export function createTextStyle(
  textStyleModel: Model,
  specifiedTextStyle?: TextStyleProps, // Fixed style in the code. Can't be set by model.
  opt?: Pick<TextCommonParams, 'inheritColor' | 'disableBox'>,
  isNotNormal?: boolean,
  isAttached?: boolean // If text is attached on an element. If so, auto color will handling in zrender.
) {
  const textStyle: TextStyleProps = {}
  setTextStyleCommon(textStyle, textStyleModel, opt, isNotNormal, isAttached)
  specifiedTextStyle && extend(textStyle, specifiedTextStyle)
  // textStyle.host && textStyle.host.dirty && textStyle.host.dirty(false);
  return textStyle
}

function setTextStyleCommon(
  textStyle: TextStyleProps,
  textStyleModel: Model,
  opt?: Pick<
    TextCommonParams,
    'inheritColor' | 'defaultOpacity' | 'disableBox'
  >,
  isNotNormal?: boolean,
  isAttached?: boolean
) {
  // Consider there will be abnormal when merge hover style to normal style if given default value.
  opt = opt || EMPTY_OBJ
  const ecModel = textStyleModel.piModel
  const globalTextStyle = ecModel && ecModel.option.textStyle
  // Consider case:
  // {
  //     data: [{
  //         value: 12,
  //         label: {
  //             rich: {
  //                 // no 'a' here but using parent 'a'.
  //             }
  //         }
  //     }],
  //     rich: {
  //         a: { ... }
  //     }
  // }
  const richItemNames = getRichItemNames(textStyleModel)
  let richResult: TextStyleProps['rich']
  if (richItemNames) {
    richResult = {}
    for (const name in richItemNames) {
      if (richItemNames.hasOwnProperty(name)) {
        // Cascade is supported in rich.
        const richTextStyle = textStyleModel.getModel(['rich', name])
        // In rich, never `disableBox`.
        // FIXME: consider `label: {formatter: '{a|xx}', color: 'blue', rich: {a: {}}}`,
        // the default color `'blue'` will not be adopted if no color declared in `rich`.
        // That might confuses users. So probably we should put `textStyleModel` as the
        // root ancestor of the `richTextStyle`. But that would be a break change.
        setTokenTextStyle(
          (richResult[name] = {}),
          richTextStyle,
          globalTextStyle,
          opt,
          isNotNormal,
          isAttached,
          false,
          true
        )
      }
    }
  }
  if (richResult) {
    textStyle.rich = richResult
  }
  const overflow = textStyleModel.get('overflow')
  if (overflow) {
    textStyle.overflow = overflow
  }
  const margin = textStyleModel.get('minMargin')
  if (margin != null) {
    textStyle.margin = margin
  }
  setTokenTextStyle(
    textStyle,
    textStyleModel,
    globalTextStyle,
    opt,
    isNotNormal,
    isAttached,
    true,
    false
  )
}

function setTokenTextStyle(
  textStyle: TextStyleProps['rich'][string],
  textStyleModel: Model<LabelOption>,
  globalTextStyle: LabelOption,
  opt?: Pick<
    TextCommonParams,
    'inheritColor' | 'defaultOpacity' | 'disableBox'
  >,
  isNotNormal?: boolean,
  isAttached?: boolean,
  isBlock?: boolean,
  inRich?: boolean
) {
  // In merge mode, default value should not be given.
  globalTextStyle = (!isNotNormal && globalTextStyle) || EMPTY_OBJ
  const inheritColor = opt && opt.inheritColor
  let fillColor = textStyleModel.getShallow('color')
  let strokeColor = textStyleModel.getShallow('textBorderColor')
  let opacity = retrieve2(
    textStyleModel.getShallow('opacity'),
    globalTextStyle.opacity
  )
  if (fillColor === 'inherit' || fillColor === 'auto') {
    if (inheritColor) {
      fillColor = inheritColor
    } else {
      fillColor = null
    }
  }
  if (strokeColor === 'inherit' || strokeColor === 'auto') {
    if (inheritColor) {
      strokeColor = inheritColor
    } else {
      strokeColor = null
    }
  }
  if (!isAttached) {
    // Only use default global textStyle.color if text is individual.
    // Otherwise it will use the strategy of attached text color because text may be on a path.
    fillColor = fillColor || globalTextStyle.color
    strokeColor = strokeColor || globalTextStyle.textBorderColor
  }
  if (fillColor != null) {
    textStyle.fill = fillColor
  }
  if (strokeColor != null) {
    textStyle.stroke = strokeColor
  }
  const textBorderWidth = retrieve2(
    textStyleModel.getShallow('textBorderWidth'),
    globalTextStyle.textBorderWidth
  )
  if (textBorderWidth != null) {
    textStyle.lineWidth = textBorderWidth
  }
  const textBorderType = retrieve2(
    textStyleModel.getShallow('textBorderType'),
    globalTextStyle.textBorderType
  )
  if (textBorderType != null) {
    textStyle.lineDash = textBorderType as any
  }
  const textBorderDashOffset = retrieve2(
    textStyleModel.getShallow('textBorderDashOffset'),
    globalTextStyle.textBorderDashOffset
  )
  if (textBorderDashOffset != null) {
    textStyle.lineDashOffset = textBorderDashOffset
  }

  if (!isNotNormal && opacity == null && !inRich) {
    opacity = opt && opt.defaultOpacity
  }
  if (opacity != null) {
    textStyle.opacity = opacity
  }

  // TODO
  if (!isNotNormal && !isAttached) {
    // Set default finally.
    if (textStyle.fill == null && opt.inheritColor) {
      textStyle.fill = opt.inheritColor
    }
  }
  // Do not use `getFont` here, because merge should be supported, where
  // part of these properties may be changed in emphasis style, and the
  // others should remain their original value got from normal style.
  for (let i = 0; i < TEXT_PROPS_WITH_GLOBAL.length; i++) {
    const key = TEXT_PROPS_WITH_GLOBAL[i]
    const val = retrieve2(textStyleModel.getShallow(key), globalTextStyle[key])
    if (val != null) {
      ;(textStyle as any)[key] = val
    }
  }
  for (let i = 0; i < TEXT_PROPS_SELF.length; i++) {
    const key = TEXT_PROPS_SELF[i]
    const val = textStyleModel.getShallow(key)
    if (val != null) {
      ;(textStyle as any)[key] = val
    }
  }
  if (textStyle.verticalAlign == null) {
    const baseline = textStyleModel.getShallow('baseline')
    if (baseline != null) {
      textStyle.verticalAlign = baseline
    }
  }
  if (!isBlock || !opt.disableBox) {
    for (let i = 0; i < TEXT_PROPS_BOX.length; i++) {
      const key = TEXT_PROPS_BOX[i]
      const val = textStyleModel.getShallow(key)
      if (val != null) {
        ;(textStyle as any)[key] = val
      }
    }

    const borderType = textStyleModel.getShallow('borderType')
    if (borderType != null) {
      textStyle.borderDash = borderType as any
    }

    if (
      (textStyle.backgroundColor === 'auto' ||
        textStyle.backgroundColor === 'inherit') &&
      inheritColor
    ) {
      textStyle.backgroundColor = inheritColor
    }
    if (
      (textStyle.borderColor === 'auto' ||
        textStyle.borderColor === 'inherit') &&
      inheritColor
    ) {
      textStyle.borderColor = inheritColor
    }
  }
}

function getRichItemNames(textStyleModel: Model<LabelOption>) {
  // Use object to remove duplicated names.
  let richItemNameMap: Dictionary<number>
  while (textStyleModel && textStyleModel !== textStyleModel.piModel) {
    const rich = (textStyleModel.option || (EMPTY_OBJ as LabelOption)).rich
    if (rich) {
      richItemNameMap = richItemNameMap || {}
      const richKeys = keys(rich)
      for (let i = 0; i < richKeys.length; i++) {
        const richKey = richKeys[i]
        richItemNameMap[richKey] = 1
      }
    }
    textStyleModel = textStyleModel.parentModel
  }
  return richItemNameMap
}

export function getFont(
  opt: Pick<
    TextCommonOption,
    'fontStyle' | 'fontWeight' | 'fontSize' | 'fontFamily'
  >,
  piModel: GlobalModel
) {
  const gTextStyleModel = piModel && piModel.getModel('textStyle')
  return trim(
    [
      // FIXME in node-canvas fontWeight is before fontStyle
      opt.fontStyle ||
        (gTextStyleModel && gTextStyleModel.getShallow('fontStyle')) ||
        '',
      opt.fontWeight ||
        (gTextStyleModel && gTextStyleModel.getShallow('fontWeight')) ||
        '',
      (opt.fontSize ||
        (gTextStyleModel && gTextStyleModel.getShallow('fontSize')) ||
        12) + 'px',
      opt.fontFamily ||
        (gTextStyleModel && gTextStyleModel.getShallow('fontFamily')) ||
        'sans-serif',
    ].join(' ')
  )
}
