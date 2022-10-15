const Otp = require("../models/Otp");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const otpGenerator = require("otp-generator");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { sendEmail } = require("../utils");

//send otp for forgot password
const OtpForPasswordReset = async (req, res) => {
  let email = " ";
  const { userId, name, role } = req.user;
  if (role === "student") {
    const student = await Student.findOne({ _id: userId });
    email = student.email;
  }
  if (role === "teacher") {
    const teacher = await Teacher.findOne({ _id: userId });
    email = teacher.email;
  }
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
  //   console.log(result);
  await sendEmail({ email, OTP });
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Otp sent successfully", email: email, otp: OTP });
};

const otpForRegister = async (req, res) => {
  const { email } = req.body;
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
  return res.status(StatusCodes.OK).json({ msg: "Otp sent successfully" });
};

const verifyOtp = async (req, res) => {
  const otpHolder = await Otp.find({
    email: req.body.email,
  });
  if (otpHolder.length === 0)
    throw new BadRequestError("Your otp has been expired!");
  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const isOtpValid = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
  if (rightOtpFind.email === req.body.email && isOtpValid) {
    const OtpDelete = await Otp.deleteMany({
      email: rightOtpFind.email,
    });
    return res.status(StatusCodes.OK).json({ msg: "otp is verified..." });
  } else {
    throw new BadRequestError("Your otp was incorrect!");
  }
};

module.exports = {
  OtpForPasswordReset,
  otpForRegister,
  verifyOtp,
};
