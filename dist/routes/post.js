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
const Post = require('../models/Post');
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id || 0;
    try {
        if (id) {
            const posts = yield Post.findById(id);
            res.json(posts);
        }
        else {
            const posts = yield Post.find();
            res.json(posts);
        }
    }
    catch (error) {
        console.error(error);
        res.json({ message: error });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Post({
        title: req.body.title,
        desc: req.body.desc,
    });
    const savePost = yield post.save();
    res.json(savePost);
}));
exports.default = router;
