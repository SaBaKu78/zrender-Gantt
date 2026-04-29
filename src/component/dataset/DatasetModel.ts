import { SourceManager } from "../../data/helper/SourceManager";
import { DataTransformOption, PipedDataTransformOption } from "../../data/helper/transform";
import ComponentModel from "../../model/Component";
import { ComponentOption, OptionSourceData, OptionSourceHeader, SERIES_LAYOUT_BY_COLUMN, SeriesEncodeOptionMixin, SeriesLayoutBy } from "../../util/types";


export interface DatasetOption extends 
  Pick<ComponentOption, 'type' | 'id' | 'name'>,
  Pick<SeriesEncodeOptionMixin, 'dimensions'> {
    mainType?: 'dataset'
    seriesLayoutBy?: SeriesLayoutBy
    sourceHeader?: OptionSourceHeader
    source?: OptionSourceData
    fromDatasetIndex?: number
    fromDatasetId?: string
    transform?: DataTransformOption | PipedDataTransformOption
    fromTransformResult?: number
  }

export class DatasetModel<Opts extends DatasetOption = DatasetOption> extends ComponentModel<Opts>{
  type = 'dataset'
  static type = 'dataset'

  static defaultOption: DatasetOption = {
    seriesLayoutBy: SERIES_LAYOUT_BY_COLUMN
  }

  private _sourceManager: SourceManager

  getSourceManager(): SourceManager {
    return this._sourceManager
  }
}