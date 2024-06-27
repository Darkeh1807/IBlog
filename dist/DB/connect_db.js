"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
const consola_1 = __importDefault(require("consola"));
(0, dotenv_1.config)();
const MONGOURL = (_a = process.env.MONGOURL) !== null && _a !== void 0 ? _a : "";
//Establish and handle db connection
const dbConnection = (0, mongoose_1.connect)(MONGOURL).then(() => {
    consola_1.default.success("DB connection establieshed");
    return mongoose_1.connection;
}).catch((e) => {
    consola_1.default.error(e);
    return e;
});
exports.default = dbConnection;
