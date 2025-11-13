import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UnauthorizedError, ForbiddenError } from '../exceptions/api-errors.exception.js'; 
import ExternalConsent from '../models/external-consent.model.js'; 

export const authenticateRequest = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const apiKeyHeader = req.headers['x-api-key']; 

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token) {
            try {
                const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decodedPayload; 
                return next(); 
            } catch (err) {
                return next(new UnauthorizedError('Token JWT inválido ou expirado.')); 
            }
        }
    }

    if (apiKeyHeader) {
        try {
            const consents = await ExternalConsent.find({ 
                status: 'AUTHORIZED',
                expirationDateTime: { $gt: new Date() } 
            });

            let validConsent = null;
            for (const consent of consents) {
                const isMatch = bcrypt.compare(apiKeyHeader, consent.apiKey);
                if (isMatch) {
                    validConsent = consent;
                    break;
                }
            }
            if (!validConsent) {
                 throw new ForbiddenError('API Key invalid, revoked, or expired.');
            }
            
            req.consentInfo = { 
                consentId: validConsent._id, 
                customerId: validConsent.customer, 
                permissions: validConsent.permissions 
            }; 
            return next(); 

        } catch(error) {
            return next(error); 
        }
    }
    return next(new UnauthorizedError('Authentication required. Provide a valid JWT Token or API Key.'));
};