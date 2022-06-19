const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { populate } = require('./../model/userModel');
const factory = require('./handlerFactory');
// require('../model/transactionModel');
// require('../model/userModel');
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// exports.getTransaction = catchAsync(async (req,res,next)=> {
//   const
// })
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
// To get single user from Database
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('transaction');
  if (!user) {
    return next(new AppError(`No User with that ID found`, 404));
  }
  res.status(200).json({
    Status: 'success',
    data: {
      user,
    },
  });
});
// to addd transaction to databsda
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      newUser,
    },
  });
});
exports.getAllUserTransactions = catchAsync(async (req, res, next) => {
  const user = await User.find({ id: req.params.id }).populate({
    path: 'transactions',
  });

  // const user = await User.find({ : req.params._id });

  res.status(201).json({
    status: 'Success',
    data: {
      user,
    },
  });
});
// 62ab181cbc7062bb9c427100

// To Update a Specific Transaction
exports.updateUser = factory.updateOne(User);
//  to delete a transaction
exports.deleteUser = factory.deleteOne(User);
// exports.deleteTransaction = factory.deleteOne(Transaction);

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create Error if user post password dat
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        `This route is not for password update ,please use updateMyPassword`,
        400
      )
    );
  }
  // Update user document
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'email',
    'lastName',
    'transactions'
  );
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
