const Doctor = require("../models/Doctor");

// Create Doctor
const createDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);

        res.status(201).json({
            success: true,
            message: "Doctor Added Successfully",
            doctor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Doctors
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();

        res.status(200).json({
            success: true,
            count: doctors.length,
            doctors
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Single Doctor
const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor Not Found"
            });
        }

        res.status(200).json({
            success: true,
            doctor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Doctor
const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Doctor Updated Successfully",
            doctor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Doctor
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor Not Found"
            });
        }

        await doctor.deleteOne();

        res.status(200).json({
            success: true,
            message: "Doctor Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createDoctor,
    getDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor
};