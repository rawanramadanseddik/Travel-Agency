// Routes/extraFacilityRoutes.js

const express = require('express');
const router = express.Router();

const {
    getExtraFacilitiesByProgram,
    addExtraFacility,
    deleteExtraFacility,
} = require('../controllers/extraFacilityController'); // error here 

// Get all extra facilities for a program
router.get('/:programId/extra-facilities', getExtraFacilitiesByProgram);

// Add a new extra facility to a program
router.post('/:programId/extra-facilities', addExtraFacility);

// Delete an extra facility from a program
router.delete('/:programId/extra-facilities/:facilityId', deleteExtraFacility);

module.exports = router;
