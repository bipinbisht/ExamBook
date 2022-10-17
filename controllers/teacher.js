const Teacher = require("../models/Teacher");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getTeacher = async (req, res) => {
  const teacher = req.user;

  const result = await Teacher.find({ _id: teacher.userId });
  const isEmpty = Object.keys(result).length === 0;
  if (isEmpty)
    throw new NotFoundError(`No student found with id ${teacher.userId}`);
  if (!result)
    throw new NotFoundError(`No teacher found with id ${teacher.userId}`);
  res.status(StatusCodes.OK).json({ teacher: result[0] });
};
module.exports = {
  getTeacher,
};
