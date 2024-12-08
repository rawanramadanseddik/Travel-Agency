const express = require('express');
const router = express.Router();
const publicTransportationController = require('../controllers/publicTransportationController');

// Route for inserting public transportation data
router.post('/insert', publicTransportationController.insertPublicTransportation);

// Route for searching public transportation data
router.post('/search', publicTransportationController.searchPublicTransportation);
// Public Transportation Routes
router.put('/public-transportations/:id', publicTransportationController.updatePublicTransportation);
router.delete('/:id', publicTransportationController.deletePublicTransportation);

module.exports = router;
