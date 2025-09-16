import Transaction from '../models/transaction.model.js';
import Account from '../models/account.model.js';
import { NotFoundError, BadRequestError } from '../exceptions/api-errors.exception.js';

const transactionStrategies = {
    credit: (balance, amount) => balance + amount,
    debit: (balance, amount) => {
        if (balance < amount) throw new BadRequestError("Saldo insuficiente.");
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
    async getAllTransactionsByAccountId(accountId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const transactions = await Transaction.find({ account: accountId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalTransactions = await Transaction.countDocuments({ account: accountId });
        return {
            transactions,
            current_page: page,
            totalPages: Math.ceil(totalTransactions / limit),
            totalTransactions
        }
    }
}

export default new TransactionService();

