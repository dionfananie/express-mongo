"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostData = void 0;
const zod_1 = require("zod");
exports.PostData = zod_1.z.object({
    title: zod_1.z.string(),
    desc: zod_1.z.string().min(10),
});
