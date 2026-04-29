import ExtensionAPI from '../../core/ExtensionAPI'
import GlobalModel from '../../model/Global'
import { Payload } from '../../util/types'
import ComponentView from '../../view/Component'
import DataZoomModel from './DataZoomModel'

class DataZoomView extends ComponentView {
  static type = 'dataZoom'
  type = DataZoomView.type

  dataZoomModel: DataZoomModel
  piModel: GlobalModel
  api: ExtensionAPI

  render(
    dataZoomModel: DataZoomModel,
    piModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ) {
    this.dataZoomModel = dataZoomModel
    this.piModel = piModel
    this.api = api
  }
}

export default DataZoomView
