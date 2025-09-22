const express = require('express');
const authController = require('../controllers/AuthController');
const accountController = require('../controllers/AccountController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/accounts', verifyToken, accountController.createAccount);
router.get('/accounts/:id', verifyToken, accountController.getAccount);
router.post('/accounts/:id/deposit', verifyToken, accountController.deposit);
router.post('/accounts/:id/withdraw', verifyToken, accountController.withdraw);

module.exports = router;
