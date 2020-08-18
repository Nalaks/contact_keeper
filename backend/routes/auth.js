const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/authToken');

// post - auth user and get token - public
router.post(
	'/',
	[
		check('email', 'Please include a valid email.').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		// error checking
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// finds user
			let user = await User.findOne({ email });

			// if a user exists send responds
			if (!user) {
				return res.status(400).json({ msg: 'Invalid credentials.' });
			}

			// if password is wrong send responds
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid credentials.' });
			}

			// issues payload for jwt
			const payload = {
				user: {
					id: user.id,
				},
			};

			// signs jwt token
			jwt.sign(
				payload,
				config.jwtSecret,
				{ expiresIn: 3600000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error. Please try again.');
		}
	}
);

// get - get logged in user - private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error. Please try again.');
	}
});

module.exports = router;
