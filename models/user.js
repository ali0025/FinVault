const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
       unique: true,
    lowercase: true,
    trim: true,
   
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      'Please provide a valid email address'
    ]

  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phone: {
  type: String,
  required: [true, 'Phone number is required'],
  trim: true,
  validate: {
    validator: function (phone) {
      return /^\+?\d{10,15}$/.test(phone); 
    },
    message: 'Please provide a valid phone number (10-15 digits)',
  },
},

});

module.exports = mongoose.model("User", userSchema);