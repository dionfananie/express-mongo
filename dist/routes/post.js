"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../middleware/post");
const post_2 = require("../controllers/post");
const express = require('express');
const router = express.Router();
router.get('/', post_2.getPosts);
router.post('/', (0, post_1.validatePostType)(), post_2.insertPost);
exports.default = router;
