import mongoose from 'mongoose';

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
    source_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    viewer_accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }]
}, { timestamps: true });

const Consent = mongoose.model('Consent', consentSchema);

export default Consent;