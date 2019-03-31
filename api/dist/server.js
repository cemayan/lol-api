#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const GameController_1 = __importDefault(require("./controller/GameController"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    "extended": false,
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use('/gamedata', GameController_1.default);
http_1.default.createServer(app).listen(3000);
module.exports = app;
//# sourceMappingURL=server.js.map