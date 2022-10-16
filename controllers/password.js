const { BadRequestError, UnauthenticatedError } = require("../errors");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");

const updatePassword = async (req, res) => {
  const { role, userId } = req.user;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    throw new BadRequestError("Please provide both values");
  if (role === "teacher") {
    const teacher = await Teacher.findOne({ _id: userId });

    const isPasswordCorrect = await teacher.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    teacher.password = newPassword;
    await teacher.save();
    res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
  }
  if (role === "student") {
    const student = await Student.findOne({ _id: userId });

    const isPasswordCorrect = await student.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    student.password = newPassword;
    await student.save();
    res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
  }
};

module.exports = {
  updatePassword,
};
