const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);

module.exports = router;