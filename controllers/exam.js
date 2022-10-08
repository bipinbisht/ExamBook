const Exam = require("../models/Exam");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createExam = async (req, res) => {
  const user = req.user;
  res.status(StatusCodes.CREATED).json({ user });
};

module.exports = {
  createExam,
};
