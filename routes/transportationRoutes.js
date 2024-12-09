const express = require('express');
const router = express.Router();
const Transportation = require('../models/Transportation');

// GET transportations by programId
router.get('/', async (req, res) => {
    const { programId } = req.query; // Get programId from query parameters

    try {
        const transportations = await Transportation.find({ programId: programId });
        if (transportations.length === 0) {
            return res.status(404).json({ message: 'No transportations found for the given program ID.' });
        }
        res.json(transportations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new transportation option
router.post('/', async (req, res) => {
    try {
        const transportationData = req.body;
        const newTransportation = await Transportation.create(transportationData);
        res.status(201).json({ success: true, data: newTransportation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a transportation option by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Transportation.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Transportation option deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
