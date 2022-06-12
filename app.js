// ###########################################################     Modules      #######################################

const express = require('express');
const morgan = require('morgan');

// #######################################################      MiddleWares      ##################################################

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const transactionRouter = require('./routes/transactionRoute');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl.slice(1)} on this server`,
  });
});

const test = 'hi';
module.exports = app;
