import { Router } from "express";
import { createBlog, deleteBlog, getBlogs, getSingleBlog, updateBlog } from "../controllers/blog_controller";
import { verifyAccessToken } from "../middlewares/verification";


export const blogRouter = Router();

blogRouter.post("/", verifyAccessToken, createBlog);
blogRouter.get("/", getBlogs);
blogRouter.put("/", verifyAccessToken, updateBlog);
blogRouter.get("/:blogId", getSingleBlog);
blogRouter.delete("/", verifyAccessToken, deleteBlog);

