const mongoose = require('mongoose');

const publicTransportationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Bus', 'Metro', 'Tram', 'Train'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('PublicTransportation', publicTransportationSchema);
