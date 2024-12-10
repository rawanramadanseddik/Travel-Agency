// Import necessary modules
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import models
const CustomizableProgram = require('../models/CustomizableProgram'); // Adjust path if necessary
const Accommodation = require('../models/Accommodation'); // Adjust path if necessary
const Transportation = require('../models/Transportation'); // Adjust path if necessary

// Load environment variables
dotenv.config({ path: '../config/.env' }); // Adjust path to .env file if necessary

// MongoDB connection
mongoose.connect(process.env.MONGO_CONNECTION_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Database connection error:', err));

// Insert Customizable Program data
const insertCustomizablePrograms = async () => {
    const programs = [
        {
            location: 'Cairo',
            name: 'Historical Adventure',
            duration: '3 days',
            activities: ['Pyramids tour', 'Museum visit', 'Nile River cruise'],
            price: 500,
        },
        {
            location: 'Paris',
            name: 'Romantic Getaway',
            duration: '5 days',
            activities: ['Eiffel Tower visit', 'Louvre Museum tour', 'Seine River dinner cruise'],
            price: 1000,
        }
    ];

    try {
        const insertedPrograms = await CustomizableProgram.insertMany(programs);
        console.log('Customizable programs inserted!');
        return insertedPrograms; // Return inserted programs with their IDs
    } catch (err) {
        console.log('Error inserting customizable programs:', err);
        return [];
    }
};

// Insert Accommodation data
const insertAccommodations = async (programs) => {
    const accommodations = [
        {
            programId: programs.find(p => p.name === 'Historical Adventure')?._id, // Use valid ID
            hotelName: 'Pyramids View Hotel',
            roomType: 'Deluxe Room',
            wifi: true,
            meals: ['Breakfast', 'Lunch', 'Dinner'],
            pricePerNight: 100,
        },
        {
            programId: programs.find(p => p.name === 'Romantic Getaway')?._id, // Use valid ID
            hotelName: 'Eiffel Suite Hotel',
            roomType: 'Luxury Suite',
            wifi: true,
            meals: ['Breakfast'],
            pricePerNight: 200,
        }
    ];

    try {
        await Accommodation.insertMany(accommodations);
        console.log('Accommodations inserted!');
    } catch (err) {
        console.log('Error inserting accommodations:', err);
    }
};

// Insert Transportation data
const insertTransportation = async (programs) => {
    const transportation = [
        {
            programId: programs.find(p => p.name === 'Historical Adventure')?._id, // Use valid ID
            type: 'Private Car',
            price: 50,
            details: 'Luxury SUV with AC, driver included',
        },
        {
            programId: programs.find(p => p.name === 'Romantic Getaway')?._id, // Use valid ID
            type: 'Flight',
            price: 300,
            details: 'Round-trip flight from New York to Paris',
        }
    ];

    try {
        await Transportation.insertMany(transportation);
        console.log('Transportation inserted!');
    } catch (err) {
        console.log('Error inserting transportation:', err);
    }
};

// Run all insert functions
const insertData = async () => {
    const programs = await insertCustomizablePrograms(); // Fetch inserted programs
    await insertAccommodations(programs); // Pass programs to insertAccommodations
    await insertTransportation(programs); // Pass programs to insertTransportation
};

// Call the insert function
insertData()
    .then(() => {
        console.log('Data insertion complete!');
        mongoose.connection.close(); // Close the connection once data is inserted
    })
    .catch((err) => console.log('Error during data insertion:', err));
