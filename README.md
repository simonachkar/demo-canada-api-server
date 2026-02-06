# Canada API Server

A simple Express API that provides detailed information about Canadian provinces and territories, including descriptions, capitals, and flag information.

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will start on port 3000 by default (or the port specified in the `PORT` environment variable).

## API Endpoints

### Web Interface (HTML)
- `GET /` - Interactive home page with clickable links to all endpoints
- `GET /provinces/html` - View all Canadian provinces in a formatted HTML page
- `GET /territories/html` - View all Canadian territories in a formatted HTML page

### JSON API
- `GET /provinces` - Get all Canadian provinces as JSON
- `GET /territories` - Get all Canadian territories as JSON  
- `GET /health` - Health check endpoint for monitoring

## Data Structure

Each province and territory includes:
- **name** - Official name
- **capital** - Capital city
- **description** - 1-2 sentence overview
- **flagUrl** - URL to flag image on Wikimedia
- **flagImage** - Path to local flag image (when available)
- **flagDescription** - Description of the flag design

## Example Usage

```bash
# Get all provinces as JSON
curl http://localhost:3000/provinces

# Get all territories as JSON
curl http://localhost:3000/territories

# View provinces in browser
open http://localhost:3000/provinces/html

# View territories in browser
open http://localhost:3000/territories/html

# Check API health
curl http://localhost:3000/health
```

## Data Files

Province and territory data are stored separately in:
- `db/provinces.json` - Contains all 10 Canadian provinces
- `db/territories.json` - Contains all 3 Canadian territories
- `db/flags/` - Directory for local flag images (optional)

## Features

- 🏛️ Detailed information about all Canadian provinces and territories
- 🏴 Flag descriptions and imagery
- 💚 Health check endpoint for monitoring
- 🎨 Beautiful, interactive web interface
- 📄 Dual format support: HTML pages and JSON API
- 🧭 Easy navigation between all endpoints
- 📦 Separate JSON data files for easy maintenance
- 🔒 Host header validation for security

