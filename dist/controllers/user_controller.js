"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUserAccount = exports.getsingleUser = exports.getUsers = exports.signInUser = exports.createUser = void 0;
const response_1 = __importDefault(require("../types/response"));
const bcrypt = __importStar(require("bcrypt"));
const user_1 = require("../models/user");
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json(new response_1.default("error", "Make sure all fields are correct"));
    }
    if (role !== undefined && role !== "ADMIN") {
        return res.status(400).json(new response_1.default("error", "role field must be 'ADMIN', Default:'USER'"));
    }
    try {
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser != null) {
            return res.status(400).json(new response_1.default("error", "User already exists"));
        }
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const uRole = role || "USER";
        const user = new user_1.User({
            name, email, password: hashedPassword, role: uRole,
        });
        const savedUser = yield user.save();
        return res.status(201).json(new response_1.default("success", "User saved successfully", savedUser));
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json(new response_1.default("error", "Make sure all fields are correct"));
    }
    try {
        const existingUser = yield user_1.User.findOne({ email });
        if (existingUser === null) {
            return res.status(400).json(new response_1.default("error", "User not found"));
        }
        const isPassMatch = yield bcrypt.compare(password, existingUser.password);
        if (!isPassMatch) {
            return res.status(400).json(new response_1.default("error", "Invalid user credentials"));
        }
        const uRole = existingUser.role;
        const payload = { email: existingUser.email, password: password, uRole };
        const secret = (_a = process.env.JWTSECRET) !== null && _a !== void 0 ? _a : "";
        const token = jwt.sign(payload, secret, { expiresIn: "24h" });
        return res.header({ token: token }).status(200).json(new response_1.default("success", "sign in success", existingUser, token));
    }
    catch (error) {
        next(error);
    }
});
exports.signInUser = signInUser;
const getUsers = () => { };
exports.getUsers = getUsers;
const getsingleUser = () => { };
exports.getsingleUser = getsingleUser;
const deleteUserAccount = () => { };
exports.deleteUserAccount = deleteUserAccount;
