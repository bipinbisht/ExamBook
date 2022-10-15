const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");

const generateOtp = async (email) => {
  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(OTP);
  const otp = new Otp({ email: email, otp: OTP });
  const salt = await bcrypt.genSalt(10);
  otp.otp = await bcrypt.hash(otp.otp, salt);
  const result = await otp.save();
  return OTP;
};

module.exports = {
  generateOtp,
};
