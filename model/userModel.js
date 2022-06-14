const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  dateJoined: { type: Date, default: Date.now },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'input is Required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'input is Required'],
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
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: function (el) {
      return el === this.password;
    },
    message: 'Passwords are not the same',
  },
  region: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
  },
  clientSignature: { type: String },
  logo: {
    type: String,
  },
  passwordChangedAt: { type: Date },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
