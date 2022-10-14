const Teacher = require("../models/Teacher");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getTeacher = async (req, res) => {
  const teacher = req.user;

  const result = await Teacher.find({ _id: teacher.userId });
  if (!result)
    throw new NotFoundError(`No teacher found with id ${teacher.userId}`);
  res.status(StatusCodes.OK).json({ student: result[0] });
};
module.exports = {
  getTeacher,
};
