const express = require("express");
const router = express.Router();
const mapQueries = require("../database/queries/maps");


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mapDetails = await mapQueries.getMapById(id);
    if (mapDetails && mapDetails.length > 0) {
      res.json(mapDetails);
    } else {
      res.status(404).json({ error: 'Map not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;