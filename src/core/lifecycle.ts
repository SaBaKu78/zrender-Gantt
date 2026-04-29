import { ModelFinderIdQuery, ModelFinderIndexQuery } from '../util/model'
import { DimensionLoose } from '../util/types'

export interface UpdateLifecycleParams {}

export interface UpdateLifecycleTransitionSeriesFinder {
  seriesIndex?: ModelFinderIndexQuery
  seriesId?: ModelFinderIdQuery
  dimension: DimensionLoose
}

export interface UpdateLifecycleTransitionItem {
  // If `from` not given, it means that do not make series transition mandatorily.
  // There might be transition mapping dy default. Sometimes we do not need them,
  // which might bring about misleading.
  from?:
    | UpdateLifecycleTransitionSeriesFinder
    | UpdateLifecycleTransitionSeriesFinder[]
  to:
    | UpdateLifecycleTransitionSeriesFinder
    | UpdateLifecycleTransitionSeriesFinder[]
}

export type UpdateLifecycleTransitionOpt =
  | UpdateLifecycleTransitionItem
  | UpdateLifecycleTransitionItem[]
