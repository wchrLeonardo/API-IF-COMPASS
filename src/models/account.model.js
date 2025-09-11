import mongoose from "mongoose";

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
}, {
    timestamps: true
});


const Account = mongoose.model("Account", accountSchema);

export default Account;
