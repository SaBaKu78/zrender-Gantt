import { Payload, ViewRootGroup } from '../util/types'
import * as componentUtil from '../util/component'
import * as clazzUtil from '../util/clazz'
import GlobalModel from '../model/Global'
import ComponentModel from '../model/Component'
import ExtensionAPI from '../core/ExtensionAPI'
import { Element, Group } from 'zrender'
import SeriesModel from '../model/Series'

interface ComponentView {
  findHighDownDispatchers?(name: string): Element[]
  focusBlurEnabled?: boolean
  updateLayout?(model: ComponentModel, api: ExtensionAPI, payload?: any): void
}

class ComponentView {
  readonly group: ViewRootGroup

  readonly uid: string

  __model: ComponentModel
  __alive: boolean
  __id: string

  constructor() {
    this.group = new Group()
    this.uid = componentUtil.getUID('viewComponent')
  }

  init(piModel: GlobalModel, api: ExtensionAPI): void {}

  render(
    model: ComponentModel,
    piModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void {}

  dispose(piModel: GlobalModel, api: ExtensionAPI): void {}

  /**
   * Traverse the new rendered elements.
   *
   * It will traverse the new added element in progressive rendering.
   * And traverse all in normal rendering.
   */
  eachRendered(cb: (el: Element) => boolean | void) {
    const group = this.group
    if (group) {
      group.traverse(cb)
    }
  }

  /**
   * Hook for toggle blur target series.
   * Can be used in marker for blur or leave blur the markers
   */
  toggleBlurSeries(
    seriesModels: SeriesModel[],
    isBlur: boolean,
    ecModel: GlobalModel
  ): void {
    // Do nothing;
  }

  static registerClass: clazzUtil.ClassManager['registerClass']
}

export type ComponentViewConstructor = typeof ComponentView &
  clazzUtil.ExtendableConstructor &
  clazzUtil.ClassManager

clazzUtil.enableClassManagement(ComponentView as ComponentViewConstructor)

export default ComponentView
