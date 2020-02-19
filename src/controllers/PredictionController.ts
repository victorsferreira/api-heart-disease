import BaseController from "../libs/BaseController";
import PredictionService from '../services/PredictionService';
import packageJson from '../../package.json';
import { BadRequestError } from '../validators/PredictionValidator';
import { IPredictionData } from "../params-converters/PredictionParamsConverter";
import PredictionResponseBuilder from "../response-builders/PredictionResponseBuilder";

export default class PredictionController extends BaseController {
    private predictionService: PredictionService;

    constructor() {
        super();

        this.predictionService = new PredictionService();
    }

    public async healthcheck(_req, res, _next): Promise<void> {
        try {
            const version = packageJson.version;
            const predictorIsReachable = await this.predictionService.verifyIfServerIsReachable();

            const response = {
                version,
                predictorIsReachable
            };

            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json("Error");
        }
    }

    public async predict(req, res, _next): Promise<void> {
        const requestParams = req.inputs as IPredictionData;

        try {
            const result = await this.predictionService.makeSinglePrediction(requestParams);

            res.status(200).json(
                PredictionResponseBuilder.predict(result)
            );
        } catch (error) {
            console.log(error);
            if (error instanceof BadRequestError) {
                res.status(400).json(error.message);
            } else {
                res.status(501).json({ stack: error.stack, message: error.message });
            }
        }
    }
}