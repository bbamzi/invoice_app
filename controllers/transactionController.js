const Transaction = require('./../model/transactionModel');

exports.getAllTransactions = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: transactions.length,
  //   data: {
  //     transactions,
  //   },
  // });
};
// To get single transacton from Database
exports.getTransaction = (req, res) => {
  const id = Number(req.params.id);
  // const transaction = transactions.find((el) => el.id === id);
  // if (!transaction) {
  //   return res.status(404).json({
  //     Status: 'Fail',
  //     Message: 'Invalid Id',
  //   });
  // }
  // res.status(200).json({
  //   Status: 'success',
  //   transaction,
  // });
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
      message: err,
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
