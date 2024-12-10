const Booking = require('../models/Booking');

// Controller to handle booking creation
const createBooking = async (req, res) => {
    try {
        const { name, email, noOfPeople, date } = req.body;

        // Create a new booking
        const newBooking = new Booking({
            name,
            email,
            noOfPeople,
            date,
        });

        // Save to the database
        const savedBooking = await newBooking.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully!',
            data: savedBooking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create booking',
            error: error.message,
        });
    }
};

// Controller to get bookings by user ID
const getAllBookingsByUserId = async (req, res) => {
    const { userId } = req.params; // Extract userId from the route parameter

    try {
        const bookings = await Booking.find({ userId }); // Query all bookings for the user
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get bookings by user name
const getAllBookingsByName = async (req, res) => {
    const { name } = req.params; // Extract name from the route parameter

    try {
        const bookings = await Booking.find({ name: { $regex: new RegExp(name, 'i') } }); // Case-insensitive name match
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookingsByUserId,
    getAllBookingsByName,
};
