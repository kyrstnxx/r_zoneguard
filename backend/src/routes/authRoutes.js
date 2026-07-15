const express = require('express');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  res.status(501).json({
    message: 'Auth register scaffold - database-backed implementation not added yet',
  });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  res.status(501).json({
    message: 'Auth login scaffold - database-backed implementation not added yet',
  });
});

module.exports = router;
