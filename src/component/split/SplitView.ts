import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import SplitModel from './SplitModel'
import ExtensionAPI from '../../core/ExtensionAPI'

export default class SplitView extends ComponentView {
  static type = 'split'
  type = SplitView.type

  piModel: GlobalModel

  api: ExtensionAPI

  splitModel: SplitModel

  render(model: SplitModel, piModel: GlobalModel, api: ExtensionAPI): void {
    this.group.removeAll()
    this.splitModel = model
    this.api = api
  }
}
