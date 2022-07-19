const sanitizeMongo = require('mongo-sanitize');

function sanitizeObject(projection) {
  if (!projection) return null;
  const projectionObj = JSON.parse(projection);
  const trustedProjection = sanitizeMongo(projectionObj);
  return trustedProjection;
}

module.exports = sanitizeObject;
