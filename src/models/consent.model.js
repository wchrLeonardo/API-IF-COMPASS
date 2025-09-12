import mongoose from 'mongoose';
import autoIncrementId from '../plugins/custom-auto-increment-id.plugin.js';

const consentSchema = new mongoose.Schema({
     customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['AUTHORIZED', 'REVOKED', 'UNAUTHORIZED'],
        default: 'UNAUTHORIZED',
    },
    permissions: [{
        type: String,
        required: true,
        enum: ['ACCOUNTS_READ', 'BALANCES_READ', 'TRANSACTIONS_READ']
    }],
    expirationDateTime: {
        type: Date,
        default: () => 
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },
    currentAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    sourceAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }]
}, { timestamps: true });

consentSchema.plugin(autoIncrementId, { 
    modelName: 'Consent', prefix: 'con_', paddingLength: 3 
});

const Consent = mongoose.model("Consent", consentSchema);

export default Consent;

