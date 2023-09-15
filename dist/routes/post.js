"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../controllers/post");
const auth_1 = __importDefault(require("../middleware/auth"));
const post_2 = require("../middleware/post");
const express = require('express');
const router = express.Router();
router.get('/', post_1.getPosts);
router.post('/', auth_1.default, post_2.validatePostType, post_1.insertPost);
exports.default = router;
