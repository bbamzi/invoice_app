const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
exports.base = (req, res) => {
  res.status(200).render('base', {
    test: 'This is a placeholder',
    title: 'Base',
  });
};

exports.createNewTransaction = (req, res) => {
  res.status(200).render('index', {
    title: 'New Transaction',
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // get all user from coolection
  const users = await User.find();
  res.status(200).render('allusers', {
    title: 'All Users',
    users,
  });
});
