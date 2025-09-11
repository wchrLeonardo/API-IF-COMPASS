import transactionService from '../services/transaction.service.js';
import { ApiError } from '../exceptions/api-errors.js';

class TransactionController {

    create = async (req, res) => {
        try {
            const transactionData = req.body;
            const { id_account } = req.params;

            if (!transactionData.type || !transactionData.amount || !transactionData.description) {
                return res.status(400).json({ message: "Transaction type, amount, and description are required" });
            }
            const newTransaction = await transactionService.createTransaction(id_account, transactionData);
            res.status(201).json(newTransaction);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const transaction = await transactionService.getTransactionById(id);
            res.status(200).json(transaction);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    getAllByAccountId = async (req, res) => {
        try {
            const { id_account } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const transactions = await transactionService.getAllTransactionsByAccountId(id_account, page, limit);
            res.status(200).json(transactions);
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new TransactionController();