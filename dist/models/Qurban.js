"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QurbanSchema = new mongoose_1.Schema({
    image: {
        photos: String,
        id: String,
    },
    name: {
        type: String,
        require: true,
    },
    weight: {
        type: String,
    },
    qurban_type: {
        type: String,
    },
    price: {
        type: Number,
    },
    quota: {
        type: Number,
    },
    desc: String,
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = (0, mongoose_1.model)('List_Qurban', QurbanSchema);
