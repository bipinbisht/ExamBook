const Question = require("../models/Question");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const addQuestion = async (req, res) => {
  console.log(req.body);
  const question = await Question.create(req.body);
  res.status(StatusCodes.CREATED).json({ question });
};
const getAllQuestion = async (req, res) => {
  const teacher = req.teacher;
  const examId = req.body.questionOfWhichExam;
  const questions = await Question.find({ questionOfWhichExam: examId });
  if (!questions) throw new NotFoundError("No question available");
  res.status(StatusCodes.OK).json({ questions, count: questions.length });
};
module.exports = {
  addQuestion,
  getAllQuestion,
};
