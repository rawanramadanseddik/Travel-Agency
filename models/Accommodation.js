const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
