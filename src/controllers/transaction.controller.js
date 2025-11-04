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
            const pageSize = parseInt(req.query.pageSize) || 10;
            const { fromDate, toDate } = req.query;
            const transactions = await transactionService.getAllTransactionsByAccountId(id_account, page, pageSize, fromDate, toDate);
            res.status(200).json(transactions);
        } catch (error) {
            next(error);
        }
    }
    transferFunds = async (req, res, next) => {
        try {
            const { id_account } = req.params;
            const { branch_destination, number_destination, amount } = req.body;
            if (!branch_destination || !number_destination || !amount) {
                return res.status(400).json({ message: "Branch, account number, and amount are required for transfer." });
            }
            const transferResult = await transactionService.transferFunds(id_account, branch_destination, number_destination, amount);
            res.status(200).json(transferResult);
        } catch (error) {
            next(error);
        }
    }
}

export default new TransactionController();