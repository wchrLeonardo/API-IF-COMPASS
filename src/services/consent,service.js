import Account from "../models/account.model.js";
import Consent from "../models/consent.model.js";
import Customer from "../models/customer.model.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../exceptions/api-errors.js";

class ConsentService {

    async createConsent(consentData) {
        if (!consentData.customer ||
            !consentData.source_account ||
            !consentData.permissions ||
            !consentData.viewer_accounts
        ) {
            throw new BadRequestError("Insufficient data to create consent");
        }

        const owner = await Customer.findById(consentData.customer);
        if (!owner) {
            throw new NotFoundError("Customer(owner of consentment) not found");
        }

        const allAccountIds = [consentData.source_account, ...consentData.viewer_accounts];
        const accountsFound = await Account.countDocuments({
            _id: { $in: allAccountIds },
            owner: consentData.customer
        });
        if (accountsFound !== allAccountIds.length) {
            throw new ForbiddenError("One or more accounts involved in the consent not found");
        }

        const existingConsent = await Consent.findOne({
            customer: consentData.customer,
            source_account: consentData.source_account,
            status: 'AUTHORIZED'
        });
        if (existingConsent) {
            await this.revokeConsent(existingConsent._id, consentData.customer);
        }

        const consent = await Consent.create(consentData);
        return consent;
    }

    async getConsentById(id) {
        const consent = await Consent.findById(id).populate('account', 'number owner');
        if (!consent) {
            throw new NotFoundError("Consent not found");
        }
        return consent;
    }

    async revokeConsent(id, id_customer) {
        const consent = await Consent.findOne({ _id: id, customer: id_customer });
        if (!consent) {
            throw new NotFoundError("Consent not found");
        }

        if (consent.status === 'REVOKED') {
            throw new BadRequestError("This consent is already revoked");
        }

        consent.status = 'REVOKED';
        await consent.save();
        return consent;

    }

}

export default new ConsentService();
