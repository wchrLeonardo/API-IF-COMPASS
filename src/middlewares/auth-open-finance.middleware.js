import { UnauthorizedError, ForbiddenError } from "../exceptions/api-errors.exception.js";

class AuthOpenFinance {
    verifyApiKey(req, res, next) {
        const validApiKeys = process.env.VALID_API_KEYS.split(',') || [];
        const apiKey = req.headers['x-api-key'];

        if (!apiKey) {
            throw new UnauthorizedError("API key is missing");
        }

        if (!validApiKeys.includes(apiKey)) {
            throw new ForbiddenError("Invalid API key");
        }

        next();
    }
}

export default new AuthOpenFinance();