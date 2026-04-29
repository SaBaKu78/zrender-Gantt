import { ExtensionInstallRegisters } from "../../../extension";
import CustomSeriesModel from "./CustomModel";
import CustomSeriesView from "./CustomView";

export function install(registers: ExtensionInstallRegisters){
  registers.registerChartView(CustomSeriesView)
  registers.registerSeriesModel(CustomSeriesModel)
}