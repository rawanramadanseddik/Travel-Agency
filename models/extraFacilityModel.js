const mongoose = require('mongoose');

const extraFacilitySchema = new mongoose.Schema({
    programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program', // Reference to the Program model
        required: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
});

const ExtraFacility = mongoose.model('ExtraFacility', extraFacilitySchema);

module.exports = ExtraFacility;
