const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  programId: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  accommodationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation', required: true },
  transportationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transportation', required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;