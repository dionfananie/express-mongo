"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const Qurban = zod_1.z.object({ qurban_id: zod_1.z.string(), name: zod_1.z.string(), qurban_type: zod_1.z.string() });
const BuyerData = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string().min(3),
    handphone: zod_1.z.number(),
    qurban: Qurban,
    desc: zod_1.z.string().nullable(),
    hasPaid: zod_1.z.boolean().default(false),
    date: zod_1.z.date(),
});
exports.default = BuyerData;
