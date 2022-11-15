const Student = require("../models/Student");
const Exam = require("../models/Exam");
const { purchase } = require("../utils/purchaseExam");
const { NotFoundError, BadRequestError, CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { NativeDate } = require("mongoose");

const getStudent = async (req, res) => {
  const student = req.user;

  const result = await Student.find({ _id: student.userId });
  const isEmpty = Object.keys(result).length === 0;
  if (isEmpty)
    throw new NotFoundError(`No student found with id ${student.userId}`);
  if (!result)
    throw new NotFoundError(`No student found with id ${student.userId}`);
  res.status(StatusCodes.OK).json({ student: result[0] });
};

const getAllCategoryForExam = async (req, res) => {
  // Nda,afcat,cds,mcat
  const examCategory = ["NDA", "AFCAT", "CDS", "MCAT", "CAD"];
  res.status(StatusCodes.OK).json(examCategory);
};

const getAllExamByCategory = async (req, res) => {
  const { category } = req.body;
  const exam = await Exam.find({}).where("examCategory").equals(category);
  if (exam.length === 0) {
    throw new NotFoundError(`No Exam found `);
  }
  res.status(StatusCodes.OK).json(exam);
};

const buyExam = async (req, res) => {
  // 637337b021ec1a3cb419b27f nda
  const { _id } = req.body;
  const examId = _id;
  const exam = await Exam.findById({ _id: examId });
  if (!exam) {
    throw new NotFoundError(`No Exam found with id ${examId}`);
  }
  const { name, credit } = exam;
  const examCredit = credit;
  console.log(examCredit);
  const { userId, role } = req.user;
  const student = await Student.findById({ _id: userId });
  if (!student) {
    throw new NotFoundError(`No Student found with id ${userId}`);
  }
  const { wallet, email } = student;
  console.log(wallet);
  const updatedwallet = await purchase(examCredit, wallet);
  student.wallet = updatedwallet;
  let studentExams = student.myExams;
  studentExams = [exam, ...studentExams];
  console.log(studentExams);
  student.myExams = studentExams;
  await student.save();
  console.log(updatedwallet);
  res.status(StatusCodes.OK).json(student);
};
module.exports = {
  getStudent,
  getAllCategoryForExam,
  buyExam,
  getAllExamByCategory,
};
