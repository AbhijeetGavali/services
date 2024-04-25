const express = require("express");
const controller = require("../controllers/provider.controller");
const { checkRole } = require("../helpers/checkRole");
const { ROLE } = require("../config/roles");

const router = express.Router();

router.get("/location/:city", controller.getPRovidersByCity);
router.get("/", controller.getProvidersByName);
router.post("/slots/:id", controller.addBooking);
router.post(
  "/slots/:id/approve",
  checkRole([ROLE.PROVIDER]),
  controller.approveBooking,
);
router.post(
  "/slots/:id/reject",
  checkRole([ROLE.PROVIDER]),
  controller.rejectBooking,
);
router.get("/slots/:id", controller.getPRovidersSlotsById);
router.get("/slots/details/:id", controller.getPRovidersSlotsDetailsById);
router.get("/:id", controller.getPRovidersById);
router.patch("/:id", controller.updateRating);

module.exports = router;
