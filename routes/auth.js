const express = require("express");
const router = express.Router();
const { login, registerWithOtp } = require("../controllers/auth");
router.post("/login", login);
router.post("/register", registerWithOtp);

module.exports = router;
