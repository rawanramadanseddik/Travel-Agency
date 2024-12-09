const mongoose = require('mongoose');

const customizableProgramSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    activities: [String], // List of activities
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CustomizableProgram', customizableProgramSchema);
