const Student = require("../models/Student");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const createOrder = async (req, res) => {
  let { amount } = req.body;
  if (!amount) {
    throw new BadRequestError("Please Provide amount");
  }
  console.log(amount * 100);
  let options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "Exam-bell",
  };
  razorpay.orders.create(options, (err, order) => {
    console.log(order);
    res
      .status(StatusCodes.OK)
      .json({ orderId: order.id, amount: order.amount });
  });
};

const verifyOrder = async (req, res) => {
  const { paymentId: razorpay_payment_id } = req.body;
  razorpay.payments.fetch(paymentId).then((paymentData) => {
    console.log(paymentData);
  });
};

module.exports = {
  createOrder,
  verifyOrder,
};