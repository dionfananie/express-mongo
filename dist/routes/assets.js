"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ text: 'hello' });
    }
    catch (error) {
        console.error(error);
        res.json({ message: error });
    }
}));
router.get('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id || 0;
        const { result } = yield cloudinary.uploader.destroy(id);
        if (result === 'ok') {
            res.json({ is_success: 1, message: `Success delete assets` });
            return;
        }
        res.json({ is_success: 0, message: 'Failed delete assets' });
    }
    catch (error) {
        console.error(error);
    }
}));
module.exports = router;
