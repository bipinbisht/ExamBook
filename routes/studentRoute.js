const express = require("express");
const router = express.Router();

const {
  getStudent,
  getAllCategoryForExam,
  buyExam,
} = require("../controllers/student");

router.route("/details").get(getStudent);
router.route("/exam-category").get(getAllCategoryForExam);
router.route("/buy-exam").post(buyExam);
module.exports = router;
