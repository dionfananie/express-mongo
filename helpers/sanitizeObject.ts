const sanitizeMongo = require('mongo-sanitize');

function sanitizeObject(projection: string) {
  if (!projection) return null;
  const projectionObj = JSON.parse(projection);
  const trustedProjection = sanitizeMongo(projectionObj);
  return trustedProjection;
}

module.exports = sanitizeObject;
