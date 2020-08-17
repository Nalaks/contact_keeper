const express = require('express');
const router = express.Router();

// get - get all user contacts - private
router.get('/', (req, res) => {
	res.send('Get all contacts');
});

// post - add new contact - private
router.post('/', (req, res) => {
	res.send('add new contact');
});

// put - update user contact - private
router.put('/:id', (req, res) => {
	res.send('update contact');
});

// delete - delete contact - private
router.delete('/:id', (req, res) => {
	res.send('delete contact');
});

module.exports = router;
