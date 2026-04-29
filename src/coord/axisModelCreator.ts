import { each, merge } from 'zrender/lib/core/util'
import { ExtensionInstallRegisters } from '../../extension'
import OrdinalMeta from '../data/OrdinalMeta'
import ComponentModel from '../model/Component'
import {
  BoxLayoutOptionMixin,
  DimensionName,
  OrdinalRawValue,
} from '../util/types'
import {
  AXIS_TYPES,
  AxisBaseOption,
  CategoryAxisBaseOption,
} from './axisCommonTypes'
import axisDefault from './axisDefault'
import GlobalModel from '../model/Global'
import {
  fetchLayoutMode,
  getLayoutParams,
  mergeLayoutParam,
} from '../util/layout'

type Constructor<T> = new (...args: any[]) => T

export interface AxisModelExtendedInCreator {
  getOrdinalMeta(): OrdinalMeta
  getCategories(
    rawData?: boolean
  ): OrdinalRawValue[] | CategoryAxisBaseOption['data']
}

export default function axisModelCreator<
  AxisOptionT extends AxisBaseOption,
  AxisModelCtor extends Constructor<ComponentModel<AxisOptionT>>
>(
  registers: ExtensionInstallRegisters,
  axisName: DimensionName,
  BaseAxisModelClass: AxisModelCtor,
  extraDefaultOption?: AxisOptionT
) {
  each(AXIS_TYPES, function (v, axisType) {
    const defaultOption = merge(
      merge({}, axisDefault[axisType], true),
      extraDefaultOption,
      true
    )

    class AxisModel
      extends BaseAxisModelClass
      implements AxisModelExtendedInCreator
    {
      static type = axisName + 'Axis.' + axisType
      type = axisName + 'Axis.' + axisType

      static defaultOption = defaultOption

      private __ordinalMeta: OrdinalMeta

      mergeDefaultAndTheme(option: AxisOptionT, piModel: GlobalModel): void {
        const layoutMode = fetchLayoutMode(this)
        const inputPositionParams = layoutMode
          ? getLayoutParams(option as BoxLayoutOptionMixin)
          : {}

        // const themeModel = piModel.getTheme()
        // merge(option, themeModel.get(axisType + 'Axis'))
        merge(option, this.getDefaultOption())
        option.type = getAxisType(option)

        if (layoutMode) {
          mergeLayoutParam(
            option as BoxLayoutOptionMixin,
            inputPositionParams,
            layoutMode
          )
        }
      }

      optionUpdated(): void {
        const thisOption = this.option
        if (thisOption.type === 'category') {
          this.__ordinalMeta = OrdinalMeta.createByAxisModel(this)
        }
      }

      /**
       * Should not be called before all of 'getInitailData' finished.
       * Because categories are collected during initializing data.
       */
      getCategories(
        rawData?: boolean
      ): OrdinalRawValue[] | CategoryAxisBaseOption['data'] {
        const option = this.option
        // FIXME
        // warning if called before all of 'getInitailData' finished.
        if (option.type === 'category') {
          if (rawData) {
            return (option as CategoryAxisBaseOption).data
          }
          return this.__ordinalMeta.categories
        }
      }

      getOrdinalMeta(): OrdinalMeta {
        return this.__ordinalMeta
      }
    }
    registers.registerComponentModel(AxisModel)
  })

  registers.registerSubTypeDefaulter(axisName + 'Axis', getAxisType)
}

function getAxisType(option: AxisBaseOption) {
  // Default axis with data is category axis
  return (
    option.type ||
    ((option as CategoryAxisBaseOption).data ? 'category' : 'value')
  )
}
