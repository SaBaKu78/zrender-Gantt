import { BlurScope, ComponentMainType, InnerFocus, PIEventData, SeriesDataType } from './types'
import { makeInner } from './model'
import { Element } from 'zrender'

export interface PIData {
  dataIndex?: number
  dataType?: SeriesDataType
  seriesIndex?: number
  eventData?: PIEventData
  focus?: InnerFocus
  blurScope?: BlurScope

  // Required by `tooltipConfig` and `focus`.
  componentMainType?: ComponentMainType
  componentIndex?: number
  componentHighDownName?: string
}

export const getPIData = makeInner<PIData, Element>()

export const setCommonPIData = (
  seriesIndex: number,
  dataType: SeriesDataType,
  dataIdx: number,
  el: Element
) => {
  if (el) {
    const piData = getPIData(el)
    // Add data index and series index for indexing the data by element
    // Useful in tooltip
    piData.dataIndex = dataIdx
    piData.dataType = dataType
    piData.seriesIndex = seriesIndex

    // TODO: not store dataIndex on children.
    if (el.type === 'group') {
      el.traverse(function (child: Element): void {
        const childPIData = getPIData(child)
        childPIData.seriesIndex = seriesIndex
        childPIData.dataIndex = dataIdx
        childPIData.dataType = dataType
      })
    }
  }
}
