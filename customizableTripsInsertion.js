const mongoose = require('mongoose');
require('dotenv').config({ path: './config/.env' }); // Load environment variables
const CustomizableTrip = require('./models/CustomizableTrip'); // Import CustomizableTrip model

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected for inserting customizable trips');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Example array of customizable trips
const CustomizableTripsData = [

    
    {
        userId: "674e1d61307827486f89df78",
        location: "Luxor",
        accommodation: "cruise",
        transportation: "plane",
        startDate: new Date("2023/01/19"),
        endDate: new Date("2023/01/25"),
    },
    {
        userId: "674e1d61307827486f89df78",
        location: "Giza",
        accommodation: "tulip",
        transportation: "bus",
        startDate: new Date("2023/10/15"),
        endDate: new Date("2023/11/15"),
    },
    {
        userId: "6750184a65e1c2d4759529b1",
        location: "Cairo",
        accommodation: "Resort",
        transportation: "bus",
        startDate: new Date("2024/10/15"),
        endDate: new Date("2024/11/15"),
    },
    {
        userId: "674e1d61307827486f89df7a",
        location: "Sharm",
        accommodation: "tulip",
        transportation: "flight",
        startDate: new Date("2024/01/15"),
        endDate: new Date("2024/02/15"),
    }
];

// Insert the trips into the database
const insertTrips = async () => {
    try {
        const result = await CustomizableTrip.insertMany(CustomizableTripsData);
        console.log(`${result.length} customizable trips inserted successfully`);
    } catch (error) {
        console.error('Error inserting customizable trips:', error);
    } finally {
        mongoose.connection.close();
    }
};

insertTrips();
