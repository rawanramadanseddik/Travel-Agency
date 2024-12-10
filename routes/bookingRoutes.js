const { Router } = require('express');
const { createBooking, getAllBookingsByName } = require('../controllers/bookingController'); // Ensure all necessary functions are imported

const bookingRouter = Router();

// Route to create a booking
bookingRouter.post('/', createBooking);

// Route to get bookings by user name
bookingRouter.get('/user/name/:name', getAllBookingsByName);

module.exports = bookingRouter;
