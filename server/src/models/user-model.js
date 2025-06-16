const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],   // extend as needed
      default: 'customer',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
