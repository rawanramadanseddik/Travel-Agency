const { findAllPrograms } = require('../services/programService'); // Import service for fetching all programs
const Program = require('../models/Program'); // Import Program model for specific queries

// Controller method to get all programs from the database
exports.getPrograms = async (req, res) => {
    try {
        const programs = await findAllPrograms(); // Call the service to fetch all programs
        res.json({
            success: true,
            data: programs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch programs',
            error: error.message,
        });
    }
};

// Controller method to get programs by location name
exports.getProgramsByLocation = async (req, res) => {
    const { locationName } = req.params; // Extract location name from route parameter
    try {
        const programs = await Program.find({ location: locationName }); // Fetch programs filtered by location
        if (!programs || programs.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No programs found for location: ${locationName}`,
            });
        }
        res.json({
            success: true,
            data: programs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch programs by location',
            error: error.message,
        });
    }
};
