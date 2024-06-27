import { Router } from "express";
import { createBlog, getBlogs } from "../controllers/blog_controller";


export const blogRouter = Router();

blogRouter.post("/", createBlog);
blogRouter.get("/", getBlogs)