const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const transactionController = require('./../controllers/transactionController');
const transactionRouter = require('./../routes/transactionRoute');

const router = express.Router();

router.use('/:id/transactions', transactionRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.patch('/updateMe', authController.protect, userController.updateMe);
// router.delete('/deleteMe', authController.protect, userController.deleteMe);
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// router
//   .route('/:id/transactions')
//   .post(authController.protect, transactionController.addTransaction);

// router.route('/:id/transactions').get(userController.getAllUserTransactions);
// app.get('/users/:id/transactions').get(userController.getAllUserTransactions);

module.exports = router;
