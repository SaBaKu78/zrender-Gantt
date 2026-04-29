import {
  CoordinateSystemCreator,
  CoordinateSystemMaster,
} from '../coord/CoordinateSystem'
import GlobalModel from '../model/Global'
import * as zrUtil from 'zrender/src/core/util'
import ExtensionAPI from './ExtensionAPI'
import ComponentModel from '../model/Component'

const coordinateSystemCreators: { [type: string]: CoordinateSystemCreator } = {}

class CoordinateSystemManager {
  private _coordinateSystems: CoordinateSystemMaster[] = []

  create(piModel: GlobalModel, api: ExtensionAPI): void {
    let coordinateSystems: CoordinateSystemMaster[] = []
    zrUtil.each(coordinateSystemCreators, function (creator, type) {
      const list = creator.create(piModel, api)
      coordinateSystems = coordinateSystems.concat(list || [])
    })
    this._coordinateSystems = coordinateSystems
  }

  update(piModel: GlobalModel, api: ExtensionAPI) {
    zrUtil.each(this._coordinateSystems, function (coordSys) {
      coordSys?.update && coordSys.update(piModel, api)
    })
  }

  getCoordinateSystems(): CoordinateSystemMaster[] {
    return this._coordinateSystems.slice()
  }

  static register = function (
    type: string,
    creator: CoordinateSystemCreator
  ): void {
    coordinateSystemCreators[type] = creator
  }

  static get = function (type: string): CoordinateSystemCreator {
    return coordinateSystemCreators[type]
  }
}

export interface CoordinateSystemHostModel extends ComponentModel {
  coordinateSystem?: CoordinateSystemMaster
}

export default CoordinateSystemManager
