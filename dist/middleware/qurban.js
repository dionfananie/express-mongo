"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQurbanType = void 0;
const validateQurbanType = (schema) => (req, res, next) => {
    try {
        schema.parse({
            query: req.query,
        });
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: err });
    }
};
exports.validateQurbanType = validateQurbanType;
