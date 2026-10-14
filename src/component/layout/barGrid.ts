import GlobalModel from "../../model/Global";
import BarSeriesModel from "../bar/BarSeries";

export function prepareLayoutBarSeries(seriesType: string, piModel: GlobalModel): BarSeriesModel[] {
    const seriesModels: BarSeriesModel[] = [];
    piModel.eachSeriesByType(seriesType, function (seriesModel: BarSeriesModel) {
        // Check series coordinate, do layout for cartesian2d only
        if (isOnCartesian(seriesModel)) {
            seriesModels.push(seriesModel);
        }
    });
    return seriesModels;
}

function isOnCartesian(seriesModel: BarSeriesModel) {
    return seriesModel.coordinateSystem && seriesModel.coordinateSystem.type === 'cartesian2d';
}
