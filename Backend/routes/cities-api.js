const express = require("express");
const router = express.Router();
const cityQueries = require("../database/queries/cities");

// Endpoint to get all cities
router.get('/', async (req, res) => {
  try {
    const cities = await cityQueries.getAllCities();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const city = await cityQueries.getCityById(id);
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;