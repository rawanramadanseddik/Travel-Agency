const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' }); // Load environment variables

// Models
const Trip = require('../models/Trip');
const Program = require('../models/Program');
const Accommodation = require('../models/Accommodation');
const Transportation = require('../models/Transportation');

// MongoDB URI
const dbURI = process.env.MONGO_CONNECTION_URI;
console.log('MongoDB URI:', dbURI); // Debug log

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1); // Exit process if connection fails
    }
};

// Data to Insert for Trips
const trips = [
    {
        name: 'Cairo Adventure',
        programId: null,
        accommodationId: null,
        transportationId: null,
        price: 500,
        date: '2024-12-20',
    },
    {
        name: 'Sharm El Sheikh Getaway',
        programId: null,
        accommodationId: null,
        transportationId: null,
        price: 400,
        date: '2024-12-22',
    },
];

// Insert Data
const insertTripsData = async () => {
    try {
        // Fetch related program, accommodation, and transportation for each trip
        const programs = await Program.find({});
        const accommodations = await Accommodation.find({});
        const transportations = await Transportation.find({});

        trips.forEach((trip, index) => {
            trip.programId = programs[index % programs.length]._id;
            trip.accommodationId = accommodations[index % accommodations.length]._id;
            trip.transportationId = transportations[index % transportations.length]._id;
        });

        // Insert trip data
        await Trip.insertMany(trips);

        console.log('Trip data inserted successfully!');
    } catch (error) {
        console.error('Error inserting trip data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Main Function
const main = async () => {
    await connectDB();
    await insertTripsData();
};

main();
