import Helpers from "../libs/Helpers";
import { Request, Response, NextFunction } from 'express';
import { isBoolean } from "util";

// tslint:disable max-classes-per-file
export class BadRequestError extends Error {
    public message = "Bad request. Read the documentation and try again.";
}

export interface IPredictRequestParams {
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

export default class PredictionValidator {
    static validatePredictParams(req: Request, _res: Response, next: NextFunction): void {
        const params = req.body;

        const {
            age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
        } = params;

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

        next();
    }
}