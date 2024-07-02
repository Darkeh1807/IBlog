import { Router } from "express";
import { userRouter } from "./user_routes";
import { blogRouter } from "./blog_routes";
import { commentRouter } from "./comment_routes";

export const router = Router();

router.use("/api/user", userRouter);
router.use("/api/blog", blogRouter);
router.use("/api/comment", commentRouter);




