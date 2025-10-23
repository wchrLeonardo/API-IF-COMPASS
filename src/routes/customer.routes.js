import { Router } from 'express';
import customerController from '../controllers/customer.controller.js';
import { authenticateToken } from '../middlewares/auth.combined.middleware.js';

const customerRoutes = Router();

customerRoutes.post('/login', customerController.login);

customerRoutes.post('/customers', customerController.create);

customerRoutes.get('/customers', authenticateToken, customerController.getAll);

customerRoutes.get('/customers/:id', authenticateToken, customerController.getById);

customerRoutes.put('/customers/:id', authenticateToken, customerController.update);

customerRoutes.delete('/customers/:id', authenticateToken, customerController.delete);

export default customerRoutes;