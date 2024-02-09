const express = require("express");
const controller = require("../controllers/razorpay.controller");

const router = express.Router();

router.post("/", controller.razorpay);

module.exports = router;
