const express = require("express");
const controller = require("../controllers/auth.controller");
const { authorizeToken } = require("../helpers/token");
const { TOKEN_TYPES } = require("../config/token_type");

const router = express.Router();

// signup user and return token
router.post("/sign-up", controller.signup);

// // signin user and return token
router.post("/sign-in", controller.signin);

// // get a reset password link
router.post("/reset-password", controller.sendResetLink);

// // reset password
router.patch(
  "/reset-password",
  authorizeToken(TOKEN_TYPES.PASSWORD_RESET),
  controller.updatePassword,
);

// // validate otp
router.post(
  "/validate-otp",
  authorizeToken(TOKEN_TYPES.OTP_CHECK),
  controller.validateOTP,
);

module.exports = router;
