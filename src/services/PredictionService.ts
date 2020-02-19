// import BaseService from "../libs/BaseService";
import axios, { AxiosResponse, AxiosError } from 'axios';
import isReachable from 'is-reachable';
import { IPredictionData } from '../params-converters/PredictionParamsConverter';

export type HeartDiseaseAPIResult = 0 | 1 | 2 | 3 | 4;

export type IPredictionResult = {
    [key: number]: HeartDiseaseAPIResult;
};

export default class PredictionService
//  extends BaseService
{
    constructor() {
        // super();
    }

    async verifyIfServerIsReachable(): Promise<boolean> {
        try {
            const serverIsReachable = await isReachable(process.env.PREDICTOR_URL);
            console.log(`Is reachable ${process.env.PREDICTOR_URL}: ${serverIsReachable}`);
            return serverIsReachable;
        } catch (error) {
            throw error;
        }
    }

    public async makeSinglePrediction(data: IPredictionData): Promise<HeartDiseaseAPIResult> {
        try {
            const response = await this.fetchPrediction(data);
            if (response.status === 200) {
                const result = response.data as IPredictionResult;

                return result[0];
            } else {
                const error = new Error();
                throw error;
            }
        } catch (e) {
            throw e;
        }
    }

    async fetchPrediction(data): Promise<AxiosResponse> {
        try {
            const url = `${process.env.PREDICTOR_URL}/predict`;

            const response = await axios.post(
                url,
                data
            );

            return response;
        } catch (e) {
            console.log(`Error: ${e.message}`);
            throw e;
        }
    }
}