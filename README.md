# Canada API Server

A simple Express API that provides detailed information about Canadian provinces and territories.

## Installation

```bash
npm install
```

## Running the Server

```bash
# Production
npm start

# Development with auto-reload
npm run dev
```

The server will start on port 3000 by default (or the port specified in the `PORT` environment variable).

## API Endpoints

- `GET /` - Interactive home page with links to all endpoints
- `GET /ui` - HTML interface with filtering (All/Provinces/Territories)
- `GET /provinces` - Get all Canadian provinces as JSON
- `GET /territories` - Get all Canadian territories as JSON
- `GET /health` - Health check endpoint for monitoring

## Data Structure

Each province and territory includes:
- **name** - Official name
- **capital** - Capital city
- **description** - 1-2 sentence overview
- **flagUrl** - URL to flag image on Wikimedia
- **flagDescription** - Description of the flag design

## Example Usage

```bash
# Get all provinces as JSON
curl http://localhost:3000/provinces

# Get all territories as JSON
curl http://localhost:3000/territories

# View interactive UI in browser
open http://localhost:3000/ui

# Check API health
curl http://localhost:3000/health
```

## Data Files

Province and territory data are stored separately in:
- `db/provinces.json` - Contains all 10 Canadian provinces
- `db/territories.json` - Contains all 3 Canadian territories

## Features

- 🌐 Interactive HTML interface with client-side filtering
- 📍 Detailed information about all Canadian provinces and territories
- 🏴 Flag descriptions and imagery (from Wikimedia)
- 💚 Health check endpoint for monitoring
- 🎨 Clean, simple UI design
- 📦 Separate JSON data files for easy maintenance
- 🔒 Host header validation for security
- 🔄 Auto-reload in development mode with nodemon

