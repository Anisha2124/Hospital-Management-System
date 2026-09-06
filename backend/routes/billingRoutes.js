const express = require("express");

const router = express.Router();

const {
    createBill,
    getBills
} = require("../controllers/billingController");

router.post("/", createBill);

router.get("/", getBills);

module.exports = router;