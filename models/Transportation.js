const mongoose = require('mongoose');

const transportationSchema = new mongoose.Schema({
    programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    type: { type: String, required: true },
});

module.exports = mongoose.model('Transportation', transportationSchema);
