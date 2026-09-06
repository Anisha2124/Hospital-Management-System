const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
{
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "UPI"],
        required: true
    },

    status: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Pending"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Billing", billingSchema);