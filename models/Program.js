const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({

    name: { type: String, required: true , unique: true},
    description: { type: String, required: false },
    activites: { type: String, required: true },
    location: { type: String, required: true },
  });


//module.exports = mongoose.model('Program', programSchema);
const Program = mongoose.model('Program', programSchema);

module.exports = Program;