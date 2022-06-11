const express = require('express');
const transactionController = require('./../controllers/transactionController');

const router = express.Router();

// router.param("id", transactionController.checkID);

router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.addTransaction);
router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
