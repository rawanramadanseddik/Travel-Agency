const { Router } = require('express');
const bookingController = require('../controllers/bookingController');

const bookingRouter = Router();

// Route to create a booking
bookingRouter.post('/', bookingController.createBooking);

module.exports = bookingRouter;
