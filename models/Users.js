const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const your_class = new Schema({
  subject: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available_classes: {
    type: [your_class],
    default: null,
  },
  taken_classes: {
    type: [your_class],
    default: null,
  },
  requested_classes: {
    type: [your_class],
    default: null,
  },
});
module.exports = User = mongoose.model("users", UserSchema);
