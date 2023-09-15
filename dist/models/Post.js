"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    desc: String,
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = (0, mongoose_1.model)('Post', PostSchema);
