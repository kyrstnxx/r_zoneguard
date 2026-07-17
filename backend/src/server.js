const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
	res.json({
		status: 'ok',
		service: 'zoneguard-backend',
		uptime: process.uptime(),
	});
});

app.get('/', (req, res) => {
	res.json({ message: 'ZoneGuard backend is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`ZoneGuard backend listening on http://localhost:${PORT}`);
});

