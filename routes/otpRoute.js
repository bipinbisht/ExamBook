const express = require("express");
const router = express.Router();

const {
  OtpForPasswordReset,
  otpForRegister,
  verifyOtp,
} = require("../controllers/otp");

router.route("/otp-register").post(otpForRegister);
router.route("/forgot-password").post(OtpForPasswordReset);
router.route("/verify-otp").post(verifyOtp);
module.exports = router;
