const express = require("express");
const router = express.Router();
const db = require("../database/connection");
const mapQueries = require("../database/queries/maps");
const pinQueries = require("../database/queries/pins");


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

// Route to create a new map with associated pins
router.post('/', async (req, res) => {
  // Extracting title, description, pins, and cityId from the request body
  const { title, description, pins, cityId } = req.body;
  const userId = 1; // Hardcoded user ID for now, to be replaced with actual user authentication
  
  // Obtain a dedicated client from the pool for transactional operations
  const client = await db.connect();
  
  try {
    // Start the transaction
    await client.query('BEGIN');
    
    // Create a new map using the provided details and obtain its ID
    const mapId = await mapQueries.createMap(client, title, description, cityId, userId);

    // Iterate over each pin in the provided pins array and insert them using the new map's ID
    for (const pin of pins) {
      await pinQueries.insertPin(client, mapId, pin);
    }

    // Commit the transaction upon successful execution of all operations
    await client.query('COMMIT');
    
    // Respond with success message and the ID of the newly created map
    res.status(201).json({ message: 'Map and pins created successfully', mapId });
  } catch (error) {
    // Roll back the transaction in case of any error
    await client.query('ROLLBACK');
    console.error('Transaction failed:', error);
    res.status(500).json({ message: 'Failed to create map and pins', error: error.message });
  } finally {
    // Release the client back to the pool, ensuring it can be reused
    client.release();
  }
});

module.exports = router;