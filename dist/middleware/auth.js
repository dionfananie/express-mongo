"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
function validateAuth(req, res, next) {
    var _a;
    try {
        const token = req.header('Authorization');
        if (!token)
            return res.status(401).send({ success: false, message: 'Access Denied. No authorization!' });
        const tokenValue = ((_a = token.split(' ')) === null || _a === void 0 ? void 0 : _a[1]) || '';
        const verified = jwt.verify(tokenValue, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send({ success: false, message: error });
    }
}
exports.default = validateAuth;
