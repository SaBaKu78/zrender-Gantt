import { each, indexOf, isArray, isFunction } from 'zrender/src/core/util'
import ComponentModel from './src/model/Component'
import { Constructor } from './src/util/clazz'
import ComponentView from './src/view/Component'
import { SubTypeDefaulter } from './src/util/component'
import { registerAction, registerPreprocessor, registerProcessor } from './src/core/Gantt'
import SeriesModel from './src/model/Series'
import ChartView from './src/view/Chart'
import { PRIORITY } from './src/util/number'

const extensions: (ExtensionInstaller | Extension)[] = []
const extensionRegisters = {
  registerProcessor,
  registerPreprocessor,
  registerAction,
  PRIORITY,
  registerComponentView(ComponentViewClass: typeof ComponentView) {
    ComponentView.registerClass(ComponentViewClass)
  },
  registerComponentModel(ComponentModelClass: Constructor) {
    ComponentModel.registerClass(ComponentModelClass)
  },
  registerSeriesModel(SeriesModelClass: Constructor) {
    SeriesModel.registerClass(SeriesModelClass)
  },
  registerChartView(ChartViewClass: typeof ChartView){
    ChartView.registerClass(ChartViewClass)
  },
  registerSubTypeDefaulter(componentType: string, defaulter: SubTypeDefaulter) {
    ComponentModel.registerSubTypeDefaulter(componentType, defaulter)
  },
}

export type ExtensionInstallRegisters = typeof extensionRegisters

export type ExtensionInstaller = (pi: ExtensionInstallRegisters) => void
export interface Extension {
  install: ExtensionInstaller
}

export function use(
  ext: ExtensionInstaller | Extension | (ExtensionInstaller | Extension)[]
) {
  if (isArray(ext)) {
    each(ext, (singleExt) => {
      use(singleExt)
    })
    return
  }

  if (indexOf(extensions, ext) >= 0) {
    return
  }
  extensions.push(ext)
  if (isFunction(ext)) {
    ext = {
      install: ext,
    }
  }
  ext.install(extensionRegisters)
}

export default extensionRegisters
