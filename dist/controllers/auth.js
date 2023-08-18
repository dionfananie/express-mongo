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
exports.signIn = exports.signUp = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            email: req.body.email,
        });
        if (user)
            return res.json({ message: 'User already exist' });
        const newUser = yield new User_1.default(req.body);
        newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
        const resp = yield newUser.save();
        return res.json({ email: resp.email, name: resp.name });
    }
    catch (error) {
        console.error(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            email: req.body.email,
        });
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication Failed. Invalid User Email or Password' });
        }
        const jwtToken = jwt.sign({ email: user.email, name: user.name, _id: user._id }, process.env.TOKEN_SECRET);
        return res.json({ token: jwtToken });
    }
    catch (error) {
        console.error(error);
    }
});
exports.signIn = signIn;
