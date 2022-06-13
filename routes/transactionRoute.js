const express = require('express');
const transactionController = require('./../controllers/transactionController');
const authController = require('./../controllers/authController');
const router = express.Router();

// router.param("id", transactionController.checkID);

router
  .route('/')
  .get(authController.protect, transactionController.getAllTransactions)
  .post(transactionController.addTransaction);
router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
