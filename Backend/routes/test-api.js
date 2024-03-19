const express = require("express");
const router = express.Router();
const db = require('../database/connection'); // Adjust the path as needed

// your route definitions
router.get('/test-db', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT NOW()');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error testing the database connection');
  }
});

module.exports = router;