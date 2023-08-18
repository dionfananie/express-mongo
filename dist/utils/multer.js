"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const path = require('path');
// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(null, false);
            return;
        }
        cb(null, true);
    },
});
