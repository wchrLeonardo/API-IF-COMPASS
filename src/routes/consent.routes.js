import { Router } from 'express';
import consentController from '../controllers/consent.controller.js';
import externalConsentController from '../controllers/external-consent.controller.js';

const consentRoutes = Router();

consentRoutes.post('/consents/account/:id_account', consentController.create);

consentRoutes.get('/consents/customer/:id_customer', consentController.getAllActiveByCustomerId);

consentRoutes.get('/consents/account/:id_account', consentController.getOneByAccountId);

consentRoutes.patch('/consents/:id/customer/:id_customer/revoke', consentController.revokeOne);

consentRoutes.patch('/consents/customer/:id_customer/revoke-all', consentController.revokeAllByCustomerId);

consentRoutes.delete('/consents/:id_external_consent/customer/:id_customer', externalConsentController.revokeExternalConsent);

export default consentRoutes;
