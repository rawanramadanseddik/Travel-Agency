const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    activities: [{ type: String }],
    description: { type: String },
});

//module.exports = mongoose.model('Program', programSchema);
const Program = mongoose.model('Program', programSchema);

module.exports = Program;