"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const auth_1 = require("../controllers/auth");
const router = express.Router();
router.post('/signin', auth_1.signIn);
router.post('/signup', auth_1.signUp);
exports.default = router;
