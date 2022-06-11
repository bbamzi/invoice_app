const Transaction = require('./../model/transactionModel');

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
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
      message: 'blah',
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
        transaction: newTransaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'err',
    });
  }
};
// To Update a Specific Transaction
exports.updateTransaction = (req, res) => {
  res.status(200).json({
    status: 'Success',
    message: 'Updated Successfully ',
  });
};
//  to delete a transaction
exports.deleteTransaction = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
