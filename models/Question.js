const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: 3,
    },
    options: {
      type: Array,
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
  },
  { timestamps: true, collection: "Question", versionKey: false }
);

module.exports = mongoose.model("Question", QuestionSchema);
