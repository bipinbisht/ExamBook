const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: {
        expires: 300,
      }, //after 5 min it deleted automatically
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Otp", OtpSchema);
