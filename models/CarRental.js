const mongoose = require('mongoose');

const carRentalSchema = new mongoose.Schema({
    location: { type: String, required: true },
    type: { type: String, required: true }, // SUV, Sedan, etc.
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
});




module.exports = mongoose.model('CarRental', carRentalSchema);
