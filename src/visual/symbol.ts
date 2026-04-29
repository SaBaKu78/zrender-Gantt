import SeriesData from '../data/SeriesData'
import GlobalModel from '../model/Global'
import SeriesModel from '../model/Series'
import {
  CallbackDataParams,
  SeriesOption,
  StageHandler,
  SymbolOptionMixin,
} from '../util/types'

const SYMBOL_PROPS_WITH_CB = [
  'symbol',
  'symbolSize',
  'symbolRotate',
  'symbolOffset',
] as const
const SYMBOL_PROPS: [...typeof SYMBOL_PROPS_WITH_CB, 'symbolKeepAspect'] =
  SYMBOL_PROPS_WITH_CB.concat(['symbolKeepAspect'] as any) as any

const dataSymbolTask: StageHandler = {
  createOnAllSeries: true,

  // For legend.
  performRawSeries: true,

  reset: function (
    seriesModel: SeriesModel<
      SeriesOption & SymbolOptionMixin<CallbackDataParams>
    >,
    piModel: GlobalModel
  ) {
    if (!seriesModel.hasSymbolVisual) {
      return
    }
    // Only visible series has each data be visual encoded
    if (piModel.isSeriesFiltered(seriesModel)) {
      return
    }

    const data = seriesModel.getData()

    function dataEach(data: SeriesData, idx: number) {
      const itemModel = data.getItemModel<SymbolOptionMixin>(idx)

      for (let i = 0; i < SYMBOL_PROPS.length; i++) {
        const symbolPropName = SYMBOL_PROPS[i]
        const val = itemModel.getShallow(symbolPropName, true)
        if (val != null) {
          data.setItemVisual(idx, symbolPropName, val)
        }
      }
    }

    return { dataEach: data.hasItemOption ? dataEach : null }
  },
}

export {dataSymbolTask}