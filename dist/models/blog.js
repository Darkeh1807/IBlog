"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const blogSchema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    description: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    createdBy: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
});
blogSchema.plugin(mongoose_paginate_v2_1.default);
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.Blog = Blog;
