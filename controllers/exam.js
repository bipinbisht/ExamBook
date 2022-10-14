const Exam = require("../models/Exam");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createExam = async (req, res) => {
  const teacher = req.user;
  console.log(teacher);
  req.body.createdBy = teacher.userId;
  const exam = await Exam.create(req.body);
  res.status(StatusCodes.CREATED).json({ exam });
};
const getAllExams = async (req, res) => {
  const teacher = req.user;
  const exams = await Exam.find({ createdBy: teacher.userId });
  if (!exams) {
    throw new NotFoundError("No exams found!!!");
  }
  res.status(StatusCodes.OK).json({ exams, count: exams.length });
};
const getExam = async (req, res) => {
  const {
    params: { id: examId },
  } = req;
  const exam = await Exam.findOne({ _id: examId });
  if (!exam) {
    throw new NotFoundError(`No exam found with id ${examId}`);
  }
  res.status(StatusCodes.OK).json(exam);
};
module.exports = {
  createExam,
  getAllExams,
  getExam,
};
