const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { collection: "admin", versionKey: false }
);

module.exports = mongoose.model("Admin", AdminSchema);
