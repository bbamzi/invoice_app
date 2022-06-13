const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  dateJoined: { type: Date, default: Date.now },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Email is Required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Email is Required'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is Required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 5,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: function (el) {
      return el === this.password;
    },
    message: 'Passwords are not the same',
  },
  clientSignature: { type: String },
  logo: { type: String },
});
const User = mongoose.model('User', userSchema);

module.exports = User;
