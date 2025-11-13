import ExternalConsent from "../models/external-consent.model.js";
import Customer from "../models/customer.model.js";
import { NotFoundError, BadRequestError, ForbiddenError } from "../exceptions/api-errors.exception.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";


class ExternalConsentService {
    async createAndGenerateKey(consentData) {
        try{
        const { customer } = consentData;
        
        const owner = await Customer.findById(customer);
        if (!owner) {
            throw new NotFoundError("Customer(owner of consentment) not found");
        }

        const plainApiKey = crypto.randomBytes(32).toString("hex");
        const salt = await bcrypt.genSalt(10);
        const apiKeyHash = await bcrypt.hash(plainApiKey, salt);

        const newExternalConsent = await ExternalConsent.create({ 
           customer: customer,
           apiKey: apiKeyHash,
           status: 'AUTHORIZED'
        });
        return {
            plainApiKey: plainApiKey,
            userIdInChildApi: customer,
            consentIdInChildApi: newExternalConsent._id
        };
    } catch (error) {
        throw new BadRequestError("Error creating external consent: " + error.message);
    }
}

    async delete(consentId, customerId) {
        try{
        const externalConsent = await ExternalConsent.findOne({ _id: consentId, customer: customerId });
        if (!externalConsent) {
            throw new NotFoundError("External consent not found");
        }
        await externalConsent.remove();
        return { message: "External consent deleted successfully" };
    } catch (error) {
        throw new BadRequestError("Error deleting external consent: " + error.message);
    }
    }

}

export default new ExternalConsentService();
