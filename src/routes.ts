import { Router } from 'express';
import PredictionController from './controllers/PredictionController';
import PredictionValidator from './validators/PredictionValidator';
import PredictionParamsConverter from './params-converters/PredictionParamsConverter';
import BaseController from './libs/BaseController';

const router = Router();

router.use(BaseController.route('post', '/predict', PredictionController, 'predict', [PredictionValidator.validatePredictParams, PredictionParamsConverter.convertPredictParams]));
router.use(BaseController.route('get', '/healthcheck', PredictionController, 'healthcheck'));

export default router;