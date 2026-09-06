const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Billing = require("../models/billing");

const getDashboard = async (req, res) => {
    try {

        const patientCount = await Patient.countDocuments();
        const doctorCount = await Doctor.countDocuments();
        const appointmentCount = await Appointment.countDocuments();

        const bills = await Billing.find();

        let revenue = 0;

        bills.forEach((bill) => {
            if (bill.status === "Paid") {
                revenue += bill.amount;
            }
        });

        res.status(200).json({
            patients: patientCount,
            doctors: doctorCount,
            appointments: appointmentCount,
            revenue
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = { getDashboard };