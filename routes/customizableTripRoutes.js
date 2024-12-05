const { Router } = require('express');
const customizableTripController = require('../controllers/customizableTripController');


const customizableTripRouter = Router();

customizableTripRouter.post('/', customizableTripController.createCustomizableTrip);
customizableTripRouter.get('/', customizableTripController.getCustomizableTrips);
// customizableTripRouter.put('/:customizableTripId', customizableTripController.updateCustomizableTrip);
customizableTripRouter.delete('/:customizableTripId', customizableTripController.deleteCustomizableTrip);

module.exports = customizableTripRouter;
