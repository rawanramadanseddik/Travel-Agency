const express = require('express');
const tripController = require('../controllers/tripController'); // Ensure this is imported correctly
const router = express.Router();

// POST route for creating a trip (moved to the controller)
router.post('/', tripController.createTrip);

// Get trips based on location and program
router.get('/location/:location/program/:programName', tripController.getTripsByLocationAndProgram);

// Route to get all trips
router.get('/', tripController.getAllTrips); // Correct route for getting all trips

// Route to get a trip by ID (you may want to keep this too)
router.get('/:id', tripController.getTripById);

// Route to update a trip by ID (you may want to keep this too)
router.put('/:id', tripController.updateTrip);

// Route to delete a trip by ID (you may want to keep this too)
router.delete('/:id', tripController.deleteTrip);

module.exports = router;      