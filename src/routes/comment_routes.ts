import { Router } from "express";
import { createComment } from "../controllers/comment_controller";
import { verifyAccessToken } from "../middlewares/verification";

export const commentRouter = Router();

commentRouter.post("/", verifyAccessToken, createComment);