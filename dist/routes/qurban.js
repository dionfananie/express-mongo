"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qurban_1 = require("../middleware/qurban");
const qurban_2 = require("../controllers/qurban");
const qurban_3 = require("../schemas/qurban");
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
router.get('/', qurban_2.getAllQurban);
/**
 * function create qurban sapi
 */
router.post('/', upload.single('image'), qurban_2.addQurban);
router.put('/', qurban_2.updateQurban);
router.delete('/', qurban_2.deleteQurban);
/**
 * Function Qurban Type
 *
 */
router.post('/type', qurban_2.postType);
router.get('/type', (0, qurban_1.validateQurbanType)(qurban_3.qurbanTypeSchema), qurban_2.getType);
router.delete('/type', qurban_2.deleteType);
exports.default = router;
