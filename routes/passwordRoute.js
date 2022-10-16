const express = require("express");
const router = express.Router();

const { updatePassword } = require("../controllers/password");

router.route("/reset").patch(updatePassword);

module.exports = router;
