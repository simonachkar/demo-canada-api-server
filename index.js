const express = require('express');
const lib = require('./lib');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// Load data from separate JSON files
let provinces = lib.getData('db/provinces.json');
let territories = lib.getData('db/territories.json');

// Home route
app.get('/', (req, res) => {
  const baseUrl = lib.getBaseUrl(req);
  res.json({
    message: 'Canada API - Provinces and Territories',
    version: '1.0.1',
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

// Data endpoints
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
