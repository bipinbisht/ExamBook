const Student = require("../models/Student");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getStudent = async (req, res) => {
  const student = req.user;

  const result = await Student.find({ _id: student.userId });
  if (!result)
    throw new NotFoundError(`No student found with id ${student.userId}`);
  res.status(StatusCodes.OK).json({ student: result[0] });
};
module.exports = {
  getStudent,
};
