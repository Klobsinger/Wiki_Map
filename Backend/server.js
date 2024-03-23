const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database/connection'); // Adjust path as needed
const app = express();
app.use(cors());
app.use(express.json());


const mapsRoutes = require('./routes/maps-api');
const pinsRoutes = require('./routes/pins-api');
const usersRoutes = require('./routes/users-api');
const favoritesRoutes = require('./routes/favorites-api');
const testRoutes = require('./routes/test-api');
const CityRoutes = require('./routes/cities-api');

// Use route handlers
// app.use('/api/maps', mapsRoutes);
// app.use('/api/pins', pinsRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/favorites', favoritesRoutes);
app.use('/api/test', testRoutes);
app.use('/api/cities', CityRoutes);
app.use('/api/maps', mapsRoutes);
// Use route handlers
// app.use('/api/maps', mapsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
