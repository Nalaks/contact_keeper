const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

module.exports = (req, res, next) => {
	// get token from header
	const token = req.header('x-auth-token');
	if (!token) {
		res.status(401).json({ msg: 'No token, authorization denied.' });
	}

	try {
		const decodedToken = jwt.verify(token, config.jwtSecret);

		req.user = decodedToken.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'token is not valid' });
	}
};
