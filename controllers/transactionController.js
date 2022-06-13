const Transaction = require('./../model/transactionModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  const query = Transaction.find(queryObj);
  const transactions = await query;
  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: {
      transactions,
    },
  });
});
// To get single transacton from Database
exports.getTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    return next(new AppError(`No Transaction with that ID found`, 404));
  }
  res.status(200).json({
    Status: 'success',
    data: {
      transaction,
    },
  });
});

// to add transaction to databsda
exports.addTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      newTransaction,
    },
  });
});
// To Update a Specific Transaction
exports.updateTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!transaction) {
    return next(new AppError(`No Transaction with that ID found`, 404));
  }
  res.status(200).json({
    status: 'Success',
    message: 'Updated Successfully ',
    data: { transaction },
  });
});
//  to delete a transaction
exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findByIdAndDelete(req.params.id);
  if (!transaction) {
    return next(new AppError(`No Transaction with that ID found`, 404));
  }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
});
