"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
function connectMongo() {
    const mongoUrl = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
    mongoose.connect(mongoUrl, { useNewUrlParser: true }, () => {
        console.log('connected to DB Mongo Atlas!');
    });
}
exports.default = connectMongo;
