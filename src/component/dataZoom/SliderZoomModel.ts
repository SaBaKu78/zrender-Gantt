import { ExtensionInstallRegisters } from '../../../extension'
import { inheritDefaultOption } from '../../util/component'
import {
  AreaStyleOption,
  BoxLayoutOptionMixin,
  ItemStyleOption,
  LabelOption,
  LineStyleOption,
  ZRColor,
} from '../../util/types'
import DataZoomModel, { DataZoomOption } from './DataZoomModel'
import installCommon from './installCommon'
import SliderZoomView from './SliderZoomView'

export interface SliderDataZoomOption
  extends DataZoomOption,
    BoxLayoutOptionMixin {
  show?: boolean
  backgroundColor?: ZRColor
  borderRadius?: number | number[]
  dataBackground?: {
    lineStyle?: LineStyleOption
    areaStyle?: AreaStyleOption
  }

  selectedDataBackground?: {
    lineStyle?: LineStyleOption
    areaStyle?: AreaStyleOption
  }
  fillerColor?: ZRColor
  handleIcon?: string

  handleSize?: string | number

  handleStyle?: ItemStyleOption
  moveHandleIcon?: string
  moveHandleStyle?: ItemStyleOption
  moveHandleSize?: number
  brushSelect?: boolean
  brushStyle?: ItemStyleOption
  showDetail?: boolean
  showDataShadow?: 'auto' | boolean
  borderColor?: ZRColor
  textStyle?: LabelOption

  labelPrecision?: number | 'auto'

  labelFormatter?: string | ((value: number, valueStr: string) => string)
  emphasis?: {
    handleStyle?: ItemStyleOption
    moveHandleStyle?: ItemStyleOption
  }
  zoomLock?: boolean
}

class SliderZoomModel extends DataZoomModel<SliderDataZoomOption> {
  static readonly type = 'dataZoom.slider'
  type = SliderZoomModel.type

  static readonly layoutMode = 'box'

  static defaultOption: SliderDataZoomOption = inheritDefaultOption(
    DataZoomModel.defaultOption,
    {
      show: true,
      right: 'ph', // Default align to grid rect.
      top: 'ph', // Default align to grid rect.
      width: 'ph', // Default align to grid rect.
      height: 'ph', // Default align to grid rect.
      left: null, // Default align to grid rect.
      bottom: null, // Default align to grid rect.

      borderColor: '#d2dbee',
      borderRadius: 3,

      backgroundColor: 'rgba(47,69,84,0)', // Background of slider zoom component.

      // dataBackgroundColor: '#ddd',
      dataBackground: {
        lineStyle: {
          color: '#d2dbee',
          width: 0.5,
        },
        areaStyle: {
          color: '#d2dbee',
          opacity: 0.2,
        },
      },

      selectedDataBackground: {
        lineStyle: {
          color: '#8fb0f7',
          width: 0.5,
        },
        areaStyle: {
          color: '#8fb0f7',
          opacity: 0.2,
        },
      },

      // Color of selected window.
      fillerColor: 'rgba(135,175,274,0.2)',
      handleIcon:
        'path://M-9.35,34.56V42m0-40V9.5m-2,0h4a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-4a2,2,0,0,1-2-2v-21A2,2,0,0,1-11.35,9.5Z',
      // Percent of the slider height
      handleSize: '100%',

      handleStyle: {
        color: '#fff',
        borderColor: '#ACB8D1',
      },

      moveHandleSize: 7,
      moveHandleIcon:
        'path://M-320.9-50L-320.9-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-348-41-339-50-320.9-50z M-212.3-50L-212.3-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-239.4-41-230.4-50-212.3-50z M-103.7-50L-103.7-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-130.9-41-121.8-50-103.7-50z',
      moveHandleStyle: {
        color: '#D2DBEE',
        opacity: 0.7,
      },

      showDetail: true,
      showDataShadow: 'auto', // Default auto decision.
      realtime: true,
      zoomLock: false, // Whether disable zoom.

      textStyle: {
        color: '#6E7079',
      },

      brushSelect: true,
      brushStyle: {
        color: 'rgba(135,175,274,0.15)',
      },

      emphasis: {
        handleStyle: {
          borderColor: '#8FB0F7',
        },
        moveHandleStyle: {
          color: '#8FB0F7',
        },
      },
    } as SliderDataZoomOption
  )
}

export default SliderZoomModel

export function install(registers: ExtensionInstallRegisters) {
  registers.registerComponentModel(SliderZoomModel)
  registers.registerComponentView(SliderZoomView)
  installCommon(registers)
}
