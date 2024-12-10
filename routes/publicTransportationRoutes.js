const express = require('express');
const router = express.Router();
const publicTransportationController = require('../controllers/publicTransportationController');

// Routes for Public Transportation
router.post('/insert', publicTransportationController.insertPublicTransportation);
router.get('/search', publicTransportationController.searchPublicTransportation);

module.exports = router;
