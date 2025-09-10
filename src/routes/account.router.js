import { Router } from 'express';
import accountController from '../controllers/account.controller.js';

const accountRoutes = Router();

accountRoutes.post('/customers/:id_customer/account', accountController.create);
accountRoutes.get('/customers/:id_customer/accounts', accountController.getAllByCustomerId);
accountRoutes.get('/accounts/:id', accountController.getById);
accountRoutes.get('/accounts/:id/balance', accountController.getBalanceById);
accountRoutes.delete('/accounts/:id', accountController.delete);

export default accountRoutes;