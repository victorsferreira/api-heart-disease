import { Router } from 'express';
import PredictionController from './controllers/PredictionController';
import BaseController from './libs/BaseController';

const router = Router();

router.post('/predict', BaseController.action(PredictionController, 'predict'));

export default router;