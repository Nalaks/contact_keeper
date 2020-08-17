const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Thunderdome!' }));

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
