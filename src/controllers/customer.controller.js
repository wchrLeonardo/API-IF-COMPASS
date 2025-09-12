import customerService from "../services/customer.service.js";

class CustomerController {

    create = async (req, res, next) => {
        try {
            const customerData = req.body;
            if (!customerData.name || !customerData.email || !customerData.cpf) {
                return res.status(400).json({ error: "Name, email, and CPF are required" });
            }
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
}

export default new CustomerController();
