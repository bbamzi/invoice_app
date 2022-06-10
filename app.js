// ###########################################################     Modules      #######################################

const express = require("express");
const morgan = require("morgan");

// #######################################################      MiddleWares      ##################################################
const app = express();
app.use(morgan("dev"));
app.use(express.json());

const transactionRouter = require("./routes/transactionRoute");
const userRouter = require("./routes/userRoutes");

app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
