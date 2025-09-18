import Account from "../models/account.model.js";
import Consent from "../models/consent.model.js";
import Customer from "../models/customer.model.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../exceptions/api-errors.exception.js";

class ConsentService {
    async createConsent(consentData) {
        if (!consentData.customer ||
            !consentData.currentAccount ||
            !consentData.permissions ||
            !consentData.sourceAccounts
        ) {
            throw new BadRequestError("Insufficient data to create consent");
        }

        const owner = await Customer.findById(consentData.customer);
        if (!owner) {
            throw new NotFoundError("Customer(owner of consentment) not found");
        }

        const allAccountIds = [consentData.currentAccount, ...consentData.sourceAccounts];
        const accountsFound = await Account.countDocuments({
            _id: { $in: allAccountIds },
            owner: consentData.customer
        });
        if (accountsFound !== allAccountIds.length) {
            throw new ForbiddenError("One or more accounts involved in the consent not found");
        }

        const existingConsent = await Consent.findOne({
            customer: consentData.customer,
            currentAccount: consentData.currentAccount,
            status: 'AUTHORIZED'
        });
        if (existingConsent) {
            await this.revokeConsent(existingConsent._id, consentData.customer);
        }

        const consent = await Consent.create(consentData);
        return consent;
    }
    async getConsentByAccountId(accountId) {
        const consent = await Consent.findOne({
            currentAccount: accountId,
            status: 'AUTHORIZED'
        })
            .sort({ createdAt: -1 })
            .populate('customer', 'name')
            .populate('currentAccount', 'number type')
            .populate('sourceAccounts', 'number type');
        if (!consent) {
            throw new NotFoundError("Consent not found");
        }
        return consent;
    }
    async getAllActiveConsentsByCustomerId(customerId) {
        const consents = await Consent.aggregate([
            {
                $match: {
                    customer: customerId,
                    status: 'AUTHORIZED'
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $group: {
                    _id: '$currentAccount',
                    latestConsent: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestConsent" }
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'currentAccount',
                    foreignField: '_id',
                    as: 'currentAccount'
                }
            },
            {
                $unwind: '$currentAccount'
            }
        ])
        return consents;
    }
    async revokeConsent(id, customerId) {
        const consent = await Consent.findOne({ _id: id, customer: customerId });
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
    async revokeAllConsentsByCustomerId(customerId) {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            throw new NotFoundError("Customer not found");
        }
        const filter = { customer: customerId, status: 'AUTHORIZED' };
        const update = { $set: { status: 'REVOKED' } };

        const revokeConsents = await Consent.updateMany(
            filter,
            update
        );
        return {
            message: ` ${revokeConsents.modifiedCount} consents revoked successfully`
        }
    }
}

export default new ConsentService();
