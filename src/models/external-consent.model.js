import mongoose from 'mongoose';
import autoIncrementId from '../plugins/custom-auto-increment-id.plugin.js';

const externalConsentSchema = new mongoose.Schema({
     customer: {
        type: String,
        ref: 'Customer',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['AUTHORIZED', 'PENDING', 'REVOKED', 'UNAUTHORIZED'],
        default: 'UNAUTHORIZED',
    },
    // permissions: [{
    //     type: String,
    //     required: false,
    //     enum: ['BALANCES_READ', 'TRANSACTIONS_READ', 'FULL_ACCESS'],
    // }],
    expirationDateTime: {
        type: Date,
        default: () => 
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },
    // sourceAccount: {
    //     type: String,
    //     ref: 'Account', 
    //     required: false,
    // },
    apiKey: {
        type: String,
        required: false,
    }
}, { timestamps: true });

externalConsentSchema.plugin(autoIncrementId, { 
    modelName: 'ExternalConsent', prefix: 'ext_con_', paddingLength: 3 
});

const ExternalConsent = mongoose.model("ExternalConsent", externalConsentSchema);

export default ExternalConsent;

