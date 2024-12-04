const express = require('express');
const router = express.Router();
const Location = require('../models/Location'); // Import the Location model

// Route to get all locations from the database
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find(); // Retrieve all locations
    res.json(locations); // Send locations as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Add a new location
router.post('/', async (req, res) => {
    const location = new Location({
      name: req.body.name,
      description: req.body.description
    });
  
    try {
      const newLocation = await location.save();
      res.status(201).json({ message: 'Location added successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json(location);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.json({ message: 'Location deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;