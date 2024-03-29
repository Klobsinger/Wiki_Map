const db = require("../connection");

const getMapsByCityId = async (mapId) => {
  try {
    const query = `
    SELECT 
    c.id AS city_id, 
    c.name AS city_name, 
    c.country, 
    c.latitude AS city_latitude, 
    c.longitude AS city_longitude,
    json_agg(json_build_object(
        'map_id', m.id, 
        'map_title', m.title, 
        'map_description', m.description,
		'creator_username', u.username,
        'pins', (SELECT json_agg(json_build_object(
            'pin_id', p.id, 
            'pin_title', p.title, 
            'pin_description', p.description, 
            'pin_latitude', p.latitude, 
            'pin_longitude', p.longitude, 
            'image_url', p.image_url
        )) FROM pins p WHERE m.id = p.map_id)
    ) ORDER BY m.created_at DESC) AS maps
FROM 
    cities c
LEFT JOIN 
    maps m ON m.city_id = c.id
	LEFT JOIN users u ON m.user_id = u.id
WHERE 
    c.id = $1
GROUP BY c.id;  
    `;

    const result = await db.query(query, [mapId]);
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
    return null;
  }
};

// Function to insert a new map into the database
const createMap = async (client, title, description, cityId, userId) => {
  // SQL query to insert a new map and return its ID
  const mapInsertQuery = `
    INSERT INTO maps (title, description, city_id, user_id)
    VALUES ($1, $2, $3, $4) RETURNING id;
  `;
  
  // Execute the query using the provided client for transactional integrity
  const result = await client.query(mapInsertQuery, [title, description, cityId, userId]);
  
  // Return the ID of the newly inserted map
  return result.rows[0].id;
};

module.exports = {
  getMapsByCityId,
  createMap
};