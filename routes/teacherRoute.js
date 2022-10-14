const express = require("express");
const router = express.Router();

const { getTeacher } = require("../controllers/teacher");

router.route("/details").get(getTeacher);
module.exports = router;
