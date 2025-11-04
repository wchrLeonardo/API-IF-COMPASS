import jwt from 'jsonwebtoken';
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
            const consent = await ExternalConsent.findOne({ apiKey: apiKeyHeader });

            if (!consent || consent.status !== 'AUTHORIZED' || consent.expirationDateTime <= new Date()) {
                 throw new ForbiddenError('API Key inválida, revogada ou expirada.');
            }
            
            req.consentInfo = { 
                consentId: consent._id, 
                customerId: consent.customer, 
                permissions: consent.permissions 
            }; 
            return next(); 

        } catch(error) {
            return next(error); 
        }
    }
    return next(new UnauthorizedError('Autenticação necessária. Forneça um Token JWT ou API Key válida.'));
};