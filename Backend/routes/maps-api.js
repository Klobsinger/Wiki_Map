const express = require("express");
const router = express.Router();
const mapQueries = require("../database/queries/maps");


router.get('/city/:cityId', async (req, res) => {
  const { cityId } = req.params;
  try {
    const mapDetails = await mapQueries.getMapsByCityId(cityId); // Adjust function name and call
    if (mapDetails && mapDetails.length > 0) {
      res.json(mapDetails);
    } else {
      res.status(404).json({ error: 'No maps found for this city' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;