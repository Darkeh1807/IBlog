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
exports.deleteBlog = exports.updateBlog = exports.getSingleBlog = exports.getBlogs = exports.createBlog = void 0;
const response_1 = __importDefault(require("../types/response"));
const user_1 = require("../models/user");
const blog_1 = require("../models/blog");
const mongoose_1 = require("mongoose");
const consola_1 = __importDefault(require("consola"));
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, createdBy } = req.body;
    if (!title || !description || !createdBy) {
        return res.status(400).json(new response_1.default("error", "Make sure all fields are correct"));
    }
    if (!mongoose_1.Types.ObjectId.isValid(createdBy)) {
        return res.status(400).json(new response_1.default("error", "Invalid user ID"));
    }
    try {
        const user = yield user_1.User.findById(createdBy);
        if (!user) {
            return res.status(404).json(new response_1.default("error", "Admin does not exist"));
        }
        if (user.role !== "ADMIN") {
            return res.status(401).json(new response_1.default("error", "You aren't permitted to create blogs"));
        }
        const blog = new blog_1.Blog({ title, description, createdBy });
        const savedBlog = yield blog.save();
        return res.status(201).json(new response_1.default("success", "Blog saved successfully", savedBlog));
    }
    catch (error) {
        next(error);
    }
});
exports.createBlog = createBlog;
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { populate, page, limit } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        populate: populate ? populate.toString() : "",
    };
    try {
        const blogs = yield blog_1.Blog.paginate({}, options);
        if (!blogs || blogs === null) {
            return res.status(404).json(new response_1.default("error", "No blogs found"));
        }
        return res.status(200).json(new response_1.default("success", "Rerieved successfully", blogs));
    }
    catch (error) {
        next(error);
    }
});
exports.getBlogs = getBlogs;
const getSingleBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogId } = req.params;
        consola_1.default.info(req.user);
        if (!blogId) {
            return res.status(400).json(new response_1.default("error", "Make sure Blog id is provided"));
        }
        if (!mongoose_1.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json(new response_1.default("error", "Invalid user ID"));
        }
        const blog = yield blog_1.Blog.findById(blogId);
        if (!blog) {
            return res.status(400).json(new response_1.default("error", "No blog found with that id"));
        }
        return res.status(200).json(new response_1.default("success", "Blog retrieved successfully", blog));
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleBlog = getSingleBlog;
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, title, description, userId } = req.body;
    if (!blogId || !userId) {
        return res.status(400).json(new response_1.default("error", "Make sure Blog id and User id are provided"));
    }
    if (!title && !description) {
        return res.status(400).json(new response_1.default("error", "Title or description is required"));
    }
    if (!mongoose_1.Types.ObjectId.isValid(userId)) {
        return res.status(400).json(new response_1.default("error", "Invalid user ID"));
    }
    try {
        const blog = yield blog_1.Blog.findById(blogId);
        if ((blog === null || blog === void 0 ? void 0 : blog.createdBy.toString()) !== userId) {
            return res.status(400).json(new response_1.default("error", "You aren't authorized to update this blog"));
        }
        const updatedBlog = yield blog_1.Blog.findByIdAndUpdate(blogId, { title, description }, { new: true, runValidators: true });
        if (!updatedBlog) {
            return res.status(404).json(new response_1.default("error", "Blog bot found"));
        }
        return res.status(200).json(new response_1.default("success", "Blog updated successfully", updatedBlog));
    }
    catch (error) {
        next(error);
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId, userId } = req.query;
    if (!blogId || !userId) {
        return res.status(400).json(new response_1.default("error", "BlogId and UserId are required"));
    }
    if (!mongoose_1.Types.ObjectId.isValid(blogId) || !mongoose_1.Types.ObjectId.isValid(userId))
        return res.status(400).json(new response_1.default("error", "Make sure userId or blogId is valid"));
    try {
        const user = yield user_1.User.findById(userId);
        if (!user)
            return res.status(404).json(new response_1.default("error", "User not found"));
    }
    catch (error) {
    }
});
exports.deleteBlog = deleteBlog;
