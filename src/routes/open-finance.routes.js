import { Router } from 'express';
import openFinanceController from '../controllers/open-finance.controller.js';
import authOpenFinance from '../middlewares/auth-open-finance.middleware.js';

const openFinanceRoutes = Router();

openFinanceRoutes.get(
    '/open-finance/data', 
    authOpenFinance.verifyApiKey, 
    openFinanceController.getSharedData
);

export default openFinanceRoutes;