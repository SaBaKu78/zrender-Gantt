import { ExtensionInstallRegisters } from "../../../extension";
import GlobalModel from "../../model/Global";
import ExtensionAPI from "../../core/ExtensionAPI";

export default function installSliderSplitXAction(registers: ExtensionInstallRegisters) {
  registers.registerAction({
    type: 'updateXAxisPosition',
  }, function(payload: any, model: GlobalModel, api: ExtensionAPI) {
    const newY = payload.data?.y
    if (newY == null) return

    api.getZr().refresh()
  })
}