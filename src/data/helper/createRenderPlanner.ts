import SeriesModel from '../../model/Series'
import { makeInner } from '../../util/model'
import { StageHandlerPlanReturn } from '../../util/types'

export default function createRenderPlanner() {
  const inner = makeInner<
    {
      large: boolean
      progressiveRender: boolean
    },
    SeriesModel
  >()

  return function (seriesModel: SeriesModel): StageHandlerPlanReturn {
    const fields = inner(seriesModel)
    const pipelineContext = seriesModel.pipelineContext

    const originalLarge = !!fields.large
    const originalProgressive = !!fields.progressiveRender

    // FIXME: if the planner works on a filtered series, `pipelineContext` does not
    // exists. See #11611 . Probably we need to modify this structure, see the comment
    // on `performRawSeries` in `Schedular.js`.
    const large = (fields.large = !!(pipelineContext && pipelineContext.large))
    const progressive = (fields.progressiveRender = !!(
      pipelineContext && pipelineContext.progressiveRender
    ))

    return (!!(
      originalLarge !== large || originalProgressive !== progressive
    ) && 'reset') as StageHandlerPlanReturn
  }
}
