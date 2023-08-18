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
exports.postType = exports.deleteType = exports.getType = exports.updateQurban = exports.addQurban = exports.deleteQurban = exports.getAllQurban = void 0;
const Qurban_1 = __importDefault(require("../models/Qurban"));
const QurbanType_1 = __importDefault(require("../models/QurbanType"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const sanitizeObject_1 = __importDefault(require("../helpers/sanitizeObject"));
const getAllQurban = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, projection } = req.query;
    const _projection = projection || '';
    const trustedProjection = (0, sanitizeObject_1.default)(_projection);
    try {
        const qurbanList = yield Qurban_1.default.findById(id);
        if (id && qurbanList) {
            res.json(qurbanList);
            return;
        }
        else {
            const qurbanList = yield Qurban_1.default.find({}, trustedProjection).sort({ date: -1 });
            if (qurbanList)
                res.json(qurbanList);
        }
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error });
    }
});
exports.getAllQurban = getAllQurban;
const deleteQurban = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id || 0;
        const qurban = yield Qurban_1.default.findById(id);
        const { image } = qurban || {};
        const { deletedCount } = yield Qurban_1.default.deleteOne({ _id: id });
        if (deletedCount > 0) {
            const { id: publicId } = image || {};
            if (publicId) {
                const { result } = yield cloudinary_1.default.uploader.destroy(publicId);
                if (result === 'ok') {
                    res.json({ is_success: 1, message: `Success delete Qurban data` });
                    return;
                }
            }
            res.json({ is_success: 1, message: `Success delete Qurban data` });
            return;
        }
        res.json({ is_success: 0, message: `Failed delete Qurban data` });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error });
    }
});
exports.deleteQurban = deleteQurban;
const addQurban = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        const result = yield cloudinary_1.default.uploader.upload(req.file.path, { use_filename: true, unique_filename: false });
        const qurban = new Qurban_1.default({
            image: { photos: result.secure_url || '', id: result.public_id || '' },
            name: req.body.name,
            weight: req.body.weight,
            qurban_type: req.body.qurban_type,
            price: req.body.price,
            desc: req.body.desc,
            quota: req.body.quota,
        });
        yield qurban.save();
        res.json({ is_success: 1, message: `Success add Qurban data` });
    }
    catch (error) {
        console.error(error);
    }
});
exports.addQurban = addQurban;
const updateQurban = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id || 0;
    const total = Number(req.query.total) || 0;
    try {
        if (id) {
            const qurbanUpdated = yield Qurban_1.default.findOneAndUpdate({ _id: id }, { $inc: { quota: total * -1 } }, { new: true });
            res.json(qurbanUpdated);
        }
        else {
            const qurbanUpdated = yield Qurban_1.default.find();
            res.json(qurbanUpdated);
        }
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error });
    }
});
exports.updateQurban = updateQurban;
const getType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id || '';
    const typeQurban = req.query.type || '';
    try {
        if (id) {
            const qurbanType = yield QurbanType_1.default.findById(id);
            res.json(qurbanType);
        }
        else if (typeQurban) {
            const qurbanType = yield QurbanType_1.default.find({ type: typeQurban });
            res.json(qurbanType);
        }
        else {
            const qurbanType = yield QurbanType_1.default.find();
            res.json(qurbanType);
        }
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error });
    }
});
exports.getType = getType;
const deleteType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id || 0;
        const resp = yield QurbanType_1.default.deleteOne({ _id: id });
        if (resp.deletedCount > 0) {
            res.json({ is_success: 1, message: `Success delete Tipe Qurban` });
            return;
        }
        res.json({ is_success: 0, message: `Failed delete Tipe Qurban` });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error });
    }
});
exports.deleteType = deleteType;
const postType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const qurban = new QurbanType_1.default({
            name: req.body.name,
            type: req.body.type,
        });
        yield qurban.save();
        res.json({ is_success: 1, message: `Success add Qurban type` });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: error });
    }
});
exports.postType = postType;
