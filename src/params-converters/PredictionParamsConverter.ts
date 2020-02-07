import Helpers from "../libs/Helpers";
import { Request, Response, NextFunction } from 'express';
import { IPredictRequestParams } from '../validators/PredictionValidator';

declare global {
    namespace Express {
        interface Request {
            inputs: object;
        }
    }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Could also have created a generic Interface
// anpm run build && serverless deploy -s stgnd extend it for both cases
export interface IPredictionData extends Omit<IPredictRequestParams, "fbs" | "exang"> {
    fbs: 0 | 1;
    exang: 0 | 1;
}

// tslint:disable-next-line
export default class PredictionParamConverter {
    static convertPredictParams(req: Request, _res: Response, next: NextFunction): void {
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