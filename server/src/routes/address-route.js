const express = require('express');
const router = express.Router();
const {
  upsertAddress,
  getAddress,
  deleteAddress
} = require('../controllers/address-controller');
const { authenticateToken } = require('../security/auth');

// All address routes require a valid JWT
router.post('/', authenticateToken, upsertAddress);
router.get('/', authenticateToken, getAddress);
router.delete('/', authenticateToken, deleteAddress);

module.exports = router;