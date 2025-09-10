import Account from "../models/account.model.js";
import Customer from "../models/customer.model.js";
import Transaction from "../models/transaction.model.js";
import { NotFoundError, ConflictError } from "../exceptions/api-errors.js";

class AccountService {

    async createAccount(owner, accountData) {
        const customer = await Customer.findById(owner);
        if (!customer) {
            throw new NotFoundError("Customer not found");
        }   

        const existingAccount = await Account.findOne({
            number: accountData.number
        });

        if (existingAccount) {
            throw new ConflictError("Account with this number already exists");
        }

        const account = await Account.create(accountData);

        await Customer.findByIdAndUpdate(owner, {  $push: { accounts: account._id } });

        return account;
    }

    async getAccountById(id) {
        const account = await Account.findById(id)
        .populate('owner', 'name email')
        .populate({
            path: 'transactions',
            options: {
                sort: { createdAt: -1 },
                limit: 10
            }
        });

        if (!account) {
            throw new NotFoundError("Account not found");
        }
        return account;
    }

    async getBalanceByAccountId(accountId) {
        const account = await Account.findById(accountId).select('balance');
        if (!account) {
            throw new NotFoundError("Account not found");
        }
        return { balance: account.balance };
    }

    async getAllAccountsByCustomerId(customerId) {
        const accounts = await Account.find({ owner: customerId }).populate({
            path: 'transactions',
            options: {
                sort: { createdAt: -1 },
                limit: 3
            }
        });

        return accounts;
    }

    async deleteAccount(id) {
        const accountToDelete = await Account.findById(id);
        if (!accountToDelete) {
            throw new NotFoundError("Account not found");
        }

        await Transaction.deleteMany({ account: id });
        await Customer.findByIdAndUpdate(accountToDelete.owner, { $pull: { accounts: accountToDelete._id } });

        await Account.findByIdAndDelete(id);
        return accountToDelete;
    }

}

export default new AccountService();
