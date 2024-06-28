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
exports.getCommentsForOne = exports.createComment = void 0;
const response_1 = __importDefault(require("../types/response"));
const mongoose_1 = require("mongoose");
const user_1 = require("../models/user");
const blog_1 = require("../models/blog");
const comment_1 = require("../models/comment");
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, blogId, content } = req.body;
    if (!userId || !blogId || !content) {
        return res.status(400).json(new response_1.default("error", "Make sure all fields are correct"));
    }
    if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json(new response_1.default("error", "Invalid user ID or blog ID"));
    }
    try {
        const user = yield user_1.User.findById(userId);
        if (!user) {
            return res.status(404).json(new response_1.default("error", "Admin does not exist"));
        }
        const blog = yield blog_1.Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json(new response_1.default("error", "Blog does not exist"));
        }
        const comment = new comment_1.Comment({ commentedBy: userId, blog: blogId, content });
        const savedComment = yield comment.save();
        return res.status(201).json(new response_1.default("success", "Comment saved successfully", savedComment));
    }
    catch (error) {
        next(error);
    }
});
exports.createComment = createComment;
const getCommentsForOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        next(error);
    }
});
exports.getCommentsForOne = getCommentsForOne;
