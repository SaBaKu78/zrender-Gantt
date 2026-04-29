import { Text } from 'zrender'
import GlobalModel from '../../model/Global'
import ComponentView from '../../view/Component'
import TitleModel from './TitleModel'

export default class TitleView extends ComponentView {
  static type = 'title' as const
  type = TitleView.type

  render(model: TitleModel, piModel: GlobalModel): void {
    this.group.removeAll()
    if(!model.get('show')){
      return
    }

    const group = this.group

    const textEl = new Text({
      style: {
        text: model.get('text'),
        fill: '#000'
      },
      z2: 10
    })
    
    group.add(textEl)
  }
}
