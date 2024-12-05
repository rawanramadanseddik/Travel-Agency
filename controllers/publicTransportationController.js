const PublicTransportation = require('../models/PublicTransportation');

// Insert a new public transportation record
exports.insertPublicTransportation = async (req, res) => {
    const { location, type, name, price, schedule, description } = req.body;

    try {
        const newTransportation = new PublicTransportation({
            location,
            type,
            name,
            price,
            schedule,
            description,
        });
        await newTransportation.save();
        res.status(201).json({ message: 'Public transportation added successfully.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Search for public transportation by location
exports.searchPublicTransportation = async (req, res) => {
    const { location, type } = req.body;

    try {
        const results = await PublicTransportation.find({
            location,
            type
        });

        if (!results.length) {
            return res.status(404).json({ message: 'No public transportation found for the given criteria' });
        }

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error searching public transportation', error: err.message });
    }
};

// Update Public Transportation Data
exports.updatePublicTransportation = async (req, res) => {
    try {
        const { id } = req.params;
        const transportData = req.body;

        const updatedTransport = await PublicTransportation.findByIdAndUpdate(id, transportData, { new: true });
        if (!updatedTransport) {
            return res.status(404).json({ message: 'Public transportation not found' });
        }

        res.status(200).json({
            message: 'Public transportation updated successfully',
            transport: updatedTransport,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating public transportation', error: error.message });
    }
};

// Delete Public Transportation Data
exports.deletePublicTransportation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await PublicTransportation.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Public transportation not found' });
        }
        res.status(200).json({ message: 'Public transportation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting public transportation', error: error.message });
    }
};
