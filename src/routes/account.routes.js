import { Router } from 'express';
import accountController from '../controllers/account.controller.js';

const accountRoutes = Router();

accountRoutes.post('/accounts/customers/:id_customer', accountController.create);

accountRoutes.get('/customers/:id_customer/accounts', accountController.getAllByCustomerId);

accountRoutes.get('/accounts/:id', accountController.getById);

accountRoutes.get('/accounts/:id/balance', accountController.getBalanceById);

accountRoutes.delete('/accounts/:id', accountController.delete);

accountRoutes.get('/accounts/:id_account/customer/:id_customer/aggregated-view', accountController.getAggregatedView);

export default accountRoutes;