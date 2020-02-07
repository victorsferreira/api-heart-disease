import Helpers from "../libs/Helpers";
import { Request, Response, NextFunction } from 'express';
import { IPredictRequestParams } from '../validators/PredictionValidator';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export interface IConvertedRequest extends Request {
    inputs: object;
}

// Could also have created a generic Interface
// anpm run build && serverless deploy -s stgnd extend it for both cases
export interface IPredictionData extends Omit<IPredictRequestParams, "fbs" | "exang"> {
    fbs: 0 | 1;
    exang: 0 | 1;
}

export default class PredictionParamConverter {
    static convertPredictParams(req: IConvertedRequest, _res: Response, next: NextFunction): void {
        const params = req.body;
        const { fbs, exang } = params;
        const intFbs = Helpers.boolToInt(fbs);
        const intExang = Helpers.boolToInt(exang);

        req.inputs = {
            ...params,
            fbs: intFbs,
            exang: intExang
        } as IPredictionData;

        next();
    }
}