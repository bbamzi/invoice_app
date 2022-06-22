const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

// base
router.get('/', viewsController.base);

// index
router.get('/index', viewsController.createNewTransaction);

router.get('/allUsers', viewsController.getAllUsers);

module.exports = router;
