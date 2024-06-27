import { NextFunction, Request, Response } from "express"
import { IBlogSchema, IUpdateBlogInput } from "../types/blog"
import IResponse from "../types/response";
import { User } from "../models/user";
import { Blog } from "../models/blog";
import { IUserSchema } from "../types/user";
import { Types } from "mongoose";





export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, createdBy }: IBlogSchema = req.body;

    if (!title || !description || !createdBy) {
        return res.status(400).json(new IResponse("error", "Make sure all fields are correct"));
    }

    if (!Types.ObjectId.isValid(createdBy)) {
        return res.status(400).json(new IResponse("error", "Invalid user ID"));
    }

    try {
        const user = await User.findById(createdBy);

        if (!user) {
            return res.status(404).json(new IResponse("error", "Admin does not exist"));
        }

        if (user.role !== "ADMIN") {
            return res.status(401).json(new IResponse("error", "You aren't permitted to create blogs"));
        }

        const blog = new Blog({ title, description, createdBy });
        const savedBlog = await blog.save();

        return res.status(201).json(new IResponse("success", "Blog saved successfully", savedBlog));
    } catch (error) {
        next(error);
    }
};

export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    const { populate, page, limit } = req.query;
    const options = {
        page: parseInt(page as string, 10) || 1,
        limit: parseInt(limit as string, 10) || 10,
        populate: populate ? populate.toString() : "",
    }
    try {
        const blogs = await Blog.paginate({}, options);

        if (!blogs || blogs === null) {
            return res.status(404).json(new IResponse("error", "No blogs found"));
        }

        return res.status(200).json(new IResponse("success", "Rerieved successfully", blogs))
    } catch (error) {
        next(error);
    }
}

export const getSingleBlog = () => { }

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    const { blogId, title, description, userId }: IUpdateBlogInput = req.body;
    if (!blogId || !userId) {
        return res.status(400).json(new IResponse("error", "Make sure Blog id and User id are provided"));
    }

    if (!title && !description) {
        return res.status(400).json(new IResponse("error", "Title or description is required"));
    }

    if (!Types.ObjectId.isValid(userId)) {
        return res.status(400).json(new IResponse("error", "Invalid user ID"));
    }
    try {
        const blog = await Blog.findById(blogId);
        if (blog?.createdBy.toString() !== userId) {
            return res.status(400).json(new IResponse("error", "You aren't authorized to delete this blog"));
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, description }, { new: true, runValidators: true });

        if (!updatedBlog) {
            return res.status(404).json(new IResponse("error", "Blog bot found"))
        }
        return res.status(200).json(new IResponse("success", "Blog updated successfully", updatedBlog));
    } catch (error) {
        next(error);
    }
}

export const deleteBlog = () => { }