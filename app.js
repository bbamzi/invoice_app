const fs = require("fs");
const express = require("express");
const res = require("express/lib/response");
const app = express();

app.use(express.json());

const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/transactions.json`)
);

// For All Transactions in Database
app.get("/api/v1/transactions", (req, res) => {
  res.status(200).json({
    status: "success",
    results: transactions.length,
    data: {
      transactions,
    },
  });
});

// To add new Transaction to Database
app.post("/api/v1/transactions", (req, res) => {
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
});

// To get single transacton from Database
app.get("/api/v1/transactions/:id", (req, res) => {
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
});

// To Update a Specific Transaction
app.patch("/api/v1/transactions/:id", (req, res) => {
  id = Number(req.params.id);
  if (id > transactions.length) {
    return res.status(400).json({
      Status: "Fail",
      Message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "Success",
    message: "Updated Successfully ",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
