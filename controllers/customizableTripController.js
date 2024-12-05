const mongoose = require('mongoose'); // Import mongoose for ObjectId validation
const CustomizableTrip = require('../models/CustomizableTrip'); // Import CustomizableTrip model
const jwt = require('jsonwebtoken'); // Import jwt for token generation
const { findAllCustomizableTrips } = require('../services/customizableTripService'); // Import service for fetching customizableTrips


// Controller method to get customizableTrips
exports.getCustomizableTrips = async (req, res) => {
    try {
        const customizableTrips = await findAllCustomizableTrips(); // Call the service to fetch customizableTrips
        res.json({
            success: true,
            data: customizableTrips,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch customizableTrips',
            error: error.message,
        });
    }
};


exports.createCustomizableTrip = async (req, res) => {
    try {
        const { userId, location, accommodation, transportation, startDate, endDate } = req.body;


        // Create a new customizableTrip
        const newCustomizableTrip = new CustomizableTrip({ userId, location, accommodation, transportation, startDate, endDate });
        await newCustomizableTrip.save();
        res.status(201).json({ message: 'CustomizableTrip created successfully' });
    } catch (error) {
        console.error('Error during customizableTrip creation:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete customizableTrip controller
exports.deleteCustomizableTrip = async (req, res) => {
    try {
        const { customizableTripId } = req.params;  // Make sure to use customizableTripId

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(customizableTripId)) {
            return res.status(400).json({ message: 'Invalid customizableTrip ID' });
        }

        // Attempt to delete customizableTrip
        const customizableTrip = await CustomizableTrip.findByIdAndDelete(customizableTripId);
        if (!customizableTrip) {
            return res.status(404).json({ message: 'CustomizableTrip not found' });
        }

        res.status(200).json({ message: 'CustomizableTrip deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// const customizableTripService = require('../services/customizableTripService');

// exports.createCustomizableTrip = async (req, res) => {
//     try {
//         const customizableTripData = req.body; // Get the trip data from the request body
//         const customizableTripId = req.customizableTrip.id; // Assuming `req.customizableTrip` has the authenticated customizableTrip's ID

//         const trip = await customizableTripService.createCustomizableTrip(customizableTripId, tripData);
//         res.status(201).json({ message: 'Trip created successfully', trip });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating trip', error: error.message });
//     }
// };

// exports.getCustomizableTrip = async (req, res) => {
//     try {
//         // Fetch all trips without filtering by customizableTripId
//         const trips = await customizableTripService.findAllTrips();
//         res.status(200).json({ trips });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching trips', error: error.message });
//     }
// };


// exports.updateCustomizableTrip = async (req, res) => {
//     try {
//         const { tripId } = req.params;
//         const tripData = req.body;
//         const updatedTrip = await customizableTripService.updateCustomizableTrip(tripId, tripData);
//         res.status(200).json({ message: 'Trip updated successfully', trip: updatedTrip });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating trip', error: error.message });
//     }
// };

// exports.deleteCustomizableTrip = async (req, res) => {
//     try {
//         const { tripId } = req.params;
//         await customizableTripService.deleteCustomizableTrip(tripId);
//         res.status(200).json({ message: 'Trip deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting trip', error: error.message });
//     }
// };
