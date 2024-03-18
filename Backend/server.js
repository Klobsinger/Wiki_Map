const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database/connection'); // Adjust path as needed
const app = express();
app.use(cors());
app.use(express.json());

// Import route handlers
// const mapsRoutes = require('./routes/maps');

// Use route handlers
// app.use('/api/maps', mapsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Simple query to test the connection delete later

app.get('/test-db', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT NOW()'); 
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error testing the database connection');
  }
});