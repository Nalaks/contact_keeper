const express = require('express');
const router = express.Router();

// get - get logged in user - private
router.get('/', (req, res) => {
	res.send('Get logged in user');
});

// post - auth user and get token - public
router.post('/', (req, res) => {
	res.send('log in user');
});

module.exports = router;
