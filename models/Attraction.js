const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    location: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    availableDates: [{ type: Date, required: true }],
});

module.exports = mongoose.model('Attraction', attractionSchema);
