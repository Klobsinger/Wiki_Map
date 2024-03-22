const db = require("../connection");

// Function to get all cities
const getAllCities = async () => {
  try {
    const result = await db.query("SELECT * FROM cities ORDER BY name;");
    return result.rows;
  } catch (err) {
    console.error('Error executing query', err.stack);
    return [];
  }
};

// Function to get a single city by ID
const getCityById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM cities WHERE id = $1;", [id]);
    return result.rows[0]; // Return the first row
  } catch (err) {
    console.error('Error executing query', err.stack);
    return null;
  }
};

module.exports = {
  getAllCities,
  getCityById
};