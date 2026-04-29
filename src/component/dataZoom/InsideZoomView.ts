import { bind } from 'zrender/src/core/util'
import { AxisBaseModel } from '../../coord/AxisBaseModel'
import ExtensionAPI from '../../core/ExtensionAPI'
import GlobalModel from '../../model/Global'
import RoamController, { RoamEventParams } from '../helper/RoamController'
import sliderMove from '../helper/sliderMove'
import DataZoomView from './DataZoomView'
import { DataZoomCoordSysMainType, DataZoomReferCoordSysInfo } from './helper'
import InsideZoomModel from './InsideZoomModel'
import * as roams from './roams'

class InsideZoomView extends DataZoomView {
  static type = 'dataZoom.inside'
  type = 'dataZoom.inside'

  range: number[]

  render(
    dataZoomModel: InsideZoomModel,
    piModel: GlobalModel,
    api: ExtensionAPI
  ): void {
    super.render.apply(this, arguments)

    if (dataZoomModel.noTarget()) {
      this._clear()
      return
    }

    this.range = dataZoomModel.getPercentRange()

    roams.setViewInfoToCoordSysRecord(api, dataZoomModel, {
      pan: bind(getRangeHandlers.pan, this),
      zoom: bind(getRangeHandlers.zoom, this),
      scrollMove: bind(getRangeHandlers.scrollMove, this),
    })
  }

  private _clear() {}
}

interface DataZoomGetRangeHandler<
  T extends
    | RoamEventParams['zoom']
    | RoamEventParams['scrollMove']
    | RoamEventParams['pan']
> {
  (
    coordSysInfo: DataZoomReferCoordSysInfo,
    coordSysMainType: DataZoomCoordSysMainType,
    controller: RoamController,
    e: T
  ): [number, number]
}

const getRangeHandlers: {
  pan: DataZoomGetRangeHandler<RoamEventParams['pan']>
  zoom: DataZoomGetRangeHandler<RoamEventParams['zoom']>
  scrollMove: DataZoomGetRangeHandler<RoamEventParams['scrollMove']>
} & ThisType<InsideZoomView> = {
  zoom(coordSysInfo, coordSysMainType, controller, e: RoamEventParams['zoom']) {
    const range = this.range
    return range
  },
  pan: makeMover(function (
    range,
    axisModel,
    coordSysInfo,
    coordSysMainType,
    controller,
    e: RoamEventParams['pan']
  ) {
    const directionInfo = getDirectionInfo[coordSysMainType](
      [e.oldX, e.oldY],
      [e.newX, e.newY],
      axisModel,
      controller,
      coordSysInfo
    )
    return (
      (directionInfo.signal * (range[1] - range[0]) * directionInfo.pixel) /
      directionInfo.pixelLength
    )
  }),
  scrollMove: makeMover(function (
    range,
    axisModel,
    coordSysInfo,
    coordSysMainType,
    controller,
    e: RoamEventParams['scrollMove']
  ) {
    const directionInfo = getDirectionInfo[coordSysMainType](
      [0, 0],
      [e.scrollDelta, e.scrollDelta],
      axisModel,
      controller,
      coordSysInfo
    )
    return directionInfo.signal * (range[1] - range[0]) * e.scrollDelta
  }),
}

function makeMover(
  getPercentDelta: (
    range: [number, number],
    axisModel: AxisBaseModel,
    coordSysInfo: DataZoomReferCoordSysInfo,
    coordSysMainType: DataZoomCoordSysMainType,
    controller: RoamController,
    e: RoamEventParams['scrollMove'] | RoamEventParams['pan']
  ) => number
) {
  return function (
    this: InsideZoomView,
    coordSysInfo: DataZoomReferCoordSysInfo,
    coordSysMainType: DataZoomCoordSysMainType,
    controller: RoamController,
    e: RoamEventParams['scrollMove'] | RoamEventParams['pan']
  ): [number, number] {
    const lastRange = this.range
    const range = lastRange.slice() as [number, number]

    // Calculate transform by the first axis.
    const axisModel = coordSysInfo.axisModels[0]
    if (!axisModel) {
      return
    }

    const percentDelta = getPercentDelta(
      range,
      axisModel,
      coordSysInfo,
      coordSysMainType,
      controller,
      e
    )

    sliderMove(percentDelta, range, [0, 100], 'all')

    this.range = range

    if (lastRange[0] !== range[0] || lastRange[1] !== range[1]) {
      return range
    }
  }
}

interface DirectionInfo {
  pixel: number
  pixelLength: number
  pixelStart: number
  signal: -1 | 1
}
interface GetDirectionInfo {
  (
    oldPoint: number[],
    newPoint: number[],
    axisModel: AxisBaseModel,
    controller: RoamController,
    coordSysInfo: DataZoomReferCoordSysInfo
  ): DirectionInfo
}

const getDirectionInfo: Record<'grid', GetDirectionInfo> = {
  grid(oldPoint, newPoint, axisModel, controller, coordSysInfo) {
    const axis = axisModel.axis
    const ret = {} as DirectionInfo
    const rect = coordSysInfo.model.coordinateSystem.getRect()
    oldPoint = oldPoint || [0, 0]

    if (axis.dim === 'x') {
      ret.pixel = newPoint[0] - oldPoint[0]
      ret.pixelLength = rect.width
      ret.pixelStart = rect.x
      ret.signal = axis.inverse ? 1 : -1
    } else {
      // axis.dim === 'y'
      ret.pixel = newPoint[1] - oldPoint[1]
      ret.pixelLength = rect.height
      ret.pixelStart = rect.y
      ret.signal = axis.inverse ? -1 : 1
    }

    return ret
  },
}

export type DataZoomGetRangeHandlers = typeof getRangeHandlers

export default InsideZoomView
