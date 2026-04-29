import GlobalModel from "../../model/Global";
import BarSeriesModel from "../bar/barSeries";

export function prepareLayoutBarSeries(seriesType: string, ecModel: GlobalModel): BarSeriesModel[] {
    const seriesModels: BarSeriesModel[] = [];
    ecModel.eachSeriesByType(seriesType, function (seriesModel: BarSeriesModel) {
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