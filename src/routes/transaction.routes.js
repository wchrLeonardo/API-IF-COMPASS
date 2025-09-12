import { Router } from 'express';
import transactionController from '../controllers/transaction.controller.js';

const transactionRoutes = Router();

transactionRoutes.post('transactions/accounts/:id_account', transactionController.create);

transactionRoutes.get('transactions/accounts/:id_account', transactionController.getAllByAccountId);

transactionRoutes.get('transactions/:id', transactionController.getById);

export default transactionRoutes;