const mongoose = require("mongoose");

const SchemaMain = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", SchemaMain);
module.exports = User;
