import Counter from "../models/counter.model.js";
import { BadRequestError } from "../exceptions/api-errors.exception.js";

function autoIncrementId(schema, options) {
    const { modelName, prefix, paddingLength = 3 } = options;

    if (!modelName || !prefix) {
        throw new BadRequestError("modelName and prefix are required options for autoIncrementId plugin");
    }

    schema.add({
        _id: {
            type: String,
            unique: true
        }
    });

    schema.pre('save', async function (next) {
        if (this.isNew) {
            try {
                const counter = await Counter.findByIdAndUpdate(
                    modelName,
                    { $inc: { seq: 1 } },
                    { new: true, upsert: true }
                );
                const sequenceNumber = counter.seq.toString().padStart(paddingLength, '0');
                this._id = `${prefix}${sequenceNumber}`;
                next();
            } catch (error) {
                next(error);
            }
        } else {
            next();
        }
    })
}

export default autoIncrementId;
