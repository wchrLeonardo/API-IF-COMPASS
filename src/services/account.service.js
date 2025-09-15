import Account from "../models/account.model.js";
import Customer from "../models/customer.model.js";
import Consent from "../models/consent.model.js";
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
    async getAggregatedViewAccounts(accountId) {
        const primaryAccount = await Account.findById(accountId)
        if (!primaryAccount) {
            throw new NotFoundError("Main account not found");
        }

        const primaryTransactions = await Transaction.find({ account: accountId })
            .sort({ createdAt: -1 })
            .limit(10);
        const aggregatedView = {
            primaryAccount: {
                ...primaryAccount.toObject(),
                transactions: primaryTransactions
            },
            sharedData: []
        }

        const consents = await Consent.find({
            currentAccount: accountId,
            status: 'AUTHORIZED',
            expirationDateTime: { $gt: new Date() }
        }).populate('sourceAccounts');

        if(consents.length === 0) {
            return aggregatedView;
        }

        const allSourceAccountIds = consents.flatMap(consent => consent.sourceAccounts.map(acc => acc._id));
        const allSharedTransactions = await Transaction.find({ account: { $in: allSourceAccountIds } })
            .sort({ createdAt: -1 })
            .limit(20);

        const transactionsByAccount = allSharedTransactions.reduce((acc, tx) => {
            const accountId = tx.account.toString();
            if (!acc[accountId]) {
                acc[accountId] = [];
            }
            acc[accountId].push(tx);
            return acc;
        }, {});

        for (const consent of consents) {
            for (const sourceAccount of consent.sourceAccounts) {
                const sharedAccountPayload = {
                    consentId: consent._id,
                    account: {
                        _id: sourceAccount._id,
                        number: sourceAccount.number,
                        type: sourceAccount.type,
                    }
                }

                if (consent.permissions.includes('BALANCES_READ')) {
                    sharedAccountPayload.account.balance = sourceAccount.balance;
                }
                if (consent.permissions.includes('TRANSACTIONS_READ')) {
                    
                    sharedAccountPayload.account.transactions = transactionsByAccount[sourceAccount._id.toString()] || [];
                }
                aggregatedView.sharedData.push(sharedAccountPayload);

            }

        }

        return aggregatedView;
    }

}

export default new AccountService();
