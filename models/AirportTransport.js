// models/AirportTransport.js
const mongoose = require('mongoose');

const airportTransportSchema = new mongoose.Schema({
    serviceType: { type: String, required: true }, // taxi, shuttle, private car
    price: { type: Number, required: true },
    location: { type: String, required: true }, // Airport or specific location
    pickupTime: { type: Date, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    flightInfo: { type: String, required: true } // Flight number or additional details
});

module.exports = mongoose.model('AirportTransport', airportTransportSchema);
