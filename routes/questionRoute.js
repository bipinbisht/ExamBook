const express = require("express");
const router = express.Router();

const {
  addQuestion,
  getAllQuestion,
  getQuestion,
} = require("../controllers/question");

router.route("/add").post(addQuestion);
router.route("/").get(getAllQuestion);
router.route("/:id").get(getQuestion);

module.exports = router;
