const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema(
  {
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
    credit: {
      type: Number,
      required: true,
      get: getCredit,
      set: setCredit,
    },
  },
  { timestamps: true, collection: "Exam", versionKey: false }
);
function getCredit(num) {
  return (num / 100).toFixed(2);
}

function setCredit(num) {
  return num * 100;
}

module.exports = mongoose.model("Exam", ExamSchema);
