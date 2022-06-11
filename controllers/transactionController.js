const Transaction = require('./../model/transactionModel');

exports.getAllTransactions = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    const query = Transaction.find(queryObj);
    const transactions = await query;

    // console.log(req.query);
    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: {
        transactions,
      },
    });
  } catch {
    res.status(404).json({
      status: 'fail',
    });
  }
};
// To get single transacton from Database
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json({
      Status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      Status: 'fail',
      message: err,
    });
  }
};

// to add transaction to databsda
exports.addTransaction = async (req, res) => {
  const newTransaction = await Transaction.create(req.body);
  try {
    res.status(201).json({
      status: 'Success',
      data: {
        newTransaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      Status: 'fail',
      message: err,
    });
  }
};
// To Update a Specific Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'Success',
      message: 'Updated Successfully ',
      data: { transaction },
    });
  } catch (err) {
    res.status(400).json({
      Status: 'fail',
      message: err,
    });
  }
};
//  to delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      Status: 'fail',
      message: err,
    });
  }
};
