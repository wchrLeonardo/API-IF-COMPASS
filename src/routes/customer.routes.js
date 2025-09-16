import { Router } from 'express';
import customerController from '../controllers/customer.controller.js';

const customerRoutes = Router();

customerRoutes.post('/customers', customerController.create);

customerRoutes.get('/customers', customerController.getAll);

customerRoutes.get('/customers/:id', customerController.getById);

customerRoutes.put('/customers/:id', customerController.update);

customerRoutes.delete('/customers/:id', customerController.delete);

export default customerRoutes;