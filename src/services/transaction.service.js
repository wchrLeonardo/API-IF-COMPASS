import Transaction from '../models/transaction.model.js';
import Account from '../models/account.model.js';
import { NotFoundError, BadRequestError } from '../exceptions/api-errors.exception.js';
import { Query } from 'mongoose';

const transactionStrategies = {
    credit: (balance, amount) => balance + amount,
    debit: (balance, amount) => {
        if (balance < amount) throw new BadRequestError("Insufficient funds for this debit transaction.");
        return balance - amount;
    },
};

class TransactionService {
    async createTransaction(accountId, transactionData) {
        const account = await Account.findById(accountId);

        if (!account) {
            throw new NotFoundError("Account not found");
        }

        const strategy = transactionStrategies[transactionData.type];
        if (!strategy) {
            throw new BadRequestError("Tipo de transação inválido.");
        }
        const newBalance = strategy(account.balance, transactionData.amount);

        const transaction = await Transaction.create({
            ...transactionData,
            account: accountId,
        });

        await Account.findByIdAndUpdate(accountId, {
            $set: { balance: newBalance },
            $push: { transactions: transaction._id }
        });


        return {
            transaction, current_balance: newBalance
        };
    }
    async getTransactionById(id) {
        const transaction = await Transaction.findById(id).populate('account', 'type number');
        if (!transaction) {
            throw new NotFoundError("Transaction not found");
        }
        return transaction;
    }
    async getAllTransactionsByAccountId(accountId, page = 1, pageSize = 10, fromDate = null, toDate = null) {
        const skip = (page - 1) * pageSize;
        const query = { account: accountId };

        if (fromDate || toDate) {
            query.createdAt = {};
            if (fromDate) query.createdAt.$gte = new Date(fromDate);
            if (toDate) query.createdAt.$lte = new Date(toDate);
        }

        const transactions = await Transaction.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize);

        const totalTransactions = await Transaction.countDocuments(query);
        return {
            transactions,
            current_page: page,
            totalPages: Math.ceil(totalTransactions / pageSize),
            totalTransactions
        }
    }
    async transferFunds(accountId, branchDestination, numberDestination, amount) {
        const account = await Account.findById(accountId);
        if (!account) {
            throw new NotFoundError("Account not exists.");
        }
        const destinationAccount = await Account.findOne({ branch: branchDestination, number: numberDestination });
        if (!destinationAccount) {
            throw new NotFoundError("Destination account not found.");
        }
        if (account._id === destinationAccount._id) {
            throw new BadRequestError("Cannot transfer to the same account.");
        }

        const strategyDebit = transactionStrategies["debit"];
        account.balance = strategyDebit(account.balance, amount);
        account.transactions.push(transferRemittance._id);

        const transferRemittance = await Transaction.create({
            type: "debit",
            amount: amount,
            account: accountId,
            category: "transfer",
            description: `Transfer to ${destinationAccount.owner} account - ${destinationAccount.number} at branch ${destinationAccount.branch}`,
        });

        const strategyCredit = transactionStrategies["credit"];
        destinationAccount.balance = strategyCredit(destinationAccount.balance, amount);
        destinationAccount.transactions.push(transferReceipt._id);

        const transferReceipt = await Transaction.create({
            type: "credit",
            amount: amount,
            account: destinationAccount._id,
            category: "transfer",
            description: `Transfer from ${account.owner} account - ${account.number} at branch ${account.branch}`,
        });


        await account.save();
        await destinationAccount.save();

        return {
            message: "Transfer successful",
            from: {
                accountId: account._id,
                type: account.type,
                number: account.number,
                owner: account.owner,
                current_balance: account.balance,
            },
            to: {
                accountId: destinationAccount._id,
                type: destinationAccount.type,
                number: destinationAccount.number,
                owner: destinationAccount.owner,
                current_balance: destinationAccount.balance
            },
            debited: amount
        };
    }
}

export default new TransactionService();

