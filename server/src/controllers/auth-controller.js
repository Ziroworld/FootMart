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
  console.log('[Auth] getFinalRole called with role:', role);
  if (role === "admin") {
    if (!adminSecret || adminSecret !== ADMIN_REG_SECRET) {
      console.warn('[Auth] Invalid admin secret provided');
      return { error: "Invalid admin secret." };
    }
    console.log('[Auth] Admin registration validated');
    return { role: "admin" };
  } else if (role === "customer") {
    console.log('[Auth] Customer role selected');
    return { role: "customer" };
  }
  console.log('[Auth] Default role applied:', DEFAULT_ROLE);
  return { role: DEFAULT_ROLE };
}

const register = async (req, res) => {
  console.log('[Auth] Register endpoint hit');
  try {
    const { email, password, role = DEFAULT_ROLE } = req.body;
    const adminSecret = req.headers["x-admin-secret"];   // or req.body.adminSecret
    console.log('[Auth] Registration data:', { email, role });

    /* 1. basic validation */
    if (!email || !password) {
      console.error('[Auth] Missing email or password');
      return res.status(400).json({ message: "Email and password are required." });
    }

    /* 2. prevent duplicate e-mail */
    if (await User.findOne({ email })) {
      console.warn('[Auth] Email already in use:', email);
      return res.status(409).json({ message: "Email already in use." });
    }

    /* 3. ROLE GATE */
    const roleResult = getFinalRole(role, adminSecret);
    if (roleResult.error) {
      console.error('[Auth] Role gate error:', roleResult.error);
      return res.status(403).json({ message: roleResult.error });
    }
    const finalRole = roleResult.role;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[Auth] Password hashed');

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: finalRole,
    });
    console.log('[Auth] New user created:', newUser._id);

    const token = generateToken(newUser);
    console.log('[Auth] Token generated for user:', newUser._id);

    return res.status(201).json({
      message: "User registered successfully.",
      role:    newUser.role,
      user:    { id: newUser._id, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (err) {
    console.error("[Auth] Register error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//------------------------LOGIN------------------------//
const login = async (req, res) => {
  console.log('[Auth] Login endpoint hit');
  try {
    const { email, password } = req.body;
    console.log('[Auth] Login attempt for email:', email);

    if (!email || !password) {
      console.error('[Auth] Missing email or password on login');
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.warn('[Auth] User not found for email:', email);
      return res.status(404).json({ message: 'Invalid credentials.' });
    }
    console.log('[Auth] User found:', user._id);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn('[Auth] Password mismatch for user:', user._id);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(user);
    console.log('[Auth] Login successful, token issued for user:', user._id);

    return res.status(200).json({
      message: 'Login successful.',
      user: { id: user._id, email: user.email, role: user.role },
      role: user.role,
      token,
    });
  } catch (err) {
    console.error('[Auth] Login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//------------------------OTP------------------------//
const requestOtp = async (req, res) => {
  console.log('[Auth] requestOtp endpoint hit');
  try {
    const { email } = req.body;
    console.log('[Auth] Generating OTP for email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.warn('[Auth] OTP request for non-existent email:', email);
      return res.status(404).json({ message: 'Email not found' });
    }

    // generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });
    console.log('[Auth] OTP stored for', email, otp);

    // send e-mail (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'FootMart password reset OTP',
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });
    console.log('[Auth] OTP email sent to:', email);

    return res.status(200).json({ message: 'OTP sent to your e-mail.' });
  } catch (err) {
    console.error('[Auth] requestOtp error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//------------------------VERIFY OTP------------------------//
const verifyOtp = async (req, res) => {
  console.log('[Auth] verifyOtp endpoint hit');
  try {
    const { email, otp } = req.body;
    console.log('[Auth] Verifying OTP', otp, 'for email:', email);

    const stored = otpStore.get(email);
    if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
      console.warn('[Auth] Invalid or expired OTP for', email);
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    console.log('[Auth] OTP verified for', email);
    return res.status(200).json({ message: 'OTP verified' });
  } catch (err) {
    console.error('[Auth] verifyOtp error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//------------------------RESET PASSWORD------------------------//
const resetPassword = async (req, res) => {
  console.log('[Auth] resetPassword endpoint hit');
  try {
    const { email, otp, newPassword } = req.body;
    console.log('[Auth] Resetting password for', email);

    // re-check OTP
    const stored = otpStore.get(email);
    if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
      console.warn('[Auth] Invalid or expired OTP on reset for', email);
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.error('[Auth] User not found during reset for', email);
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    otpStore.delete(email);
    console.log('[Auth] Password reset successful for', email);

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('[Auth] resetPassword error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

//------------------------GET CURRENT USER------------------------//
const getCurrentUser = async (req, res) => {
  console.log('[Auth] getCurrentUser endpoint hit for user id:', req.user.id);
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.warn('[Auth] getCurrentUser: User not found:', req.user.id);
      return res.status(404).json({ message: 'User not found.' });
    }
    console.log('[Auth] getCurrentUser success:', user._id);
    return res.status(200).json({ user });
  } catch (err) {
    console.error('[Auth] getCurrentUser error:', err);
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
