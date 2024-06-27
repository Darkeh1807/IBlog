"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog_controller");
exports.blogRouter = (0, express_1.Router)();
exports.blogRouter.post("/", blog_controller_1.createBlog);
exports.blogRouter.get("/", blog_controller_1.getBlogs);
