const sanitizeMongo = require('mongo-sanitize');

function sanitizeObject(projection) {
  const projectionObj = JSON.parse(projection);
  const trustedProjection = sanitizeMongo(projectionObj);
  return trustedProjection;
}

module.exports = sanitizeObject;
