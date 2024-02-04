const express = require("express");

const router = express.Router();

// routing in apis to controller modules
router.use("/auth", require("./auth.routes"));

module.exports = router;
