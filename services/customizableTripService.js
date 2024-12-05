const CustomizableTripModel = require('../models/CustomizableTrip');

module.exports.findAllCustomizableTrips = async (userId) => {
    try {
        // Retrieve all trips for the specified user
        const trips = await CustomizableTripModel.find({ userId });
        return trips;
    } catch (err) {
        throw new Error('Could not retrieve trips');
    }
};

module.exports.createCustomizableTrip = async (userId, tripData) => {
    try {
        // Create a new trip for the specified user
        const trip = new CustomizableTripModel({
            userId,
            ...tripData, // spread the provided trip data (location, accommodation, etc.)
        });
        await trip.save();
        return trip;
    } catch (err) {
        throw new Error('Could not create trip');
    }
};

module.exports.updateCustomizableTrip = async (tripId, tripData) => {
    try {
        // Find and update the specified trip
        const updatedTrip = await CustomizableTripModel.findByIdAndUpdate(
            tripId,
            tripData,
            { new: true } // Return the updated document
        );
        if (!updatedTrip) {
            throw new Error('Trip not found');
        }
        return updatedTrip;
    } catch (err) {
        throw new Error('Could not update trip');
    }
};

module.exports.deleteCustomizableTrip = async (tripId) => {
    try {
        // Find and delete the specified trip
        const deletedTrip = await CustomizableTripModel.findByIdAndDelete(tripId);
        if (!deletedTrip) {
            throw new Error('Trip not found');
        }
        return deletedTrip;
    } catch (err) {
        throw new Error('Could not delete trip');
    }
};
