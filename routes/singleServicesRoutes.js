const express = require('express');
const router = express.Router();
const CarRental = require('../models/CarRental'); // Import your CarRental model
const singleServicesController = require('../controllers/singleServicesController');



// Car Rental Routes
router.post('/insertCarRentalData', singleServicesController.insertCarRentalData);
router.post('/searchCarRentals', singleServicesController.searchCarRentals);
router.put('/car-rentals/:id', singleServicesController.updateCarRental);
router.delete('/car-rentals/:id', singleServicesController.deleteCarRental);
// Stay Routes
router.post('/insertStay', singleServicesController.insertStay);
router.post('/stays', singleServicesController.searchStays);
router.put('/stays/:id', singleServicesController.updateStay);
router.delete('/stays/:id', singleServicesController.deleteStay);
// Attraction Routes
router.post('/insertAttraction', singleServicesController.insertAttraction);
router.post('/attractions', singleServicesController.searchAttractions);
router.put('/attractions/:id', singleServicesController.updateAttraction);
router.delete('/attractions/:id', singleServicesController.deleteAttraction);

// Airport Transport Routes
router.post('/insertAirportTransport', singleServicesController.insertAirportTransport);
router.post('/searchAirportTransports', singleServicesController.searchAirportTransports);
router.put('/airport-transports/:id', singleServicesController.updateAirportTransport);
router.delete('/airport-transports/:id', singleServicesController.deleteAirportTransport);


module.exports = router;

