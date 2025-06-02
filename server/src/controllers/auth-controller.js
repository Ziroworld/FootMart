require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user-model.js');
const { generateToken } = require('../security/auth.js');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1) Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2) Ensure email is unique
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    // 3) Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4) Create and save user
    const newUser = new User({
      email,
      password: hashedPassword
    });
    await newUser.save();

    // 5) Generate JWT
    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'User registered successfully.',
      user: { id: newUser._id, email: newUser.email },
      token
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2) Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials.' });
    }

    // 3) Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 4) Generate JWT
    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful.',
      user: { id: user._id, email: user.email },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error('getCurrentUser error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser
};
