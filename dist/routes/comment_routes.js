"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment_controller");
const verification_1 = require("../middlewares/verification");
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter.post("/", verification_1.verifyAccessToken, comment_controller_1.createComment);
