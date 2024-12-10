const express = require('express');
const dotenv = require('dotenv');
const locationRoutes = require('./routes/locationRoutes'); // Location routes
const usersRouter = require('./routes/usersRoutes'); // User routes
const singleServicesRoutes = require('./routes/singleServicesRoutes'); // Import single services routes
const initiateDBConnection = require('./config/db'); // Database connection
const publicTransportationRoutes = require('./routes/publicTransportationRoutes');
const { getWeather } = require('./services/weatherService');

dotenv.config({
    path: './config/.env',
});

const app = express();
const PORT = process.env.PORT || 5000; // Default to port 3000 if not defined
const cors = require('cors');

// Allow requests from the frontend's domain (replace 'http://localhost:3000' with your actual frontend URL)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE', // Allow necessary HTTP methods
    credentials: true
}));

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

// Start server and initialize DB
app.listen(PORT, async () => {
    console.log(`Server has been started and is listening on port ${PORT}`);
    await initiateDBConnection();
});
