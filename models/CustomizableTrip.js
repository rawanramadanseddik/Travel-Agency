const mongoose = require('mongoose');

const customizableTripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  accommodation: { type: String, required: true },
  transportation: { type: String, required: true },
  facilities: { type: [String] },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CustomizableTrip', customizableTripSchema);
