const express = require('express');
const router = express.Router();

// post - registers a user - private
router.post('/', (req, res) => {
	res.send('Registers a user.');
});

module.exports = router;
