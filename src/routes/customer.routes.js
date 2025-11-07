import { Router } from 'express';
import customerController from '../controllers/customer.controller.js';
import { authenticateRequest } from '../middlewares/auth-combined.middleware.js';

const customerRoutes = Router();

customerRoutes.post('/login', customerController.login);

customerRoutes.post('/customers', customerController.create);

customerRoutes.get('/customers', authenticateRequest, customerController.getAll);

customerRoutes.get('/customers/:id', authenticateRequest, customerController.getById);

customerRoutes.put('/customers/:id', authenticateRequest, customerController.update);

customerRoutes.delete('/customers/:id', authenticateRequest, customerController.delete);

export default customerRoutes;