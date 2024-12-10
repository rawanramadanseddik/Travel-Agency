const customizableProgramService = require('../services/customizableProgramService');

// Get customizable programs by location
exports.getCustomizableProgramsByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const programs = await customizableProgramService.getCustomizableProgramsByLocation(location);
        res.status(200).json({ success: true, data: programs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new customizable program
exports.createCustomizableProgram = async (req, res) => {
    try {
        const programData = req.body;
        const newProgram = await customizableProgramService.createCustomizableProgram(programData);
        res.status(201).json({ success: true, data: newProgram });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a customizable program
exports.deleteCustomizableProgram = async (req, res) => {
    try {
        const { id } = req.params;
        await customizableProgramService.deleteCustomizableProgram(id);
        res.status(200).json({ success: true, message: 'Program deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
