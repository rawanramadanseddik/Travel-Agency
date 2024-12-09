const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomizableProgram', required: true },
    hotelName: { type: String, required: true },
    roomType: { type: String, required: true },
    wifi: { type: Boolean, default: false },
    meals: [String],
});

module.exports = mongoose.model('Accommodation', accommodationSchema);
