const express = require('express');
const router = express.Router();
const axios = require('axios');

// Put API key in .env for real apps, for now hardcoded
const API_KEY = '6429547c57f843be8464cfc2db58b455';

router.get('/standings', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.football-data.org/v4/competitions/PL/standings',
      {
        headers: { 'X-Auth-Token': API_KEY }
      }
    );
    res.json(response.data);
  } catch (error) {
    // Add detailed error log
    console.error("Failed to fetch standings", error.message);
    res.status(500).json({ error: 'Could not fetch Premier League standings.' });
  }
});

module.exports = router;
