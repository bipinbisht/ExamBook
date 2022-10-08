const express = require("express");

const router = express.Router();
const { createExam } = require("../controllers/exam");

router.route("/").post(createExam);

module.exports = router;
