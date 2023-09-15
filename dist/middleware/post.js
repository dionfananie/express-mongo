"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePostType = void 0;
const post_1 = require("../validation/post");
const validatePostType = () => (req, res, next) => {
    try {
        post_1.PostData.parse(req.body);
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: err });
    }
};
exports.validatePostType = validatePostType;
