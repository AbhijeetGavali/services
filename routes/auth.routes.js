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

router.delete(
  "/:id",
  authorizeToken(TOKEN_TYPES.LOGIN),
  checkRole([ROLE.ADMIN]),
  controller.deleteUser,
);

router.get(
  "/u",
  authorizeToken(TOKEN_TYPES.LOGIN),
  checkRole([ROLE.ADMIN]),
  controller.getAllUsers,
);

router.get(
  "/p",
  authorizeToken(TOKEN_TYPES.LOGIN),
  checkRole([ROLE.ADMIN]),
  controller.getAllProviders,
);

router.patch(
  "/p/approve/:id",
  authorizeToken(TOKEN_TYPES.LOGIN),
  checkRole([ROLE.ADMIN]),
  controller.approveProviders,
);

module.exports = router;
