import { Router } from 'express';
import PredictionController from './controllers/PredictionController';
import BaseController from './libs/BaseController';

const router = Router();

router.use(BaseController.route('post', '/predict', PredictionController, 'predict'));
router.use(BaseController.route('get', '/healthcheck', PredictionController, 'healthcheck'));

export default router;