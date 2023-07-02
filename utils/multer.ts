import { File } from 'buffer';
import { Request } from 'express';
import { FileFilterCallback } from 'multer';

const multer = require('multer');
const path = require('path');

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});
