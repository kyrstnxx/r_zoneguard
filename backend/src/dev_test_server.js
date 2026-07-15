const express = require('express');
const bodyParser = require('express').json;
const dotenv = require('dotenv');

dotenv.config();

let authController;
const { verifyToken, requireRole } = require('./middleware/authMiddleware');

const app = express();
app.use(bodyParser());

app.post('/auth/login', async (req, res) => {
  try {
    if (!authController) authController = require('./controllers/authController');
    return authController.login(req, res);
  } catch (err) {
    console.error('Failed to load authController:', err.message || err);
    return res.status(500).json({ message: 'Authentication not available (DB client error)' });
  }
});

app.get('/admin-only', verifyToken, requireRole(['ADMIN']), (req, res) => {
  res.json({ message: `Hello ${req.user.user_id}, you are an ADMIN` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Dev test server running on http://localhost:${PORT}`));
