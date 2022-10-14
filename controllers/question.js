const Question = require("../models/Question");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { json } = require("express");

const addQuestion = async (req, res) => {
  const question = await Question.create(req.body);
  res.status(StatusCodes.CREATED).json({ question });
};
const getAllQuestion = async (req, res) => {
  const teacher = req.user;
  const examId = req.body.questionOfWhichExam;
  const questions = await Question.find({ questionOfWhichExam: examId });
  if (!questions) throw new NotFoundError("No question available");
  res.status(StatusCodes.OK).json({ questions, count: questions.length });
};

const getQuestion = async (req, res) => {
  const {
    params: { id: questionId },
  } = req;
  const question = await Question.findOne({ _id: questionId });
  if (!question)
    throw new NotFoundError(`No question available with id ${questionId}`);
  res.status(StatusCodes.OK).json(question);
};
module.exports = {
  addQuestion,
  getAllQuestion,
  getQuestion,
};
