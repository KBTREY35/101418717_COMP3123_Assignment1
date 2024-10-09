const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the COMP3123 Assignment 1 API');
});

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
