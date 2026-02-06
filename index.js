const express = require('express');
const fs = require('fs');
const path = require('path');
const lib = require('./lib');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// Load data from separate JSON files
let provinces, territories;
try {
  const provincesPath = path.join(__dirname, 'db/provinces.json');
  const territoriesPath = path.join(__dirname, 'db/territories.json');

  provinces = JSON.parse(fs.readFileSync(provincesPath, 'utf8'));
  territories = JSON.parse(fs.readFileSync(territoriesPath, 'utf8'));
} catch (error) {
  console.error('Error reading data files:', error.message);
  process.exit(1);
}

// Home route
app.get('/', (req, res) => {
  const baseUrl = lib.getBaseUrl(req);
  res.json({
    message: 'Canada API - Provinces and Territories',
    version: '1.0.0',
    endpoints: {
      provinces: `${baseUrl}/provinces`,
      territories: `${baseUrl}/territories`,
      health: `${baseUrl}/health`
    }
  })
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Canada API v1.0.0'
  });
});

// JSON endpoints
app.get('/provinces', (req, res) => {
  res.json(provinces);
});

app.get('/territories', (req, res) => {
  res.json(territories);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
