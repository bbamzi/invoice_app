const express = require('express');
const transactionController = require('./../controllers/transactionController');
const authController = require('./../controllers/authController');
const router = express.Router({ mergeParams: true });

// router.param("id", transactionController.checkID);

router
  .route('/')
  .get(authController.protect, transactionController.getAllTransactions)
  .post(authController.protect, transactionController.addTransaction);
router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    transactionController.deleteTransaction
  )
  .post(authController.protect, transactionController.addTransaction);
// router
// .route('/:id/transactions')
// .post(authController.protect, transactionController.addTransaction);
// router.get('/:id/add').get(transactionController.addTransaction);

module.exports = router;
