"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanitizeMongo = require('mongo-sanitize');
function sanitizeObject(projection) {
    if (!projection)
        return null;
    const projectionObj = JSON.parse(projection);
    const trustedProjection = sanitizeMongo(projectionObj);
    return trustedProjection;
}
exports.default = sanitizeObject;
