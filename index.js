const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Load data from db.json
const dbPath = path.join(__dirname, 'db.json');
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Canada API',
    endpoints: {
      provinces: '/provinces',
      territories: '/territories'
    }
  });
});

app.get('/provinces', (req, res) => {
  res.json(data.provinces);
});

app.get('/territories', (req, res) => {
  res.json(data.territories);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
