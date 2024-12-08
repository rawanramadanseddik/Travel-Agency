const Trip = require('../models/Trip');
const Program = require('../models/Program');
const Accommodation = require('../models/Accommodation');
const Transportation = require('../models/Transportation');

// Create a new trip
const createTrip = async (req, res) => {
    try {
        const tripData = req.body;
        const newTrip = new Trip(tripData);
        await newTrip.save();
        res.status(201).json({ message: 'Trip created successfully!', trip: newTrip });
    } catch (error) {
        res.status(400).json({ message: 'Error creating trip', error: error.message });
    }
};

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find()
            .populate('programId')        // To get detailed information about the program
            .populate('accommodationId')  // To get detailed information about accommodation
            .populate('transportationId'); // To get detailed information about transportation
        
        res.status(200).json(trips); // Return the list of all trips
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trips', error: error.message });
    }
};


// Get a trip by ID
const getTripById = async (req, res) => {
    try {
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId)
            .populate('programId')
            .populate('accommodationId')
            .populate('transportationId');
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trip', error: error.message });
    }
};

// Update a trip by ID
const updateTrip = async (req, res) => {
    try {
        const tripId = req.params.id;
        const updatedData = req.body;
        const updatedTrip = await Trip.findByIdAndUpdate(tripId, updatedData, { new: true })
            .populate('programId')
            .populate('accommodationId')
            .populate('transportationId');
        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json({ message: 'Trip updated successfully!', trip: updatedTrip });
    } catch (error) {
        res.status(500).json({ message: 'Error updating trip', error: error.message });
    }
};

// Delete a trip by ID
const deleteTrip = async (req, res) => {
    try {
        const tripId = req.params.id;
        const deletedTrip = await Trip.findByIdAndDelete(tripId);
        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json({ message: 'Trip deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting trip', error: error.message });
    }
};

const getTripsByLocationAndProgram = async (req, res) => {
    try {
        const { locationName, programName } = req.params;

        // Validate the input
        if (!locationName || !programName) {
            return res.status(400).json({ message: "Missing location or program name" });
        }

        const program = await Program.findOne({
            name: programName,
            location: locationName,
        });

        if (!program) {
            return res.status(404).json({ message: "No program found for the specified location and name" });
        }

        const trips = await Trip.find({
            programId: program._id,
            location: locationName,
        });

        if (trips.length === 0) {
            return res.status(404).json({ message: "No trips found for the specified program and location" });
        }

        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: "Error fetching trips", error: err.message });
    }
};



module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip,
    getTripsByLocationAndProgram,
};           