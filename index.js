const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from db/flags directory
app.use('/flags', express.static(path.join(__dirname, 'db/flags')));

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

// Helper function to get base URL from request
const getBaseUrl = (req) => {
  return `${req.protocol}://${req.get('host')}`;
};

// Routes
app.get('/', (req, res) => {
  const baseUrl = getBaseUrl(req);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Canada API</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }
        .container {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 40px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        h1 {
          text-align: center;
          font-size: 2.5em;
          margin-bottom: 10px;
        }
        .subtitle {
          text-align: center;
          font-size: 1.2em;
          margin-bottom: 40px;
          opacity: 0.9;
        }
        .endpoints {
          display: grid;
          gap: 15px;
        }
        .endpoint {
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 10px;
          text-decoration: none;
          color: white;
          transition: all 0.3s ease;
          display: block;
        }
        .endpoint:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        .endpoint-title {
          font-size: 1.3em;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .endpoint-path {
          font-family: monospace;
          opacity: 0.8;
          font-size: 0.9em;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          opacity: 0.8;
          font-size: 0.9em;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🍁 Canada API</h1>
        <p class="subtitle">Explore information about Canadian provinces and territories</p>
        
        <div class="endpoints">
          <a href="${baseUrl}/provinces" class="endpoint">
            <div class="endpoint-title">📍 Provinces</div>
            <div class="endpoint-path">GET ${baseUrl}/provinces</div>
          </a>
          
          <a href="${baseUrl}/territories" class="endpoint">
            <div class="endpoint-title">🏔️ Territories</div>
            <div class="endpoint-path">GET ${baseUrl}/territories</div>
          </a>
          
          <a href="${baseUrl}/health" class="endpoint">
            <div class="endpoint-title">💚 Health Check</div>
            <div class="endpoint-path">GET ${baseUrl}/health</div>
          </a>
        </div>
        
        <div class="footer">
          Powered by Express.js | Open Source API
        </div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Canada API'
  });
});

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
