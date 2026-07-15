const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	const authHeader = req.headers.authorization || req.headers.Authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Missing or invalid Authorization header' });
	}

	const token = authHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'zoneguard-dev-secret');
		req.user = decoded;
		return next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
}

function requireRole(allowedRoles) {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({ message: 'Missing authentication' });
		}

		if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
			return res.status(500).json({ message: 'Server role configuration error' });
		}

		if (!allowedRoles.includes(req.user.system_role)) {
			return res.status(403).json({ message: 'Forbidden' });
		}

		return next();
	};
}

module.exports = {
	verifyToken,
	requireRole,
};
