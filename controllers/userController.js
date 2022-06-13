const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});
// To get single transacton from Database
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};
// to addd transaction to databsda
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};
// To Update a Specific Transaction
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};
//  to delete a transaction
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};
