const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../config/default.json');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// post - registers a user - private
router.post(
	'/',
	[
		check('name', 'Please add a name.').not().isEmpty(),
		check('email', 'Please include a valid Email.').isEmail(),
		check(
			'password',
			'Please enter a password with at least 6 characters.'
		).isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		// error checking
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// extracts data from body
		const { name, email, password } = req.body;

		try {
			// finds user
			let user = await User.findOne({ email });

			// if a user exists send responds
			if (user) {
				return res.status(400).json({ msg: 'User already exists.' });
			}

			// creates new user
			user = new User({ name, email, password });

			// salting and hashing password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// saves user to db
			await user.save();

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

module.exports = router;
