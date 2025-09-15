import consentService from "../services/consent.service.js";

class ConsentController {

    async create(req, res, next) {
        try {
            const consentData = req.body;
            const { id_account: accountId } = req.params;
            if (!consentData.customer || !consentData.permissions) {
                return res.status(400).json({ message: "Consent data with customer and permissions are required" });
            }
            const consent = await consentService.createConsent({
                ...consentData,
                currentAccount: accountId
            });
            res.status(201).json(consent);
        } catch (error) {
            next(error);
        }
    }
    async getOneByAccountId(req, res, next) {
        try {
            const { id_account: accountId } = req.params;
            const consent = await consentService.getConsentByAccountId(accountId);
            res.status(200).json(consent);
        } catch (error) {
            next(error);
        }
    }
    async getAllActiveByCustomerId(req, res, next) {
        try {
            const { id_customer: customerId } = req.params;
            const consents = await consentService.getAllActiveConsentsByCustomerId(customerId);
            res.status(200).json(consents);
        } catch (error) {
            next(error);
        }
    }
    async revokeOne(req, res, next) {
        try {
            const { id, id_customer: customerId } = req.params;
            await consentService.revokeConsent(id, customerId);
            res.status(204).send();
        } catch (error) {
            next(error);
        }

    }
    async revokeAllByCustomerId(req, res, next) {
        try {
            const { id_customer: customerId } = req.params;
            const result = await consentService.revokeAllConsentsByCustomerId(customerId);
            res.status(204).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new ConsentController();