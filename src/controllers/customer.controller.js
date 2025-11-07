import customerService from "../services/customer.service.js";
import externalConsentService from "../services/external-consent.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/customer.model.js";
import axios from "axios";
import { BadRequestError, UnauthorizedError } from "../exceptions/api-errors.exception.js";

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
            const { cpf, password } = req.body; 
            const { connectionId, callbackUrl } = req.query;
            if (!cpf || !password) {
                throw new BadRequestError("CPF and password are required");
            }
            const customer = await Customer.findOne({ cpf }).select('+password');
            if (!customer) {
                throw new UnauthorizedError("Invalid CPF or password");
            }
            const isMatch = await bcrypt.compare(password, customer.password);
            if (!isMatch) {
                throw new UnauthorizedError("Invalid CPF or password");
            }

            if (connectionId && callbackUrl) {
                const controlFResponse = await this.handleControlFConnection(connectionId, customer._id, callbackUrl);
                res.status(200).json(controlFResponse);
            } else {
                const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
                res.status(200).json({ 
                    message: 'login successful',
                    token 
                });
            }
        } catch (error) {
            next(error)

        }
    };

    async handleControlFConnection(connectionId, customerId, callbackUrl, next) {
        try{
            const { plainApiKey, userIdInChildApi, consentId } = await externalConsentService.createAndGenerateKey({ customer: customerId });
            if(!plainApiKey || !userIdInChildApi){
                throw new Error("Failed to create external consent and generate API key");
            } 
            
            const response = await axios.patch(callbackUrl, {
                apiKey: plainApiKey,
                userIdInChildApi,
                connectionId,
                consentId
            });

            if(response.status !== 200){
                throw new Error(`Failed to notify ControlF. Status code: ${response.status}`);
            }

            return {
                message: 'ControlF connection established',
                customerId
            };

        }catch(err){
            next(err);
        }
    }
}

export default new CustomerController();
