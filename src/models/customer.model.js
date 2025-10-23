import mongoose from "mongoose";
import autoIncrementId from "../plugins/custom-auto-increment-id.plugin.js";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    accounts: [{
        type: String,
        ref: 'Account'
    }],
}, {
    timestamps: true
});

customerSchema.plugin(autoIncrementId, { 
    modelName: 'Customer', prefix: 'cus_', paddingLength: 3 
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
