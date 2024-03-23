const db = require("../connection");

const getMapById = async (mapId) => {
  try {
    const query = `
    SELECT 
    m.id AS map_id, 
    m.title AS map_title, 
    m.description AS map_description, 
    c.id AS city_id, 
    c.name AS city_name, 
    c.country, 
    c.latitude AS city_latitude, 
    c.longitude AS city_longitude,
    json_agg(json_build_object(
        'pin_id', p.id, 
        'pin_title', p.title, 
        'pin_description', p.description, 
        'pin_latitude', p.latitude, 
        'pin_longitude', p.longitude, 
        'image_url', p.image_url
    )) FILTER (WHERE p.id IS NOT NULL) AS pins
FROM 
    maps m
JOIN 
    cities c ON m.city_id = c.id
LEFT JOIN 
    pins p ON m.id = p.map_id
WHERE 
    m.id = $1
GROUP BY m.id, c.id;   
    `;

    const result = await db.query(query, [mapId]);
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
    return null;
  }
};


module.exports = {
  getMapById
};