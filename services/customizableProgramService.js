const CustomizableProgram = require('../models/CustomizableProgram.js');

// Get customizable programs by location
exports.getCustomizableProgramsByLocation = async (location) => {
    return await CustomizableProgram.find({ location });
};

// Create a customizable program
exports.createCustomizableProgram = async (programData) => {
    const program = new CustomizableProgram(programData);
    return await program.save();
};

// Delete a customizable program
exports.deleteCustomizableProgram = async (programId) => {
    return await CustomizableProgram.findByIdAndDelete(programId);
};
