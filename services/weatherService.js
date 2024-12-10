const axios = require('axios');

// Your API key and base URL
const apiKey = 'e4e02f0fe12c464b9ff04335240712'; 
const baseUrl = 'http://api.weatherapi.com/v1/current.json'; // For current weather data

// Function to fetch weather data
const getWeather = async (city) => {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        key: apiKey,
        q: city, // City or location query
        aqi: 'no', // Air Quality Index (optional, 'yes' or 'no')
      },
    });

    return response.data; // Weather data as JSON
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Unable to fetch weather data');
  }
};

module.exports = { getWeather };
