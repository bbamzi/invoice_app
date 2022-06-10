const fs = require("fs");
const express = require("express");
const app = require("../app");

const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/transactions.json`)
);

exports.checkID = (req, res, next, id) => {
  if (req.params.id * 1 > transactions.length) {
    return res.status(400).json({
      Status: "Fail",
      Message: "Invalid ID",
    });
  }
  next();
};
exports.getAllTransactions = (req, res) => {
  res.status(200).json({
    status: "success",
    results: transactions.length,
    data: {
      transactions,
    },
  });
};
// To get single transacton from Database
exports.getTransaction = (req, res) => {
  const id = Number(req.params.id);
  const transaction = transactions.find((el) => el.id === id);
  if (!transaction) {
    return res.status(404).json({
      Status: "Fail",
      Message: "Invalid Id",
    });
  }
  res.status(200).json({
    Status: "success",
    transaction,
  });
};
// to addd transaction to databsda
exports.addTransaction = (req, res) => {
  const newId = transactions[transactions.length - 1].id + 1;
  const newTimestamp = Date.now();
  const newTransaction = Object.assign(
    { id: newId, timeStamp: newTimestamp },
    req.body
  );
  transactions.push(newTransaction);
  fs.writeFile(
    `${__dirname}/dev-data/data/transactions.json`,
    JSON.stringify(transactions),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          transactions: newTransaction,
        },
      });
    }
  );
};
// To Update a Specific Transaction
exports.updateTransaction = (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Updated Successfully ",
  });
};
//  to delete a transaction
exports.deleteTransaction = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
