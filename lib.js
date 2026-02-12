const path = require('path');
const fs = require('fs');

// Get Base URL for quick links
function getBaseUrl(req) {
    const PORT = process.env.PORT || 3003;
    const host = req.get('x-forwarded-host') || req.get('host');
    const allowedHostPattern = /^(localhost|127\.0\.0\.1)(:\d+)?$|^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!host || !allowedHostPattern.test(host)) {
        return `${req.protocol}://localhost:${PORT}`;
    }

    return `${req.protocol}://${host}`;
}

// Load data from JSON file
function getData(jsonPath) {
    try {
        const dataPath = path.join(__dirname, jsonPath);
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        return data;
    } catch (error) {
        console.error(`Error reading data file from: ${jsonPath}`, error.message);
        return [];
    }
}

// Exports
module.exports = {
    getBaseUrl,
    getData,
};
