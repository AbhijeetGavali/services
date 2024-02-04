const express = require("express");
const controller = require("../controllers/service.controller");
const { checkRole } = require("../helpers/checkRole");
const { ROLE } = require("../config/roles");

const router = express.Router();

router.post(
  "/",
  checkRole([ROLE.ADMIN, ROLE.PROVIDER]),
  controller.createService,
);

router.get("/", controller.allServices);
router.get("/:id", controller.getServiceProviders);

module.exports = router;
