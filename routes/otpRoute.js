const express = require("express");
const router = express.Router();

const {
  OtpForPasswordReset,
  verifyOtpRegister,
} = require("../controllers/otp");
router.route("/forgot-password").post(OtpForPasswordReset);
router.route("/verify-otp-register").post(verifyOtpRegister);
module.exports = router;
