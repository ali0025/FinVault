const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Ensure JWT_SECRET is set in .env

class AuthController {
  async register(req, res) {
    const { firstName, lastName, email, phone, password } = req.body;
    try {
      if (!firstName || !lastName || !email || !phone || !password) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already registered',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
     
        
      });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        userId: user._id,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'User cannot be registered, please try again later',
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not registered, please sign up',
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: 'Password is incorrect',
        });
      }

      const payload = {
        email: existingUser.email,
        id: existingUser._id,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

      existingUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res
        .cookie('token', token, options)
        .status(200)
        .json({
          success: true,
          token,
         user: existingUser,
          message: 'Logged in successfully',
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'Unable to login',
      });
    }
  }
}

module.exports = new AuthController();
