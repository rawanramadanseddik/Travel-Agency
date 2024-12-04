const { findAllProgramss } = require('../services/programService'); // Import service for fetching programs

// Controller method to get programs from the database
exports.getPrograms = async (req, res) => {
    try {
        const programs = await findAllPrograms(); // Call the service to fetch programs from the database
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
