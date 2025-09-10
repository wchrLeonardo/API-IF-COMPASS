import accountService from "../services/account.service.js";
import { ApiError } from "../exceptions/api-errors.js";

class AccountController {
create = async (req, res) => {
    try {
        const { id_customer: owner } = req.params;
        const accountData = req.body;
        if (!accountData.number || !accountData.type || !accountData.branch) {
            return res.status(400).json({ message: "Account number, type, and branch are required" });
        }

        const newAccount = await accountService.createAccount(owner, accountData);
        res.status(201).json(newAccount);
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
getById = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await accountService.getAccountById(id);
        res.status(200).json(account);
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
getBalanceById = async (req, res) => {
    try {
        const { id } = req.params;
        const balance = await accountService.getBalanceByAccountId(id);
        res.status(200).json(balance);
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
getAllByCustomerId = async (req, res) => {
    try {
        const { id_customer } = req.params;
        const accounts = await accountService.getAllAccountsByCustomerId(id_customer);
        res.status(200).json(accounts);
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
delete = async (req, res) => {
    try {
        const { id } = req.params;
        await accountService.deleteAccount(id);
        res.status(204).send();
    } catch (error) {
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
}
export default new AccountController();