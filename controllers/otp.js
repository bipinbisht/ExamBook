const Otp = require("../models/Otp");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const { sendEmail, generateOtp, createJWT } = require("../utils");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");

const subject = "Change Password";

//send otp for forgot password (1st)
const OtpForForgotPassword = async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role)
    throw new BadRequestError("Please provide both email and role");

  if (role === "student") {
    const student = await Student.findOne({ email: email });
    if (!student)
      throw new NotFoundError(`No student found with this email ${email}`);
    const otp = await generateOtp(email);
    const emailBody = `<h3 style="color:gray">Hi your otp <strong style ="color:blue;font-size:24px" >${otp}</strong> for forgot password
    is valid till 5 minutes...</h3>`;
    sendEmail({ email, emailBody, subject });
    const data = {
      userId: student._id,
      email: email,
      name: `${student.firstName} ${student.lastName}`,
      role: student.role,
    };
    res
      .status(StatusCodes.OK)
      .json({ msg: "otp sent successfully", data, otp: otp });
  }
  if (role === "teacher") {
    const teacher = await Teacher.findOne({ email: email });
    if (!teacher)
      throw new NotFoundError(`No teacher found with this email ${email}`);
    const otp = await generateOtp(email);
    const emailBody = `<h3 style="color:gray">Hi your otp <strong style ="color:blue;font-size:24px" >${otp}</strong> for forgot password
    is valid till 5 minutes...</h3>`;
    sendEmail({ email, emailBody, subject });
    const data = {
      userId: teacher._id,
      email: email,
      name: `${teacher.firstName} ${teacher.lastName}`,
      role: teacher.role,
    };
    res
      .status(StatusCodes.OK)
      .json({ msg: "otp sent successfully", data, otp: otp });
  }
};
//(2)
const verifyOtpOnForgotPassword = async (req, res) => {
  const { email } = req.body.data;
  const { data } = req.body;
  const otpHolder = await Otp.find({
    email: email,
  });
  if (otpHolder.length === 0)
    throw new BadRequestError("Your otp has been expired!");
  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const isOtpValid = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
  if (rightOtpFind.email === email && isOtpValid) {
    const OtpDelete = await Otp.deleteMany({
      email: rightOtpFind.email,
    });
    res.status(StatusCodes.OK).json({ data, msg: "otp verified successfully" });
  } else {
    throw new BadRequestError("Your otp was incorrect!");
  }
};
//(3)
const setNewPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { userId, role } = req.body.data;
  console.log("after old password");
  if (!newPassword) throw new BadRequestError("Please provide password");
  if (role === "teacher") {
    console.log("inside teacher");
    const teacher = await Teacher.findOne({ _id: userId });
    console.log(teacher);
    teacher.password = newPassword;
    await teacher.save();
    res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
  }
  if (role === "student") {
    const student = await Student.findOne({ _id: userId });
    student.password = newPassword;
    await student.save();
    res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
  }
};

const verifyOtpRegister = async (req, res) => {
  const { name, role, email } = req.body.data;
  const otpHolder = await Otp.find({
    email: email,
  });
  if (otpHolder.length === 0)
    throw new BadRequestError("Your otp has been expired!");
  const rightOtpFind = otpHolder[otpHolder.length - 1];
  const isOtpValid = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
  if (rightOtpFind.email === email && isOtpValid) {
    const OtpDelete = await Otp.deleteMany({
      email: rightOtpFind.email,
    });
    const data = req.body.data;
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
    const student = await Student.create(data);
    const tokenUser = {
      name: student.name,
      userId: student._id,
      role: student.role,
    };
    const token = createJWT({ payload: tokenUser });
    return token;
  } else if (role === "teacher") {
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
  OtpForForgotPassword,
  verifyOtpOnForgotPassword,
  setNewPassword,
  verifyOtpRegister,
};
