"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QurbanSchema = new mongoose_1.Schema({
    qurban_id: String,
    name: String,
    qurban_type: String,
});
const BuyerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    handphone: {
        type: String,
        require: true,
    },
    qurban: {
        type: QurbanSchema,
        require: true,
    },
    desc: String,
    has_paid: {
        type: Boolean,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = (0, mongoose_1.model)('List_Buyer', BuyerSchema);
