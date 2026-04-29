import { ExtensionInstallRegisters } from "../../../extension";
import installDataZoomAction from "./dataZoomAction";
import dataZoomProcessor from "./dataZoomProcessor";

let installed = false;
export default function installCommon(registers: ExtensionInstallRegisters) {
    if (installed) {
        return;
    }
    installed = true;

    registers.registerProcessor(registers.PRIORITY.PROCESSOR.FILTER, dataZoomProcessor);

    installDataZoomAction(registers);

    registers.registerSubTypeDefaulter('dataZoom', function () {
        // Default 'slider' when no type specified.
        return 'slider';
    });
}