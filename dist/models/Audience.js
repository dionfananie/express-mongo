"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdmPriceSchema = new mongoose_1.Schema({
    price: {
        type: Number,
        require: true,
    },
    desc: String,
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = (0, mongoose_1.model)('adm_price', AdmPriceSchema);
