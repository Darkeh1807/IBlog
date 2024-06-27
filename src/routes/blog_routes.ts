import { Router } from "express";
import { createBlog, getBlogs, updateBlog } from "../controllers/blog_controller";
import { verifyAccessToken } from "../middlewares/verification";


export const blogRouter = Router();

blogRouter.post("/", createBlog);
blogRouter.get("/", getBlogs);
blogRouter.put("/", updateBlog);

