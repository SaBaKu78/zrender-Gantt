import { each } from 'zrender/src/core/util'
import { ExtensionInstallRegisters } from '../../../extension'
import GlobalModel from '../../model/Global'
import { findEffectedDataZooms } from './helper'

export default function installDataZoomAction(
  registers: ExtensionInstallRegisters
) {
  registers.registerAction(
    'dataZoom',
    function (payload, piModel: GlobalModel) {
      const effectedModels = findEffectedDataZooms(piModel, payload)
      each(effectedModels, function (dataZoomModel) {
        dataZoomModel.setRawRange({
          start: payload.start,
          end: payload.end,
          startValue: payload.startValue,
          endValue: payload.endValue,
        })
      })
    }
  )
}
