import { Router } from 'express';
import transactionController from '../controllers/transaction.controller.js';

const transactionRoutes = Router();

transactionRoutes.post('/transactions/accounts/:id_account', transactionController.create);

transactionRoutes.get('/accounts/:id_account/transactions', transactionController.getAllByAccountId);

transactionRoutes.get('/transactions/:id', transactionController.getById);

transactionRoutes.post('/transfer/transactions/accounts/:id_account', transactionController.transferFunds);

export default transactionRoutes;