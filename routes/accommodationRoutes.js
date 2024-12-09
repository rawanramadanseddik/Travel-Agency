const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');

// GET accommodations by programId
router.get('/', async (req, res) => {
    const { programId } = req.query; // Get programId from query parameters

    try {
        const accommodations = await Accommodation.find({ programId: programId });
        if (accommodations.length === 0) {
            return res.status(404).json({ message: 'No accommodations found for the given program ID.' });
        }
        res.json(accommodations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new accommodation
router.post('/', async (req, res) => {
    try {
        const accommodationData = req.body;
        const newAccommodation = await Accommodation.create(accommodationData);
        res.status(201).json({ success: true, data: newAccommodation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete an accommodation by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Accommodation.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Accommodation deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
