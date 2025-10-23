import customerService from "../services/customer.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";

class CustomerController {
    create = async (req, res, next) => {
        try {
            const customerData = req.body;
            if (!customerData.name || !customerData.email || !customerData.cpf || !customerData.password) {
                return res.status(400).json({ error: "Name, email, CPF, and password are required" });
            }
            const salt = await bcrypt.genSalt(10);
            customerData.password = await bcrypt.hash(customerData.password, salt);
            const newCustomer = await customerService.createCustomer(customerData);
            res.status(201).json(newCustomer);
        } catch (error) {
            next(error)
        }
    };
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const customer = await customerService.getCustomerById(id);
            res.status(200).json(customer);
        } catch (error) {
            next(error)
        }
    };
    getAll = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const customers = await customerService.getAllCustomers(page, limit);
            res.status(200).json(customers);
        } catch (error) {
            next(error)
        }
    };
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const customerData = req.body;
            const updatedCustomer = await customerService.updateCustomer(id, customerData);
            res.status(200).json(updatedCustomer);
        } catch (error) {
            next(error)
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await customerService.deleteCustomer(id);
            res.status(204).send();
        } catch (error) {
            next(error)
        }
    };
    login = async (req, res, next) => {
        try {
            const { cpf, password, connectionId } = req.body;
            if (!cpf || !password) {
                return res.status(400).json({ error: "CPF and password are required" });
            }
            const customer = await Customer.findOne({ cpf });
            if (!customer) {
                return res.status(401).json({ error: "Invalid CPF or password" });
            }
            const isMatch = await bcrypt.compare(password, customer.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid CPF or password" });
            }

            if (connectionId) {
                const controlFResponse = await this.handleControlFConnection(connectionId, customer);
                res.status(200).json(controlFResponse);
            } else {
                const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ 
                    message: 'login successful',
                    token 
                });
            }
        } catch (error) {
            next(error)
        }
    };

    async handleControlFConnection(connectionId, customer) {
        // Lógica para lidar com a conexão ControlF usando o connectionId
        // Esta é uma simulação; substitua pela lógica real conforme necessário
        return {
            message: 'ControlF connection established',
            connectionId,
            customerId: customer._id
        };
    }
}

export default new CustomerController();
