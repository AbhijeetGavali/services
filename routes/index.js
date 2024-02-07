const express = require("express");
const { TOKEN_TYPES } = require("../config/token_type");
const { authorizeToken } = require("../helpers/token");

const router = express.Router();

// routing in apis to controller modules
router.use("/auth", require("./auth.routes"));
router.use(
  "/providers",
  authorizeToken(TOKEN_TYPES.LOGIN),
  require("./provider.routes"),
);
router.use(
  "/service",
  authorizeToken(TOKEN_TYPES.LOGIN),
  require("./service.routes"),
);

module.exports = router;
