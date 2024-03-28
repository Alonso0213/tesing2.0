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
  personalityType1: {
    type: String,
    required: true,
  },
  personalityType2: {
    type: String,
    required: true,
  },
  personalityType3: {
    type: String,
    required: true,
  },
  personalityType4: {
    type: String,
    required: true,
  },
  enneagram: {
    type: String,
    required: true,
  },
  mainUserPersona: {
    type: String,
    required: true,
  },
  secondaryUserPersona: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", SchemaMain);
module.exports = User;
