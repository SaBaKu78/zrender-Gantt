import { AxisBaseModel } from '../../coord/AxisBaseModel'
import ExtensionAPI from '../../core/ExtensionAPI'
import ComponentModel from '../../model/Component'
import GlobalModel from '../../model/Global'
import { Payload } from '../../util/types'
import ComponentView from '../../view/Component'

class AxisView extends ComponentView {
  static type = 'axis'
  type = AxisView.type

  render(
    axisModel: AxisBaseModel,
    piModel: GlobalModel,
    api: ExtensionAPI,
    payload: Payload
  ): void {
    super.render.apply(this, arguments as any)
  }
}

export default AxisView
