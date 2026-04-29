import ComponentModel from "../../model/Component";
import { ComponentOption, LayoutOrient, ZRColor } from "../../util/types";


export interface SplitOption extends ComponentOption {
  mainType?: 'split'

  show?: boolean

  orient?: LayoutOrient
}


export default class SplitModel<Opts extends SplitOption = SplitOption> extends ComponentModel<Opts> {
  static type = 'split'
  type = SplitModel.type

  static dependencies = []

  private _orient: LayoutOrient

  static defaultOption: SplitOption = {
    z: 10,
  }

  getOrient(): LayoutOrient {
    return this._orient
  }
}