"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    hash_password: {
        type: String,
        required: true,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};
exports.default = (0, mongoose_1.model)('User', UserSchema);
