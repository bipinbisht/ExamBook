const express = require("express");
const router = express.Router();

const { addQuestion, getAllQuestion } = require("../controllers/question");

router.route("/add").post(addQuestion);
router.route("/").get(getAllQuestion);

module.exports = router;
