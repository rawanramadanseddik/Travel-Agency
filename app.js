/*const express = require('express');
const dotenv = require('dotenv');
const locationRoutes = require('./routes/locationRoutes'); // Location routes
const usersRouter = require('./routes/usersRoutes'); // User routes
const tripRoutes = require('./routes/tripRoutes'); // Trip routes
const initiateDBConnection = require('./config/db'); // Database connection
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

dotenv.config({
    path: './config/.env',
});

const app = express();
const PORT = process.env.PORT || 5000; // Default to port 5000 if not defined

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/users', usersRouter); // User routes
app.use('/api/locations', locationRoutes); // Location routes
app.use('/api/trips', tripRoutes); // Trip routes

// MongoDB connection
mongoose.connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database connection error:', err));

// Start server
app.listen(PORT, async () => {
    console.log(`Server has been started and is listening on port ${PORT}`);
    await initiateDBConnection();
});

module.exports = app;*/


const express = require('express');
const dotenv = require('dotenv');
const locationRoutes = require('./routes/locationRoutes'); // Location routes
const usersRouter = require('./routes/usersRoutes'); // User routes
const tripRoutes = require('./routes/tripRoutes'); // Trip routes
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

dotenv.config({
    path: './config/.env',
});

const app = express();
const PORT = process.env.PORT || 5000; // Default to port 5000 if not defined

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/users', usersRouter); // User routes
app.use('/api/locations', locationRoutes); // Location routes
app.use('/api/trips', tripRoutes); // Trip routes

// MongoDB connection
mongoose.connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database connection error:', err));

// Start server
app.listen(PORT, async () => {
    console.log(`Server has been started and is listening on port ${PORT}`);
});

module.exports = app;

