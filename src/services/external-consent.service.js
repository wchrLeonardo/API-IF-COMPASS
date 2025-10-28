import ExternalConsent from "../models/external-consent.model.js";
import Customer from "../models/customer.model.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../exceptions/api-errors.exception.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";


class ExternalConsentService {
    async createAndGenerateKey(consentData) {
        const { customer } = consentData;
        
        const owner = await Customer.findById(customer);
        if (!owner) {
            throw new NotFoundError("Customer(owner of consentment) not found");
        }

        const plainApiKey = crypto.randomBytes(32).toString("hex");
        const salt = await bcrypt.genSalt(10);
        const apiKeyHash = await bcrypt.hash(plainApiKey, salt);

        await ExternalConsent.create({ customer: customer,
           apiKey: apiKeyHash,
           status: 'AUTHORIZED'
        });
        return {
            plainApiKey: plainApiKey,
            userIdInChildApi: customer
        };
    }

    async revoke(consentId, customerId) {
        const externalConsent = await ExternalConsent.findOne({ _id: consentId, customer: customerId });
        if (!externalConsent) {
            throw new NotFoundError("External consent not found");
        }
        await externalConsent.remove();
    }

    //  async getAllActiveConsentsByCustomerId(customerId) {
    //     const consents = await Consent.aggregate([
    //         {
    //             $match: {
    //                 customer: customerId,
    //                 status: 'AUTHORIZED'
    //             }
    //         },
    //         {
    //             $sort: {
    //                 createdAt: -1
    //             }
    //         },
    //         {
    //             $group: {
    //                 _id: '$currentAccount',
    //                 latestConsent: { $first: "$$ROOT" }
    //             }
    //         },
    //         {
    //             $replaceRoot: { newRoot: "$latestConsent" }
    //         },
    //         {
    //             $lookup: {
    //                 from: 'accounts',
    //                 localField: 'currentAccount',
    //                 foreignField: '_id',
    //                 as: 'currentAccount'
    //             }
    //         },
    //         {
    //             $unwind: '$currentAccount'
    //         }
    //     ])
    //     return consents;
    // }
}

export default new ExternalConsentService();
