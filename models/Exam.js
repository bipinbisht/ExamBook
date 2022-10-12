const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  time: {
    type: Number,
    required: true,
  },
  questions: {
    type: Number,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Teacher",
    required: [true, "Please provide teacher"],
  },
});

module.exports = mongoose.model("Exam", ExamSchema);
