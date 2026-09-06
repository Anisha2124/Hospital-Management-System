const Billing = require("../models/billing");

// Create Bill
const createBill = async (req, res) => {
    try {

        const bill = await Billing.create(req.body);

        res.status(201).json({
            success: true,
            message: "Bill Created Successfully",
            bill
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Bills
const getBills = async (req, res) => {
    try {

        const bills = await Billing.find().populate("patient");

        res.status(200).json({
            success: true,
            count: bills.length,
            bills
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createBill,
    getBills
};