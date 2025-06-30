const express = require('express');
const router = express.Router();
const {
  upsertAddress,
  getAddress,
  deleteAddress
} = require('../controllers/address-controller');

// All address routes require a valid JWT
router.post('/', upsertAddress);
router.get('/', getAddress);
router.delete('/',  deleteAddress);

module.exports = router;