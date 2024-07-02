"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const verifyAccessToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header("authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const secret = process.env.JWTSECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next(decoded);
    }
    catch (error) {
        return res.status(500).send("Invalid token");
    }
};
exports.verifyAccessToken = verifyAccessToken;
