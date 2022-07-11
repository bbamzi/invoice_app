// ###########################################################     Modules      #######################################
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const transactionRoute = require('./routes/transaction');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(transactionRoute);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});
app.listen(3000);
