const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// connect database
connectDB();

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Thunderdome!' }));

// app routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// port listen
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
