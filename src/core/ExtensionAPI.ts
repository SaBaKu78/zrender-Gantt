import { Element } from 'zrender'
import GlobalModel from '../model/Global'
import { GanttType } from './Gantt'
import * as zrUtil from 'zrender/src/core/util'
import ComponentModel from '../model/Component'
import ComponentView from '../view/Component'
import SeriesModel from '../model/Series'
import ChartView from '../view/Chart'

const availableMethods: (keyof GanttType)[] = [
  'getZr',
  'getWidth',
  'getHeight',
  'getOption',
  'getComponentViewMap',
  'isDisposed',
  'dispatchAction',
]

interface ExtensionAPI
  extends Pick<GanttType, (typeof availableMethods)[number]> {}

abstract class ExtensionAPI {
  constructor(piInstance: GanttType) {
    zrUtil.each(
      availableMethods,
      function (methodName: string) {
        ;(this as any)[methodName] = zrUtil.bind(
          (piInstance as any)[methodName],
          piInstance
        )
      },
      this
    )
  }

  abstract getModel(): GlobalModel
  abstract enterEmphasis(el: Element, highlightDigit?: number): void
  abstract leaveEmphasis(el: Element, highlightDigit?: number): void
  abstract getViewOfComponentModel(
    componentModel: ComponentModel
  ): ComponentView
  abstract getViewOfSeriesModel(seriesModel: SeriesModel): ChartView
}

export default ExtensionAPI
