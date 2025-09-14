const mongoose = require('mongoose');
const Account = require('../models/account');
const { v4: uuidv4 } = require('uuid');

class AccountController {
  async createAccount(req, res) {
    try {
      const { initialBalance = 0, } = req.body;
      const userId = req.user.id;

      if (initialBalance < 100) {
        return res.status(400).json({
          success: false,
          message: 'Initial balance must be 100',
        });
      }

     
      const account = new Account({ userId, balance: initialBalance });
      await account.save();

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        account: { accountId: account._id, balance: account.balance },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Account creation failed',
      });
    }
  }

  async getAccount(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const account = await Account.findOne({ _id: id, userId }).select('-__v');
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found or not authorized',
        });
      }

      res.json({
        success: true,
        account,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve account',
      });
    }
  }

  async deposit(req, res) {
    try {
      const { id } = req.params;
      const { amount } = req.body;
      const userId = req.user.id;

      const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0 || !Number.isFinite(numericAmount)) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
    }

     const account = await Account.findOneAndUpdate(
  { _id: id, userId },
  { $inc: { balance: amount } },
  { new: true } 
);

if (!account) {
  return res.status(404).json({
    success: false,
    message: 'Account not found or not authorized',
  });
}

      res.json({
        success: true,
        message: 'Deposit successful',
        newBalance: account.balance,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Deposit failed',
      });
    }
  }

  async withdraw(req, res) {
    try {
      const { id } = req.params;
      const { amount } = req.body;
      const userId = req.user.id;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be positive',
        });
      }

      const account = await Account.findOne({ _id: id, userId });
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Account not found or not authorized',
        });
      }

      if (account.balance < amount) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient balance',
        });
      }

      account.balance -= amount;
      await account.save();

      res.json({
        success: true,
        message: 'Withdrawal successful',
        newBalance: account.balance,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Withdrawal failed',
      });
    }
  }
}

module.exports = new AccountController();