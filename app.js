// ###########################################################     Modules      #######################################
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const transactionRouter = require('./routes/transactionRoute');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
  res.send(`<h1>inital page</>`);
});

app.use('/add-transaction', (req, res, next) => {
  res.send(`<form>inital page</form>`);
});

app.listen(3000);
