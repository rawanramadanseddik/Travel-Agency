const { Router } = require('express');
const programController = require('../controllers/programController'); // Ensure this path is correct
const programsRouter = Router();

// Route to get all programs
programsRouter.get('/', programController.getPrograms);

// Route to get programs by location name
programsRouter.get('/:locationName', programController.getProgramsByLocation);

module.exports = programsRouter;
