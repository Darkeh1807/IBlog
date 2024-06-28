"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
// Define the Mongoose schema and add pagination plugin
const commentSchema = new mongoose_1.Schema({
    content: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    commentedBy: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    blog: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "Blog",
        required: true,
    }
}, {
    timestamps: true
});
// Apply pagination plugin to the schema
commentSchema.plugin(mongoose_paginate_v2_1.default);
// Export the Comment model
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
