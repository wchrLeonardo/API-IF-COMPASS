import Account from "../models/account.model.js";
import Customer from "../models/customer.model.js";
import Consent from "../models/consent.model.js";
import Transaction from "../models/transaction.model.js";
import { NotFoundError, ConflictError } from "../exceptions/api-errors.exception.js";

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

        const account = await Account.create({
            owner: owner,
            ...accountData
        });

        await Customer.findByIdAndUpdate(owner, { $push: { accounts: account._id } });

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
    async getAggregatedViewAccounts(accountId, customerId) {
        const primaryAccount = await Account.findById(accountId);
        if (!primaryAccount || primaryAccount.owner.toString() !== customerId) {
            throw new ForbiddenError("Conta não encontrada ou não pertence a você.");
        }

        const aggregatedView = {
            primaryAccount: {
                ...primaryAccount.toObject(),
                transactions: await Transaction.find({ account: accountId }).sort({ createdAt: -1 }).limit(10)
            },
            sharedData: []
        };

        const potentialSourceAccounts = await Account.find({
            owner: customerId,
            _id: { $ne: accountId }
        });

        if (potentialSourceAccounts.length === 0) {
            return aggregatedView;
        }

        for (const sourceAccount of potentialSourceAccounts) {
            const consent = await Consent.findOne({
                customer: customerId,
                currentAccount: sourceAccount._id,
                status: 'AUTHORIZED',
                expirationDateTime: { $gt: new Date() }
            });

            if (consent) {
                const sharedAccountPayload = {
                    consentId: consent._id,
                    account: {
                        _id: sourceAccount._id,
                        number: sourceAccount.number,
                        type: sourceAccount.type,
                    }
                };

                if (consent.permissions.includes('BALANCES_READ')) {
                    sharedAccountPayload.account.balance = sourceAccount.balance;
                }
                if (consent.permissions.includes('TRANSACTIONS_READ')) {
                    sharedAccountPayload.account.transactions = await Transaction.find({ account: sourceAccount._id })
                        .sort({ createdAt: -1 })
                        .limit(10);
                }
                aggregatedView.sharedData.push(sharedAccountPayload);
            }
        }

        return aggregatedView;
    }
}

export default new AccountService();
