import PredictionDataMapper, { HeartDiseaseResult } from '../data-mappers/PredictionDataMapper';
import { HeartDiseaseAPIResult } from '../services/PredictionService';

interface IPredictResponse {
    status: HeartDiseaseResult
};

export default class PredictionResponseBuilder {
    static predict(result: HeartDiseaseAPIResult): IPredictResponse {
        const status = PredictionDataMapper.predictionResultMapper(result);

        return { status };
    }
}