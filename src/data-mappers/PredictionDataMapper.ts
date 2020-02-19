import { HeartDiseaseAPIResult } from '../services/PredictionService';

export enum HeartDiseaseResult {
    ABSENCE = 'absence',
    PRESENCE = 'presence'
};

export default class PredictionDataMapper {
    static predictionResultMapper(result: HeartDiseaseAPIResult) {
        if (result === 0) return HeartDiseaseResult.ABSENCE;
        return HeartDiseaseResult.PRESENCE;
    }
}