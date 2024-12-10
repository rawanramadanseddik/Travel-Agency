const PublicTransportation = require('../models/PublicTransportation');


const fetchTransportDataFromAPI = async (location) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          query: location,
          api_key: API_KEY,
        },
      });
  
      console.log('API Response:', response.data);
  
      // Assuming response.data.member contains the transportation options
      return response.data.member || []; // Adjust this based on the actual response structure
    } catch (error) {
      console.error('Error calling external API:', error.message);
      throw new Error('Failed to fetch data from external API');
    }
  };
  
  
// Insert new public transportation data
exports.insertPublicTransportation = async (req, res) => {
    const { location, name, type, price, schedule, description } = req.body;

    try {
        const newTransportation = new PublicTransportation({
            location,
            name,
            type,
            price,
            schedule,
            description,
        });

        await newTransportation.save();
        res.status(201).json({ message: 'Public transportation data inserted successfully.' });
    } catch (error) {
        res.status(400).json({ message: 'Error inserting data', error: error.message });
    }
};

exports.searchPublicTransportation = async (req, res) => {
    const { location } = req.query;  // Use req.query for GET requests, not req.body
  
    if (!location) {
      return res.status(400).json({ message: 'Location parameter is required' });
    }
  
    try {
      console.log(`Searching public transportation for location: ${location}`);
      
      // Your logic to fetch data, for example from the database
      const transportOptions = await PublicTransportation.find({ location });
  
      if (!transportOptions.length) {
        return res.status(404).json({ message: 'No public transportation found for the given destination' });
      }
  
      res.status(200).json(transportOptions);  // Return the transport options as JSON
    } catch (error) {
      console.error('Error searching public transportation:', error.message);
      res.status(500).json({ message: 'Error fetching transportation options', error: error.message });
    }
  };
  
