// ###########################################################     Modules      #######################################
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const transactionRouter = require('./routes/transactionRoute');
const userRouter = require('./routes/userRoutes');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const viewRouter = require('./routes/viewRoutes');
// #######################################################      MiddleWares      ##################################################

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// set security http
// app.use(helmet());

//  development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limiting api requesy
const limiter = rateLimit({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many Request From This IP, Please Try Again In An Hour',
});
app.use('/api', limiter);

// reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// data sanitization against nosql query injection
app.use(mongoSanitize());
// data sanitization agains xxs aTTACK
app.use(xss());
// serving stativ files

app.use('/', viewRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl.slice(1)} on this server`, 404)
  );
});

app.use(globalErrorHandler);
module.exports = app;
