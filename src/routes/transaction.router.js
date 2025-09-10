import { Router } from 'express';
import transactionController from '../controllers/transaction.controller.js';

const transactionRoutes = Router();

transactionRoutes.post('/accounts/:accountId/transactions', transactionController.create);
transactionRoutes.get('/accounts/:accountId/transactions', transactionController.getAllByAccountId);
transactionRoutes.get('/transactions/:id', transactionController.getById);

export default transactionRoutes;