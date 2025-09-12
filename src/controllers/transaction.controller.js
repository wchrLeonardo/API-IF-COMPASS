import transactionService from '../services/transaction.service.js';

class TransactionController {

    create = async (req, res, next) => {
        try {
            const transactionData = req.body;
            const { id_account } = req.params;

            if (!transactionData.type || !transactionData.amount || !transactionData.description) {
                return res.status(400).json({ message: "Transaction type, amount, and description are required" });
            }
            const newTransaction = await transactionService.createTransaction(id_account, transactionData);
            res.status(201).json(newTransaction);
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const transaction = await transactionService.getTransactionById(id);
            res.status(200).json(transaction);
        } catch (error) {
            next(error);
        };
    }

    getAllByAccountId = async (req, res, next) => {
        try {
            const { id_account } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const transactions = await transactionService.getAllTransactionsByAccountId(id_account, page, limit);
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
}

export default new TransactionController();