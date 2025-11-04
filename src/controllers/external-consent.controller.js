//Controller para revogar a conexão com a CONTROL FINANCE
import ExternalConsentService from '../services/external-consent.service.js';

const revokeExternalConsent = async (req, res, next) => {
    try {
        const { id_external_consent, id_customer } = req.params;
        const result = await ExternalConsentService.delete(id_external_consent, id_customer);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }  
};

export default {
    revokeExternalConsent
};