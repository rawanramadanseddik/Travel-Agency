const Booking = require('../models/Booking');

// Controller to handle booking creation
exports.createBooking = async (req, res) => {
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
