const Patient = require("../models/Patient");

// Create Patient
const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);

        res.status(201).json({
            success: true,
            message: "Patient Added Successfully",
            patient
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();

        res.status(200).json({
            success: true,
            count: patients.length,
            patients
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Patient by ID
const getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient Not Found"
            });
        }

        res.status(200).json({
            success: true,
            patient
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update Patient
const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient Updated Successfully",
            patient
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Patient
const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient Not Found"
            });
        }

        await patient.deleteOne();

        res.status(200).json({
            success: true,
            message: "Patient Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
};