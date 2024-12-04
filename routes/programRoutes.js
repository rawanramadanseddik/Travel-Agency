const { Router } = require('express');
const programController = require('../controllers/programController');  // Ensure this path is correct
const programsRouter = Router();

// Route to get all programs
programsRouter.get('/', programController.getPrograms);

module.exports = programsRouter;
