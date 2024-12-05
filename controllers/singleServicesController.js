const Stay = require('../models/Stay');
const CarRental = require('../models/CarRental');
const Attraction = require('../models/Attraction');
const AirportTransport = require('../models/AirportTransport');



// Insert Car Rental Data
exports.insertCarRentalData = async (req, res) => {
    try {
        const carRentalData = req.body;

        // Handle multiple entries if input is an array
        if (Array.isArray(carRentalData)) {
            const newCarRentals = carRentalData.map(car => ({
                location: car.location,
                type: car.type,
                name: car.name,
                price: car.price,
                availableFrom: new Date(car.availableFrom),
                availableTo: new Date(car.availableTo),
                pickupLocation: car.pickupLocation,
            }));

            const result = await CarRental.insertMany(newCarRentals);

            return res.status(201).json({
                message: `${result.length} car rentals inserted successfully`,
                carRentals: result
            });
        }

        // Handle single entry if input is an object
        const { location, type, name, price, availableFrom, availableTo, pickupLocation } = carRentalData;

        const newCarRental = new CarRental({
            location,
            type,
            name,
            price,
            availableFrom: new Date(availableFrom),
            availableTo: new Date(availableTo),
            pickupLocation
        });

        await newCarRental.save();

        return res.status(201).json({
            message: 'Car rental data inserted successfully',
            carRental: newCarRental
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting car rental data', error: error.message });
    }
};

// Update Car Rental Data
exports.updateCarRental = async (req, res) => {
    try {
        const { id } = req.params;
        const carRentalData = req.body;

        const updatedCarRental = await CarRental.findByIdAndUpdate(id, carRentalData, { new: true });
        if (!updatedCarRental) {
            return res.status(404).json({ message: 'Car rental not found' });
        }

        res.status(200).json({
            message: 'Car rental updated successfully',
            carRental: updatedCarRental,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating car rental', error: error.message });
    }
};

// Delete Car Rental Data
exports.deleteCarRental = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCarRental = await CarRental.findByIdAndDelete(id);
        if (!deletedCarRental) {
            return res.status(404).json({ message: 'Car rental not found' });
        }

        res.status(200).json({
            message: 'Car rental deleted successfully',
            carRental: deletedCarRental,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car rental', error: error.message });
    }
};
// Search Car Rentals
exports.searchCarRentals = async (req, res) => {
    const { location, type, fromDate, toDate } = req.body;

    try {
        // Use distinct query to ensure no duplicate cars are returned
        const cars = await CarRental.find({
            location,
            type,
            availableFrom: { $lte: new Date(fromDate) },
            availableTo: { $gte: new Date(toDate) },
        });

        if (cars.length === 0) {
            return res.json({
                location,
                type,
                fromDate,
                toDate,
                message: "No car rentals found matching the criteria"
            });
        }

        // Use a Map to ensure each car is unique based on car name
        const carMap = new Map();
        cars.forEach(car => {
            const key = `${car.name}_${car.pickupLocation}`; // Unique key for each car based on name and pickup location
            if (!carMap.has(key)) {
                carMap.set(key, car);
            }
        });

        // Convert the Map back to an array
        const uniqueCars = Array.from(carMap.values());

        const results = uniqueCars.map(car => ({
            location: car.location,
            type: car.type,
            name: car.name,
            price: car.price,
            availableFrom: car.availableFrom,
            availableTo: car.availableTo,
            pickupLocation: car.pickupLocation
        }));

        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error searching car rentals', error: error.message });
    }
};

// Search Stays
exports.searchStays = async (req, res) => {
    const { location, type, fromDate, toDate, adults, children } = req.body;
    try {
        const stays = await Stay.find({
            location,
            type,
            availableFrom: { $lte: new Date(fromDate) },
            availableTo: { $gte: new Date(toDate) },
            maxAdults: { $gte: adults },
            maxChildren: { $gte: children },
        });
        res.json(stays);
    } catch (error) {
        res.status(500).json({ message: 'Error searching stays', error: error.message });
    }
};


// Insert Single or Multiple Stays
exports.insertStay = async (req, res) => {
    try {
        const stays = req.body;

        // If input is not an array, treat it as a single stay object
        const staysArray = Array.isArray(stays) ? stays : [stays];

        // Map through the input to format the stays
        const newStays = staysArray.map(stay => ({
            location: stay.location,
            type: stay.type,
            name: stay.name,
            price: stay.price,
            availableFrom: new Date(stay.availableFrom),
            availableTo: new Date(stay.availableTo),
            maxAdults: stay.maxAdults,
            maxChildren: stay.maxChildren,
        }));

        // Insert stays into the database
        const result = await Stay.insertMany(newStays);

        res.status(201).json({
            message: `${result.length} stay(s) inserted successfully`,
            stays: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting stay(s)', error: error.message });
    }
};

// Update Stay Data
exports.updateStay = async (req, res) => {
    try {
        const { id } = req.params;
        const stayData = req.body;

        const updatedStay = await Stay.findByIdAndUpdate(id, stayData, { new: true });
        if (!updatedStay) {
            return res.status(404).json({ message: 'Stay not found' });
        }

        res.status(200).json({
            message: 'Stay updated successfully',
            stay: updatedStay,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating stay', error: error.message });
    }
};

// Delete Stay Data
exports.deleteStay = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStay = await Stay.findByIdAndDelete(id);
        if (!deletedStay) {
            return res.status(404).json({ message: 'Stay not found' });
        }

        res.status(200).json({
            message: 'Stay deleted successfully',
            stay: deletedStay,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting stay', error: error.message });
    }
};
// Insert Single or Multiple Attractions
exports.insertAttraction = async (req, res) => {
    try {
        const attractions = req.body;

        // If input is not an array, treat it as a single attraction object
        const attractionsArray = Array.isArray(attractions) ? attractions : [attractions];

        // Map through the input to format the attractions
        const newAttractions = attractionsArray.map(attraction => ({
            location: attraction.location,
            name: attraction.name,
            description: attraction.description,
            price: attraction.price,
            availableDates: attraction.availableDates.map(date => new Date(date)),
        }));

        // Insert attractions into the database
        const result = await Attraction.insertMany(newAttractions);

        res.status(201).json({
            message: `${result.length} attraction(s) inserted successfully`,
            attractions: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting attraction(s)', error: error.message });
    }
};

// Update Attraction Data
exports.updateAttraction = async (req, res) => {
    try {
        const { id } = req.params;
        const attractionData = req.body;

        const updatedAttraction = await Attraction.findByIdAndUpdate(id, attractionData, { new: true });
        if (!updatedAttraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }

        res.status(200).json({
            message: 'Attraction updated successfully',
            attraction: updatedAttraction,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attraction', error: error.message });
    }
};

// Delete Attraction Data
exports.deleteAttraction = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAttraction = await Attraction.findByIdAndDelete(id);
        if (!deletedAttraction) {
            return res.status(404).json({ message: 'Attraction not found' });
        }

        res.status(200).json({
            message: 'Attraction deleted successfully',
            attraction: deletedAttraction,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attraction', error: error.message });
    }
};
// Search Attractions
exports.searchAttractions = async (req, res) => {
    const { location, dates } = req.body;
    try {
        const attractions = await Attraction.find({
            location,
            availableDates: { $in: dates.map((date) => new Date(date)) },
        });
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ message: 'Error searching attractions', error: error.message });
    }
};

// Insert a new airport transport booking
module.exports.insertAirportTransport = async (req, res) => {
    const data = req.body; // Accepts either an array of records or a single record

    try {
        if (Array.isArray(data)) {
            // If the request contains multiple records
            const newTransports = await AirportTransport.insertMany(data);
            res.status(201).json({
                message: 'Airport transport bookings added successfully',
                transports: newTransports
            });
        } else {
            // If the request contains a single record
            const transport = new AirportTransport(data);
            const newTransport = await transport.save();
            res.status(201).json({
                message: 'Airport transport booked successfully',
                transport: newTransport
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update Airport Transport Data
exports.updateAirportTransport = async (req, res) => {
    try {
        const { id } = req.params;
        const transportData = req.body;

        const updatedTransport = await AirportTransport.findByIdAndUpdate(id, transportData, { new: true });
        if (!updatedTransport) {
            return res.status(404).json({ message: 'Airport transport not found' });
        }

        res.status(200).json({
            message: 'Airport transport updated successfully',
            transport: updatedTransport,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating airport transport', error: error.message });
    }
};

// Delete Airport Transport Data
exports.deleteAirportTransport = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTransport = await AirportTransport.findByIdAndDelete(id);
        if (!deletedTransport) {
            return res.status(404).json({ message: 'Airport transport not found' });
        }

        res.status(200).json({
            message: 'Airport transport deleted successfully',
            transport: deletedTransport,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting airport transport', error: error.message });
    }
};

// Search for available airport transport services
module.exports.searchAirportTransports = async (req, res) => {
    const { location, serviceType } = req.body;

    try {
        const transports = await AirportTransport.find({ location, serviceType });
        res.json(transports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
