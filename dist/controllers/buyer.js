"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaid = exports.deleteBuyer = exports.postBuyer = exports.getAllBuyer = void 0;
const zod_1 = require("zod");
const Buyer_1 = __importDefault(require("../models/Buyer"));
const Qurban_1 = __importDefault(require("../models/Qurban"));
const sanitizeObject_1 = __importDefault(require("../helpers/sanitizeObject"));
const buyer_1 = __importDefault(require("../validation/buyer"));
const getAllBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, qurbanId, projection } = req.query;
    const _projection = projection || '';
    const trustedProjection = (0, sanitizeObject_1.default)(_projection);
    try {
        if (id) {
            const buyerData = yield Buyer_1.default.findById(id).sort({ date: -1 });
            res.json(buyerData);
        }
        if (qurbanId) {
            const buyerData = yield Buyer_1.default.find({ qurbanId: qurbanId }).sort({ date: -1 });
            res.json(buyerData);
        }
        else {
            const buyerData = yield Buyer_1.default.find({}, trustedProjection).sort({ date: -1 });
            res.json(buyerData);
        }
    }
    catch (error) {
        console.error(error);
        res.json({ message: error });
    }
});
exports.getAllBuyer = getAllBuyer;
const postBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = buyer_1.default.parse(req.body);
        if (validatedData) {
            const { name, address, handphone, qurban, description, hasPaid } = req.body;
            const parsedQurban = JSON.parse(qurban);
            const qurbanId = parsedQurban.qurban_id;
            const buyer = new Buyer_1.default({
                name: name,
                address: address,
                handphone: handphone,
                qurban: parsedQurban,
                desc: description,
                has_paid: hasPaid,
            });
            const resp = yield buyer.save();
            if (qurbanId && resp.name) {
                yield Qurban_1.default.findByIdAndUpdate(qurbanId, { $inc: { quota: -1 } }, { new: true });
            }
            res.json({ is_success: 1, message: `Success add Qurban's buyer` });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return { is_success: 0, message: error.flatten() };
        }
        else
            res.json({ is_success: 0, message: error });
    }
});
exports.postBuyer = postBuyer;
const deleteBuyer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id || 0;
        if (!id) {
            res.json({ is_success: 0, message: `Need Id` });
            return;
        }
        const resp = yield Buyer_1.default.deleteOne({ _id: id });
        if (resp.deletedCount > 0) {
            res.json({ is_success: 1, message: `Success delete Buyer data` });
            return;
        }
        res.json({ is_success: 0, message: `Failed delete Buyer data` });
    }
    catch (error) {
        console.error(error);
        res.json({ message: error });
    }
});
exports.deleteBuyer = deleteBuyer;
const updatePaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id || 0;
    try {
        if (id) {
            yield Buyer_1.default.findByIdAndUpdate(id, { has_paid: true }, { new: true });
            res.json({ is_success: 1, message: 'Berhasil mengupdate kelunasan' });
            return;
        }
        res.json({ is_success: 0, message: 'Gagal mengupdate kelunasan' });
    }
    catch (error) {
        console.error(error);
        res.json({ message: error });
    }
});
exports.updatePaid = updatePaid;
