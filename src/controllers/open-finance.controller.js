class OpenFinanceController {
    getSharedData = async (req, res, next) => {
        try {
            res.status(200).json({
                message: "Authenticated via Open Finance",
                data: {
                    sharedAccounts: "Your shared account data would appear here."
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new OpenFinanceController();