import customerService from "../services/customer.service.js";
import { ApiError } from "../exceptions/api-errors.js";

class CustomerController {

    create = async (req, res) => {
        try {
            const customerData = req.body;
            if (!customerData.name || !customerData.email || !customerData.cpf) {
                return res.status(400).json({ error: "Name, email, and CPF are required" });
            }
            const newCustomer = await customerService.createCustomer(customerData);
            res.status(201).json(newCustomer);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error)
            res.status(500).json({ error: "Internal server error" });
        }
    };
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await customerService.getCustomerById(id);
            res.status(200).json(customer);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error)
            res.status(500).json({ error: "Internal server error" });
        }
    };
    getAll = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const customers = await customerService.getAllCustomers(page, limit);
            res.status(200).json(customers);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error(error)
            res.status(500).json({ error: "Internal server error" });
        }
    };
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const customerData = req.body;
            const updatedCustomer = await customerService.updateCustomer(id, customerData);
            res.status(200).json(updatedCustomer);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            await customerService.deleteCustomer(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    };
}

export default new CustomerController();
