const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    code: {
        type: String,
        default: Date.now,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        max: 100,
    }
}, { versionKey: false });

module.exports = mongoose.model("tickets", ticketSchema);
