const express = require('express');
const dotenv = require('dotenv');
const locationRoutes = require('./routes/locationRoutes'); // Location routes
const usersRouter = require('./routes/usersRoutes'); // User routes
const singleServicesRoutes = require('./routes/singleServicesRoutes'); // Import single services routes
const initiateDBConnection = require('./config/db'); // Database connection
const publicTransportationRoutes = require('./routes/publicTransportationRoutes');

dotenv.config({
    path: './config/.env',
});

const app = express();
const PORT = process.env.PORT || 5000; // Default to port 3000 if not defined

// Middleware
app.use(express.json()); // Parse JSON requests

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
