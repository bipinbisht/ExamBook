const express = require("express");

const router = express.Router();
const { createExam, getAllExams, getExam } = require("../controllers/exam");

router.route("/").post(createExam).get(getAllExams);
router.route("/:id").get(getExam);

module.exports = router;
