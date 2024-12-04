const Location = require('../models/Location'); // Import Location model
const Program = require('../models/Program.js'); // Import Program model
const Transportation = require('../models/Transportation'); // Import Transportation model
const User = require('../models/User');  // Import User model for validation
const UserProgramSelection = require('../models/UserProgramSelection');  // Correct model import

// Function to get all locations
const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error: error.message });
    }
};

// Function to get programs by location
const getProgramsByLocation = async (req, res) => {
    const location = req.params.location;
    try {
        const programs = await Program.find({ location });
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching programs', error: error.message });
    }
};

// Function to get transportation by location
const getTransportationByLocation = async (req, res) => {
    const location = req.params.location;
    try {
        const transportation = await Transportation.find({ location });
        res.status(200).json(transportation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transportation', error: error.message });
    }
};



module.exports = {
    getLocations,
    getProgramsByLocation,
    getTransportationByLocation,
    saveProgramSelection
};