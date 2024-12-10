const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const ExtraFacility = require('../Models/extraFacilityModel'); // Assuming this is the correct path to your model
const ExtraFacility = require('../Models/extraFacilityModel');

dotenv.config({
    path: './config/.env', // Adjust this path if needed
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Database connection error:', err));

// Data to insert
const extraFacilitiesData = [
    {
        programId: "6756d84ad0ca2da76628183c", // Replace with a valid programId
        name: "Diving",
        description: "Explore underwater attractions.",
        price: 50,
    },
    {
        programId: "6756d9d7f9047339783441f4", // Replace with a valid programId
        name: "Private Beach Access",
        description: "Exclusive access to a private beach.",
        price: 100,
    },
    {
        programId: "6756d9d7f9047339783441f4", // Replace with another valid programId
        name: "City Tour",
        description: "Guided city tour with a professional guide.",
        price: 75,
    },
];

// Insert function
const insertExtraFacilities = async () => {
    try {
        await ExtraFacility.insertMany(extraFacilitiesData);
        console.log('Extra facilities data inserted successfully!');
    } catch (error) {
        console.error('Error inserting extra facilities data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the function
insertExtraFacilities();
