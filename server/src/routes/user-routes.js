const express = require('express');
const router = express.Router();
const {
  register,
  login,
  requestOtp,
  verifyOtp,
  resetPassword,
  getCurrentUser,
} = require('../controllers/auth-controller');
const { authenticateToken } = require('../security/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;