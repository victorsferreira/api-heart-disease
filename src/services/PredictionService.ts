// import BaseService from "../libs/BaseService";
import axios, { AxiosResponse } from 'axios';
import { IPredictionData } from '../controllers/PredictionController';

type HeartDiseaseState = 0 | 1 | 2 | 3 | 4;

type IPredictionResult = {
    [key: number]: HeartDiseaseState;
};

export default class PredictionService
//  extends BaseService
{
    constructor() {
        // super();
    }

    public async makeSinglePrediction(data: IPredictionData): Promise<HeartDiseaseState> {
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
            const url = `${process.env.PROVIDER_URL}/predict`;

            console.log("URL:", url);
            const response = await axios.post(
                url,
                data
            );

            return response.data;
        } catch (e) {
            console.log(`Error: ${e.message}`);
            throw e;
        }
    }
}