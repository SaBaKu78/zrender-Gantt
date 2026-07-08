import { ExtensionInstallRegisters } from "../../../extension";
import installSliderSplitXAction from "./sliderSplitXAction";
import installSliderSplitYAction from "./sliderSplitYAction";

let installed = false
export default function installCommon(registers: ExtensionInstallRegisters){
  if (installed) {
    return;
  }
  installed = true;
  installSliderSplitXAction(registers)
  installSliderSplitYAction(registers)
}