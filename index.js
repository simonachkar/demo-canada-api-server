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
  // Use X-Forwarded-Host if behind a proxy, otherwise use Host header
  const host = req.get('x-forwarded-host') || req.get('host');
  
  // Validate host to prevent header injection
  // Allow localhost with any port, and common domain patterns
  const allowedHostPattern = /^(localhost|127\.0\.0\.1)(:\d+)?$|^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!host || !allowedHostPattern.test(host)) {
    // Fallback to localhost if host is invalid
    return `${req.protocol}://localhost:${PORT}`;
  }
  
  return `${req.protocol}://${host}`;
};

// Helper function to generate simple HTML page
const generateSimpleHtmlPage = (title, items, subtitle, baseUrl) => {
  const cardsHtml = items.map(item => `
    <div class="card">
      <h3>${item.name}</h3>
      <p><strong>Capital:</strong> ${item.capital}</p>
      <p class="description">${item.description}</p>
      <p class="flag-description"><strong>Flag:</strong> ${item.flagDescription}</p>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Canada API</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
          background: #f5f5f5;
        }
        .header {
          background: #2c3e50;
          color: white;
          padding: 2rem;
          text-align: center;
        }
        .header h1 {
          margin-bottom: 0.5rem;
        }
        .nav {
          background: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .nav a {
          color: #2c3e50;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: background 0.3s;
        }
        .nav a:hover {
          background: #ecf0f1;
        }
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .card h3 {
          color: #2c3e50;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }
        .card p {
          margin-bottom: 0.75rem;
          color: #555;
        }
        .card .description {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }
        .card .flag-description {
          font-size: 0.9rem;
          color: #666;
          font-style: italic;
        }
        .footer {
          text-align: center;
          padding: 2rem;
          color: #666;
          margin-top: 3rem;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🍁 ${title}</h1>
        <p>Canadian ${subtitle}</p>
      </div>
      
      <nav class="nav">
        <a href="${baseUrl}/">Home</a>
        <a href="${baseUrl}/provinces/html">Provinces (HTML)</a>
        <a href="${baseUrl}/territories/html">Territories (HTML)</a>
        <a href="${baseUrl}/provinces">Provinces (JSON)</a>
        <a href="${baseUrl}/territories">Territories (JSON)</a>
        <a href="${baseUrl}/health">Health Check</a>
      </nav>
      
      <div class="container">
        <div class="cards">
          ${cardsHtml}
        </div>
      </div>
      
      <div class="footer">
        <p>Powered by Express.js | Canada API</p>
      </div>
    </body>
    </html>
  `;
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
          <a href="${baseUrl}/provinces/html" class="endpoint">
            <div class="endpoint-title">📍 Provinces (HTML)</div>
            <div class="endpoint-path">GET ${baseUrl}/provinces/html</div>
          </a>
          
          <a href="${baseUrl}/territories/html" class="endpoint">
            <div class="endpoint-title">🏔️ Territories (HTML)</div>
            <div class="endpoint-path">GET ${baseUrl}/territories/html</div>
          </a>
          
          <a href="${baseUrl}/provinces" class="endpoint">
            <div class="endpoint-title">📄 Provinces (JSON)</div>
            <div class="endpoint-path">GET ${baseUrl}/provinces</div>
          </a>
          
          <a href="${baseUrl}/territories" class="endpoint">
            <div class="endpoint-title">📄 Territories (JSON)</div>
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Canada API'
  });
});

// JSON endpoints
app.get('/provinces', (req, res) => {
  res.json(provinces);
});

app.get('/territories', (req, res) => {
  res.json(territories);
});

// HTML endpoints
app.get('/provinces/html', (req, res) => {
  const baseUrl = getBaseUrl(req);
  const html = generateSimpleHtmlPage('Canadian Provinces', provinces, 'Provinces', baseUrl);
  res.send(html);
});

app.get('/territories/html', (req, res) => {
  const baseUrl = getBaseUrl(req);
  const html = generateSimpleHtmlPage('Canadian Territories', territories, 'Territories', baseUrl);
  res.send(html);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
