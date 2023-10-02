const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
} = require("../Controllers/Auth.controller");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);
router.delete("/logout", logoutController);

module.exports = router;
