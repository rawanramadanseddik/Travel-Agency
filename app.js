const express = require('express');
const dotenv = require('dotenv');
const locationRoutes = require('./routes/locationRoutes'); // Location routes
const usersRouter = require('./routes/usersRoutes'); // User routes
const singleServicesRoutes = require('./routes/singleServicesRoutes'); // Import single services routes
const initiateDBConnection = require('./config/db'); // Database connection
const publicTransportationRoutes = require('./routes/publicTransportationRoutes');
const { getWeather } = require('./services/weatherService');
const programRoutes = require('./routes/programRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const tripRoutes = require('./routes/tripRoutes'); // Trip routes
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

dotenv.config({
    path: './config/.env',
});

const app = express();
const PORT = process.env.PORT || 5000; // Default to port 3000 if not defined

// Middleware
app.use(express.json()); // Parse JSON requests

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
  
    try {
      const weatherData = await getWeather(city);
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Routes
app.use('/users', usersRouter); // User routes
app.use('/api/locations', locationRoutes); // Location routes
app.use('/api/singleservices', singleServicesRoutes);
app.use('/api/publictransportation', publicTransportationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/programs', programRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database connection error:', err));

// Start server
app.listen(PORT, async () => {
    console.log(Server has been started and is listening on port ${PORT});
});
module.exports = app;
