const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		next();
	} else {
		res.status(401).json({ message: 'Please send a token' });
	}
}