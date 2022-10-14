const express = require("express");
const router = express.Router();

const { getStudent } = require("../controllers/student");

router.route("/details").get(getStudent);
module.exports = router;
