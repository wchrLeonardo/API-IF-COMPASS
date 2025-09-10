import Customer from "../models/customer.model.js";
import Account from "../models/account.model.js";
import Transaction from "../models/transaction.model.js";
import { NotFoundError, ConflictError } from "../exceptions/api-errors.js";

class CustomerService {

    async createCustomer(customerData) {
        const existingCustomer = await Customer.findOne({
            $or: [{ cpf: customerData.cpf }, { email: customerData.email }],
        });

        if (existingCustomer) {
            throw new ConflictError("Customer with this CPF or email already exists");
        }
        const customer = await Customer.create(customerData);
        return customer;
    }

    async getCustomerById(id) {
        const customer = await Customer.findById(id).populate('accounts');
        if (!customer) {
            throw new NotFoundError("Customer not found");
        }
        return customer;
    };

    async getAllCustomers(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const customers = await Customer.find().skip(skip).limit(limit);

        const totalCustomers = await Customer.countDocuments();
        return {
            customers,
            currentPage: page,
            totalPages: Math.ceil(totalCustomers / limit),
            totalCustomers
        };
    };

    async updateCustomer(id, customerData) {
        const existingCustomer = await Customer.findOne({
            $or: [{ cpf: customerData.cpf }, { email: customerData.email }],
            _id: { $ne: id }
        });

        if (existingCustomer) {
            throw new ConflictError("Customer with this CPF or email already exists");
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(id, customerData, { new: true });

        if (!updatedCustomer) {
            throw new NotFoundError("Customer not found");
        }
        return updatedCustomer;
    };

    async deleteCustomer(id) {
        const customerToDelete = await Customer.findById(id);
        if (!customerToDelete) {
            throw new NotFoundError("Customer not found");
        }

        if (customerToDelete.accounts && customerToDelete.accounts.length > 0) {
            await Account.deleteMany({ owner: id });
            await Transaction.deleteMany({ account: { $in: customerToDelete.accounts } });
        }

        await Customer.findByIdAndDelete(id);
        return customerToDelete;
    };

}

export default new CustomerService();
