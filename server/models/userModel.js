const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verify: {
    type: Boolean,
    default: false,
    required: true,
  },
  verifyOTP: {
    type: Number,
    require: true,
  },
  otpExpiration: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
