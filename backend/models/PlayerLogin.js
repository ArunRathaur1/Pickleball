const mongoose = require("mongoose");

const playerLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  DUPRID: {
    type: String,
    required: true,
    trim: true,
    // optional validation rule:
    // match: [/^[A-Z0-9]{6,12}$/, "DUPRID must be a combination of letters and numbers (6-12 characters)."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PlayerLogin", playerLoginSchema);
