const crypto = require('crypto');
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
  role: {
    type: String,
    enum: ['user', 'admin', 'pro-user'],
    default: 'user',
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
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
  passwordResetToken: String,
  passwordResetExpires: Date,
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
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
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
