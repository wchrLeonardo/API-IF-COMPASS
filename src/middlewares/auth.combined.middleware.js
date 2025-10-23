import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../exceptions/api-errors.exception.js'; 
import Consent from '../models/consent.model.js'; // Assume que a API Key está ligada ao Consent

export const authenticateRequest = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const apiKeyHeader = req.headers['x-api-key']; // Ou o header que você definiu

    // --- TENTATIVA 1: Autenticação via JWT (Usuário Interno) ---
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        if (token) {
            try {
                const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decodedPayload; // Anexa dados do usuário
                return next(); // Autenticado com JWT, PODE ACESSAR, não precisa checar API Key
            } catch (err) {
                // Se o token JWT foi fornecido mas é inválido/expirado, bloqueia imediatamente.
                return next(new UnauthorizedError('Token JWT inválido ou expirado.')); 
            }
        }
    }

    // --- TENTATIVA 2: Autenticação via API Key (Aplicação Externa / ControlF) ---
    if (apiKeyHeader) {
        try {
            // Lógica para validar a API Key
            // (Exemplo: buscar o consentimento associado à chave)
            const consent = await Consent.findOne({ apiKey: apiKeyHeader }); // Supondo que 'apiKey' está no model Consent

            // Verifica se a chave existe, se o consentimento está ativo e não expirado
            if (!consent || consent.status !== 'AUTHORIZED' || consent.expirationDateTime <= new Date()) {
                 throw new ForbiddenError('API Key inválida, revogada ou expirada.');
            }
            
            // Anexa informações relevantes do consentimento (ex: permissões, ID do usuário associado)
            req.consentInfo = { 
                consentId: consent._id, 
                customerId: consent.customer, // O ID do usuário DONO dos dados na API filha
                permissions: consent.permissions 
            }; 
            return next(); // Autenticado com API Key, PODE ACESSAR

        } catch(error) {
            // Se a API Key foi fornecida mas é inválida, bloqueia.
            // Passa o erro (ForbiddenError ou outro) para o error middleware central.
            return next(error); 
        }
    }

    // --- FALHA: Nenhuma autenticação válida encontrada ---
    // Se chegou até aqui, nem JWT Bearer válido nem API Key válida foram fornecidos.
    return next(new UnauthorizedError('Autenticação necessária. Forneça um Token JWT ou API Key válida.'));
};