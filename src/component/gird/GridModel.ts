import { CoordinateSystemHostModel } from '../../core/CoordinateSystem'
import ComponentModel from '../../model/Component'
import {
  BoxLayoutOptionMixin,
  ComponentOption,
  ZRColor,
} from '../../util/types'
import Grid from './Grid'

export interface GridOption extends ComponentOption, BoxLayoutOptionMixin {
  mainType?: 'grid'
  show?: boolean
  backgroundColor?: ZRColor
  borderWidth?: number
  borderColor?: ZRColor
  containLabel?: boolean
}

class GridModel
  extends ComponentModel<GridOption>
  implements CoordinateSystemHostModel
{
  static type = 'grid'

  coordinateSystem: Grid

  static defaultOption: GridOption = {
    show: true,
    z: 0,
    left: '10%',
    top: 60,
    right: '10%',
    bottom: 70,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: '#E2E8ED',
  }
}

export default GridModel
