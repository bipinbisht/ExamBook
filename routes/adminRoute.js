const express = require("express");
const router = express.Router();

const {
  getAllStudent,
  getAllTeacher,
  adminLogin,
  changeStatus,
  getStudentDetails,
  getTeacherDetails,
} = require("../controllers/admin");

router.route("/status/:id").patch(changeStatus);
router.route("/student-details/:id").get(getStudentDetails);
router.route("/teacher-details/:id").get(getTeacherDetails);
router.route("/students").get(getAllStudent);
router.route("/teachers").get(getAllTeacher);
router.route("/login").post(adminLogin);
module.exports = router;
