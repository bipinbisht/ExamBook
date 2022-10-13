const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { createJWT, isTokenValid } = require("../utils");
// register controller
const register = async (req, res) => {
  const { role } = req.body;
  if (role === "student") {
    const student = await Student.create({ ...req.body });
    const tokenUser = {
      name: student.name,
      userId: student._id,
      role: student.role,
    };
    const token = createJWT({ payload: tokenUser });
    res.status(StatusCodes.CREATED).json({ student: tokenUser, token });
  } else if (role === "teacher") {
    const teacher = await Teacher.create({ ...req.body });
    const tokenUser = {
      name: teacher.name,
      userId: teacher._id,
      role: teacher.role,
    };

    const token = createJWT({ payload: tokenUser });
    res.status(StatusCodes.CREATED).json({ teacher: tokenUser, token });
  } else {
    throw new BadRequestError("please provide role");
  }
};

// login controller
const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    throw new BadRequestError("Please provide email,password and role");
  }
  if (role === "student") {
    const student = await Student.findOne({ email });
    if (!student) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    // compare password
    const isPasswordCorrect = await student.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const tokenUser = {
      name: student.name,
      userId: student._id,
      role: student.role,
    };
    const token = createJWT({ payload: tokenUser });
    res.status(StatusCodes.OK).json({ student: tokenUser, token });
  } else if (role === "teacher") {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    // compare password
    const isPasswordCorrect = await teacher.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const tokenUser = {
      name: teacher.name,
      userId: teacher._id,
      role: teacher.role,
    };

    const token = createJWT({ payload: tokenUser });
    res.status(StatusCodes.OK).json({ teacher: tokenUser, token });
  }
};

module.exports = {
  register,
  login,
};
