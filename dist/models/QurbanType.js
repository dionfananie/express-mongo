"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QurbanTypeSchema = new mongoose_1.Schema({
    type: {
        type: String,
        require: true,
    },
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = (0, mongoose_1.model)('Qurban_Type', QurbanTypeSchema);
