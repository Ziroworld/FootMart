// server/src/routes/address-route.js
const express = require('express');
const router = express.Router();
const {
  upsertAddress,
  getAddress,
  deleteAddress
} = require('../controllers/address-controller');

// Create or update (upsert) the user's address (24h edit window enforced in controller)
router.post('/', upsertAddress);

// Fetch the current user's address
router.get('/', getAddress);

// Delete the current user's address
router.delete('/', deleteAddress);

module.exports = router;
