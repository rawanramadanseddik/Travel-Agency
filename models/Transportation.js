const mongoose = require('mongoose');

const transportationSchema = new mongoose.Schema({
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomizableProgram', required: true },
    type: { type: String, required: true }, // e.g., Flight, Bus, Private Car
    details: [String],
});

module.exports = mongoose.model('Transportation', transportationSchema);
