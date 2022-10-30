const express = require("express");
const router = express.Router();

const { createOrder } = require("../controllers/payment");

router.route("/init-payment").post(createOrder);

module.exports = router;
