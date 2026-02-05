# Canada API Server

A simple Express API that provides information about Canadian provinces and territories.

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

- `GET /` - Welcome message with available endpoints
- `GET /provinces` - Get all Canadian provinces
- `GET /territories` - Get all Canadian territories

## Example Usage

```bash
# Get all provinces
curl http://localhost:3000/provinces

# Get all territories
curl http://localhost:3000/territories
```

