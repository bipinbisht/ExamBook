const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    signature: {
      type: String,
    },
    StudentId: {
      type: String,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true, collection: "Payment_Status", versionKey: false }
);

module.exports = mongoose.model("Pay_Status", PaymentSchema);
