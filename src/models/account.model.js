import mongoose from "mongoose";
import autoIncrementId from "../plugins/custom-auto-increment-id.plugin.js";

const accountSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['checking', 'savings']
    },
    branch: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    owner: {
        type: String,
        ref: 'Customer',
        required: true
    },
    transactions: [{
        type: String,
        ref: 'Transaction'
    }],
}, {
    timestamps: true
});

accountSchema.plugin(autoIncrementId, { 
    modelName: 'Account', prefix: 'acc_', paddingLength: 3 
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
