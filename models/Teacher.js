const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TeacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    birthDate: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    userName: {
      type: String,
      minlength: 3,
    },
    education: {
      type: String,
    },
    mobileNumber: {
      type: String,
      maxlength: 10,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "Teacher", versionKey: false }
);
//hashing password
TeacherSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

TeacherSchema.methods.comparePassword = async function (teacherPassword) {
  const isMatch = await bcrypt.compare(teacherPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Teacher", TeacherSchema);
