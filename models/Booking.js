const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    noOfPeople: {
        type: Number,
        required: true,
        min: 1,
    },
    date: {
        type: Date,
        required: true,
    },
    // Add any additional fields as needed
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
