const Appointment = require("../models/Appointment");

// Create Appointment
const createAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.create(req.body);

        res.status(201).json({
            success: true,
            message: "Appointment Created Successfully",
            appointment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Appointments
const getAppointments = async (req, res) => {
    try {

        const appointments = await Appointment.find()
            .populate("patient")
            .populate("doctor");

        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get One Appointment
const getAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.findById(req.params.id)
            .populate("patient")
            .populate("doctor");

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment Not Found"
            });
        }

        res.status(200).json({
            success: true,
            appointment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Appointment
const updateAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment Updated Successfully",
            appointment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment Not Found"
            });
        }

        await appointment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Appointment Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment
};