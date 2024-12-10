const express = require('express');
const router = express.Router();
const customizableProgramController = require('../controllers/customizableProgramController');

// Get programs by location
router.get('/:location', customizableProgramController.getCustomizableProgramsByLocation);

// Create a program
router.post('/', customizableProgramController.createCustomizableProgram);

// Delete a program
router.delete('/:id', customizableProgramController.deleteCustomizableProgram);

module.exports = router;
