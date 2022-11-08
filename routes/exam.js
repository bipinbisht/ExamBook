const express = require("express");

const router = express.Router();
const {
  createExam,
  getAllTeacherExams,
  getExam,
  getAllExams,
} = require("../controllers/exam");

router.route("/").post(createExam).get(getAllTeacherExams);
router.route("/all").get(getAllExams);
router.route("/:id").get(getExam);

module.exports = router;
