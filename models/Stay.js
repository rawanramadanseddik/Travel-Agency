const mongoose = require('mongoose');

const staySchema = new mongoose.Schema({
    location: { type: String, required: true },
    type: { type: String, required: true }, // Hotel, Apartment, etc.
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
    maxAdults: { type: Number, required: true },
    maxChildren: { type: Number, required: true },
});

module.exports = mongoose.model('Stay', staySchema);
