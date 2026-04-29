import GlobalModel from "../../model/Global";
import ComponentView from "../../view/Component";
import GridModel from "./GridModel";

class GridView extends ComponentView {
  static readonly type = 'grid'
  readonly type = 'grid'

  render(gridModel: GridModel, piModel: GlobalModel){
    this.group.removeAll()
    // if(gridModel.get('show')){
    // }
    // this.group.add(new Rect({

    // }))
  }

}

export default GridView