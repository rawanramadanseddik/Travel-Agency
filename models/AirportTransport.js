// models/AirportTransport.js
const mongoose = require('mongoose');

const airportTransportSchema = new mongoose.Schema({
    serviceType: { type: String, required: true }, // taxi, shuttle, private car
    price: { type: Number, required: true },
    location: { type: String, required: true }, // Airport or specific location
    destination: { type: String, required: true }, // added destination
    numberOfPeople: { type: Number, required: true }, // added number of people
});

module.exports = mongoose.model('AirportTransport', airportTransportSchema);
