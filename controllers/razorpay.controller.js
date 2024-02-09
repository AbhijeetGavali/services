const validater = require("../helpers/validater.js");
const Service = require("../models/services.js");
const Provider = require("../models/provider.js");
const db = require("mongodb");

const controller = {};

const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "rzp_test_nmHfTTmpec8xQ3",
  key_secret: "DZI1B9QxD7ocIDCFV3BjB4Gt",
});

controller.razorpay = async (req, res) => {
  try {
    const rz = await instance.orders.create({
      amount: parseInt(req.body.amount) * 100,
      currency: "INR",
      receipt: req.body.receipt,
      partial_payment: false,
      notes: {},
    });
    return res.status(200).json({ code: 1, rz });
  } catch (error) {
    console.error(req.baseUrl, req.body, error);
    return res.status(500).json({ code: 0, msg: "Internal Server Error" });
  }
};

module.exports = controller;
