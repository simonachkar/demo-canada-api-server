// Utility helpers for the Canada API server
function getBaseUrl(req) {
  const PORT = process.env.PORT || 3003;
  const host = req.get('x-forwarded-host') || req.get('host');
  const allowedHostPattern = /^(localhost|127\.0\.0\.1)(:\d+)?$|^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!host || !allowedHostPattern.test(host)) {
    return `${req.protocol}://localhost:${PORT}`;
  }

  return `${req.protocol}://${host}`;
}

module.exports = {
  getBaseUrl,
};
