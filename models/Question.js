const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    minlength: 3,
  },
  a: {
    type: String,
    required: true,
  },
  b: {
    type: String,
    required: true,
  },
  c: {
    type: String,
    required: true,
  },
  d: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  questionOfWhichExam: {
    type: mongoose.Types.ObjectId,
    ref: "Exam",
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
