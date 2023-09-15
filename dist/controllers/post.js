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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPost = exports.getPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id || 0;
    try {
        if (id) {
            const posts = yield Post_1.default.findById(id);
            res.json(posts);
        }
        else {
            const posts = yield Post_1.default.find();
            res.json(posts);
        }
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error });
    }
});
exports.getPosts = getPosts;
const insertPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Post_1.default({
        title: req.body.title,
        desc: req.body.desc,
    });
    const savePost = yield post.save();
    console.log('savePost: ', savePost);
    res.json(savePost);
});
exports.insertPost = insertPost;
