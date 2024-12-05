const mongoose = require('mongoose');

const publicTransportationSchema = new mongoose.Schema({
    location: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Bus, Metro, Train
    name: { type: String, required: true }, // Specific name/route identifier
    price: { type: Number, required: true }, // Fare for the transportation
    schedule: { type: String, required: true }, // Operational timings
    description: { type: String }, // Optional description
});

module.exports = mongoose.model('PublicTransportation', publicTransportationSchema);

