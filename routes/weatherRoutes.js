const express = require('express');
const { getWeather } = require('./weatherService');
const app = express();

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const weatherData = await getWeather(city);
    res.json(weatherData); // Send weather data to the client
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Weather API app is running on port 3000');
});
