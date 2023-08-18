"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
var whitelist = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
const corsSetting = cors({
    credentials: true,
    origin: function (origin, callback) {
        const originUrl = origin || whitelist;
        if (whitelist.indexOf(originUrl) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
});
exports.default = corsSetting;
