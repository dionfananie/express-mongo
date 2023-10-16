"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const corsSetting_1 = __importDefault(require("./utils/corsSetting"));
const fs = require('fs');
const bodyParser = require('body-parser');
const https = require('https');
// import routes
const post_1 = __importDefault(require("./routes/post"));
const buyer_1 = __importDefault(require("./routes/buyer"));
const qurban_1 = __importDefault(require("./routes/qurban"));
const auth_1 = __importDefault(require("./routes/auth"));
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const connectMongo_1 = __importDefault(require("./utils/connectMongo"));
const key = fs.readFileSync('./cert/localhost-key.pem', 'utf-8');
const cert = fs.readFileSync('./cert/localhost.pem', 'utf-8');
const app = (0, express_1.default)();
app.use(corsSetting_1.default);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));
app.use('/post', post_1.default);
app.use('/qurban', qurban_1.default);
app.use('/buyer', buyer_1.default);
app.use('/auth', auth_1.default);
// connect to DB
(0, connectMongo_1.default)();
app.get('/', (_req, res) => {
    res.send('Welcome to express mongo in dionfananie.my.id');
});
const activePort = constants_1.PORT;
// app.listen(activePort, () => {
//   console.log(`Listening on port ${PORT}...`);
// });
const server = https.createServer({ key: key, cert: cert }, app);
server.listen(activePort, () => {
    console.log(`listening on ${activePort}`);
});
