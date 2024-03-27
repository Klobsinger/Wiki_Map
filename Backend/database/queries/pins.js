const db = require("../connection");

// Function to insert a new pin associated with a map
const insertPin = async (client, mapId, { title, description, lat, lng, imageUrl = null }) => {
  // SQL query to insert a new pin and return its ID
  const pinInsertQuery = `
    INSERT INTO pins (map_id, title, description, latitude, longitude, image_url)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;
  `;
  
  // Execute the query using the provided client, ensuring the pin is part of the same transaction as the map creation
  const values = [mapId, title, description, lat, lng, imageUrl];
  const result = await client.query(pinInsertQuery, values);
  
  // Return the ID of the newly inserted pin
  return result.rows[0].id;
};

module.exports = {
  insertPin,
};