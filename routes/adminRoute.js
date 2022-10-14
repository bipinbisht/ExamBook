const express = require("express");
const router = express.Router();

const {
  getAllStudent,
  getAllTeacher,
  adminLogin,
  changeStatus,
} = require("../controllers/admin");

router.route("/students").get(getAllStudent);
router.route("/teachers").get(getAllTeacher);
router.route("/login").post(adminLogin);
router.route("/status/:id").patch(changeStatus);
module.exports = router;
