// Controllers/extraFacilityController.js

const ExtraFacility = require('../models/extraFacilityModel');

// Fetch all extra facilities for a specific program
const getExtraFacilitiesByProgram = async (req, res) => {
    const { programId } = req.params;

    try {
        const facilities = await ExtraFacility.find({ programId });
        res.status(200).json(facilities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new extra facility for a program
const addExtraFacility = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const programId = req.params.programId;

        // Validate required fields
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const extraFacility = new ExtraFacility({
            name,
            description,
            price,
            programId,
        });

        const savedFacility = await extraFacility.save();
        res.status(201).json(savedFacility);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an extra facility from a program
const deleteExtraFacility = async (req, res) => {
    const { programId, facilityId } = req.params;
    try {
        // Ensure the ObjectId is properly formatted
        if (!mongoose.Types.ObjectId.isValid(facilityId)) {
            return res.status(400).json({ error: 'Invalid Facility ID' });
        }

        const deletedFacility = await ExtraFacility.findOneAndDelete({
            _id: facilityId,
            programId: programId,
        });

        if (!deletedFacility) {
            return res.status(404).json({ error: 'Extra Facility not found' });
        }

        res.status(200).json({ message: 'Extra Facility deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getExtraFacilitiesByProgram,
    addExtraFacility,
    deleteExtraFacility,
};
