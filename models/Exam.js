const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema();

module.exports = mongoose.model("Exam", ExamSchema);
