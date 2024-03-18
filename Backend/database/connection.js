const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const sslConfig = {
  rejectUnauthorized: true,
  ca: fs.readFileSync(path.join(__dirname, '..', 'ssl', 'ca-central-1-bundle.pem')).toString(),
};

const db = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: sslConfig,
});

db.connect();


module.exports = db;