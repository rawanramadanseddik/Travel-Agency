const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' }); // Load environment variables




// Models
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

// Data to Insert
const programs = [
    { name: 'Cultural Tour', location: 'Cairo', activities: ['Museum visit', 'Pyramids tour'], description: 'Experience the rich culture of Cairo' },
    { name: 'Beach Vacation', location: 'Sharm El Sheikh', activities: ['Snorkeling', 'Beach relaxation'], description: 'Relax on the Red Sea coast' },
];

const accommodations = [
    { name: 'Luxury Hotel', programId: null },
    { name: 'Budget Hotel', programId: null },
];

const transportations = [
    { type: 'Flight', programId: null },
    { type: 'Bus', programId: null },
];

// Insert Data
const insertData = async () => {
    try {
        await Program.deleteMany({});
        await Accommodation.deleteMany({});
        await Transportation.deleteMany({});

        const insertedPrograms = await Program.insertMany(programs);

        accommodations.forEach((accommodation, index) => {
            accommodation.programId = insertedPrograms[index % insertedPrograms.length]._id;
        });

        transportations.forEach((transportation, index) => {
            transportation.programId = insertedPrograms[index % insertedPrograms.length]._id;
        });

        await Accommodation.insertMany(accommodations);
        await Transportation.insertMany(transportations);

        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Main Function
const main = async () => {
    await connectDB();
    await insertData();
};

main();
