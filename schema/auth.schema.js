const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
