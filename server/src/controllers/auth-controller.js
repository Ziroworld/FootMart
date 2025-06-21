require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user-model.js');   // ← your FootMart user model
const { generateToken } = require('../security/auth.js');

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) throw new Error('SECRET_KEY is not defined.');

const ADMIN_REG_SECRET = process.env.ADMIN_REG_SECRET;   // <- new
if (!ADMIN_REG_SECRET) throw new Error('ADMIN_REG_SECRET is not defined.');

const otpStore = new Map();   // { email: { otp, expiresAt } }

const DEFAULT_ROLE     = "customer";

function getFinalRole(role, adminSecret) {
  if (role === "admin") {
    if (!adminSecret || adminSecret !== ADMIN_REG_SECRET) {
      return { error: "Invalid admin secret." };
    }
    return { role: "admin" };
  } else if (role === "customer") {
    return { role: "customer" };
  }
  return { role: DEFAULT_ROLE };
}

const register = async (req, res) => {
  try {
    const { email, password, role = DEFAULT_ROLE } = req.body;
    const adminSecret = req.headers["x-admin-secret"];   // or req.body.adminSecret

    /* 1. basic validation */
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    /* 2. prevent duplicate e-mail */
    if (await User.findOne({ email }))
      return res.status(409).json({ message: "Email already in use." });

    /* 3. ROLE GATE  ------------------------------------------------------- */
    const roleResult = getFinalRole(role, adminSecret);
    if (roleResult.error) {
      return res.status(403).json({ message: roleResult.error });
    }
    const finalRole = roleResult.role;
    /* -------------------------------------------------------------------- */

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: finalRole,
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      message: "User registered successfully.",
      role:    newUser.role,           // top-level role for convenience
      user:    { id: newUser._id, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//------------------------LOGIN------------------------//
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful.',
      user: { id: user._id, email: user.email, role: user.role },
      role: user.role, 
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//------------------------OTP------------------------//
const requestOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 min​ expiry[1]

    // send e-mail (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,          // Gmail address
        pass: process.env.EMAIL_PASSWORD, // Gmail app-password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'FootMart password reset OTP',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

    return res.status(200).json({ message: 'OTP sent to your e-mail.' });
  } catch (err) {
    console.error('requestOtp error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//------------------------VERIFY OTP------------------------//
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const stored = otpStore.get(email);
    if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    return res.status(200).json({ message: 'OTP verified' });
  } catch (err) {
    console.error('verifyOtp error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


//------------------------RESET PASSWORD------------------------//
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // re-check OTP
    const stored = otpStore.get(email);
    if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    otpStore.delete(email);              // one-time use[1]
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('resetPassword error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


//------------------------GET CURRENT USER------------------------//
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
  requestOtp,
  verifyOtp,
  resetPassword,
  getCurrentUser,
};
