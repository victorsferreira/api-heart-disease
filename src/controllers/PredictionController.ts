import BaseController from "../libs/BaseController";
import PredictionService from '../services/PredictionService';
import Helpers from "../libs/Helpers";
import { isBoolean } from "util";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface IPredictRequestParams {
    age: number,
    sex: 0 | 1,
    cp: 1 | 2 | 3 | 4;
    trestbps: number;
    chol: number;
    fbs: boolean;
    restecg: 0 | 1 | 2;
    thalach: number;
    exang: boolean;
    oldpeak: number;
    slope: 1 | 2 | 3;
    ca: number;
    thal: 3 | 6 | 7;
};

// Could also have created a generic Interface
// and extend it for both cases
export interface IPredictionData extends Omit<IPredictRequestParams, "fbs" | "exang"> {
    fbs: 0 | 1;
    exang: 0 | 1;
}

// tslint:disable max-classes-per-file
class BadRequestError extends Error {
    public message = "Bad request. Read the documentation and try again.";
}

export default class PredictionController extends BaseController {
    private predictionService: PredictionService;

    constructor() {
        super();

        this.predictionService = new PredictionService();
    }

    validate(requestParams: IPredictRequestParams) {
        const {
            age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
        } = requestParams;

        if (!Helpers.isNumeric(age)) throw new BadRequestError();
        if (!Helpers.isIn(sex, [0, 1])) throw new BadRequestError();
        if (!Helpers.isIn(cp, [1, 2, 3, 4])) throw new BadRequestError();
        if (!Helpers.isNumeric(trestbps)) throw new BadRequestError();
        if (!Helpers.isNumeric(chol)) throw new BadRequestError();
        if (!isBoolean(fbs)) throw new BadRequestError();
        if (!Helpers.isIn(restecg, [0, 1, 2])) throw new BadRequestError();
        if (!Helpers.isNumeric(thalach)) throw new BadRequestError();
        if (!isBoolean(exang)) throw new BadRequestError();
        if (!Helpers.isNumeric(oldpeak)) throw new BadRequestError();
        if (!Helpers.isIn(slope, [1, 2, 3])) throw new BadRequestError();
        if (!Helpers.isNumeric(ca)) throw new BadRequestError();
        if (!Helpers.isIn(thal, [3, 6, 7])) throw new BadRequestError();
    }

    convert(requestParams: IPredictRequestParams): IPredictionData {
        const { fbs, exang } = requestParams;
        const intFbs = Helpers.boolToInt(fbs);
        const intExang = Helpers.boolToInt(exang);

        return {
            ...requestParams,
            fbs: intFbs,
            exang: intExang
        };
    }

    public async predict(req, res, _next): Promise<void> {
        const requestParams = req.body as IPredictRequestParams;

        try {
            this.validate(requestParams);
            const convertedRequestParams = this.convert(requestParams);

            const result = await this.predictionService.makeSinglePrediction(convertedRequestParams);

            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            if (error instanceof BadRequestError) {
                res.status(400).json(error.message);
            } else {
                res.status(500).json("Error");
            }
        }
    }
}