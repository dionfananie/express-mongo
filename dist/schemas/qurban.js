"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qurbanTypeSchema = void 0;
const zod_1 = require("zod");
const payload = {
    query: (0, zod_1.object)({ id: (0, zod_1.string)().optional(), type: (0, zod_1.string)().optional() }),
};
exports.qurbanTypeSchema = (0, zod_1.object)(Object.assign({}, payload));
