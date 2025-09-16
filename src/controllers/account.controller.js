import accountService from "../services/account.service.js";

class AccountController {
    create = async (req, res, next) => {
        try {
            const { id_customer: owner } = req.params;
            const accountData = req.body;
            if (!accountData.number || !accountData.type || !accountData.branch) {
                return res.status(400).json({ message: "Account number, type, and branch are required" });
            }

            const newAccount = await accountService.createAccount(owner, accountData);
            res.status(201).json(newAccount);
        } catch (error) {
            next(error);
        }
    };
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const account = await accountService.getAccountById(id);
            res.status(200).json(account);
        } catch (error) {
            next(error);
        }
    };
    getBalanceById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const balance = await accountService.getBalanceByAccountId(id);
            res.status(200).json(balance);
        } catch (error) {
            next(error);
        }
    };
    getAllByCustomerId = async (req, res, next) => {
        try {
            const { id_customer } = req.params;
            const accounts = await accountService.getAllAccountsByCustomerId(id_customer);
            res.status(200).json(accounts);
        } catch (error) {
            next(error);
        }
    };
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            await accountService.deleteAccount(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
    getAggregatedView = async (req, res, next) => {
        try {
            const { id_account: accountId, id_customer: customerId } = req.params;
            const aggregatedView = await accountService.getAggregatedViewAccounts(accountId, customerId);
            res.status(200).json(aggregatedView);
        } catch (error) {
            next(error);
        }
    };
}

export default new AccountController();