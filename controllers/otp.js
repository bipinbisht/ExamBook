const Otp = require("../models/Otp");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const otpGenerator = require("otp-generator");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { sendEmail, createJWT } = require("../utils");

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
  sendEmail({ email, OTP });
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Otp sent successfully", email: email, otp: OTP });
};

const verifyOtpRegister = async (req, res) => {
  const { name, role, email, otp } = req.body;
  const otpHolder = await Otp.find({
    email: email,
  });
  if (otpHolder.length === 0)
    throw new BadRequestError("Your otp has been expired!");
  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const isOtpValid = await bcrypt.compare(otp, rightOtpFind.otp);
  if (rightOtpFind.email === email && isOtpValid) {
    const OtpDelete = await Otp.deleteMany({
      email: rightOtpFind.email,
    });
    const data = req.body;
    const token = await roleCheck(data);
    const user = {
      name: name,
      role: role,
      email: email,
    };
    return res
      .status(StatusCodes.CREATED)
      .json({ user: user, msg: "otp verified successfully...", token: token });
  } else {
    throw new BadRequestError("Your otp was incorrect!");
  }
};

const roleCheck = async (data) => {
  console.log(data);
  const { role } = data;
  if (role === "student") {
    console.log("inside studnet role");
    const student = await Student.create(data);
    const tokenUser = {
      name: student.name,
      userId: student._id,
      role: student.role,
    };
    const token = createJWT({ payload: tokenUser });
    return token;
  } else if (role === "teacher") {
    console.log("inside teacher role");
    const teacher = await Teacher.create(data);
    const tokenUser = {
      name: teacher.name,
      userId: teacher._id,
      role: teacher.role,
    };
    const token = createJWT({ payload: tokenUser });
    return token;
  }
};

module.exports = {
  OtpForPasswordReset,
  verifyOtpRegister,
};
