import { Router } from 'express';
import accountController from '../controllers/account.controller.js';

const accountRoutes = Router();

accountRoutes.post('accounts/customers/:id_customer', accountController.create);
accountRoutes.get('accounts/customers/:id_customer', accountController.getAllByCustomerId);
accountRoutes.get('accounts/:id', accountController.getById);
accountRoutes.get('accounts/:id/balance', accountController.getBalanceById);
accountRoutes.delete('accounts/:id', accountController.delete);

export default accountRoutes;