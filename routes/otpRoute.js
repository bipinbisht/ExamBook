const express = require("express");
const router = express.Router();

const {
  OtpForForgotPassword,
  verifyOtpOnForgotPassword,
  setNewPassword,
  verifyOtpRegister,
} = require("../controllers/otp");

router.route("/forgot-password").post(OtpForForgotPassword);
router.route("/verify-otp-password").post(verifyOtpOnForgotPassword);
router.route("/set-password").patch(setNewPassword);

router.route("/verify-otp-register").post(verifyOtpRegister);
module.exports = router;
