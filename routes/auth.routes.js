const express = require("express");
const controller = require("../controllers/auth.controller");
const { authorizeToken } = require("../helpers/token");
const { TOKEN_TYPES } = require("../config/token_type");
const { checkRole } = require("../helpers/checkRole");
const { ROLE } = require("../config/roles");

const router = express.Router();

// signup user and return token
router.post("/sign-up", controller.signup);
router.post("/sign-up-provider", controller.signupprovider);

// // signin user and return token
router.post("/sign-in", controller.signin);

// // get a reset password link
router.post("/reset-password", controller.sendResetLink);

router.post(
  "/verify-booking",
  authorizeToken(TOKEN_TYPES.LOGIN),
  controller.generateBookingOTP,
);

// // reset password
router.patch(
  "/reset-password",
  authorizeToken(TOKEN_TYPES.PASSWORD_RESET),
  controller.updatePassword,
);

router.patch("/", authorizeToken(TOKEN_TYPES.LOGIN), controller.updateDetails);

// // validate otp
router.post(
  "/validate-otp",
  authorizeToken(TOKEN_TYPES.OTP_CHECK),
  controller.validateOTP,
);

router.delete("/:id", controller.deleteUser);

router.get("/u", controller.getAllUsers);

router.get("/p", controller.getAllProviders);

router.patch("/p/approve/:id", controller.approveProviders);

module.exports = router;
