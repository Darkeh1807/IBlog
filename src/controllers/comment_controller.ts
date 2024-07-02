import { Request, Response, NextFunction } from "express"
import { ICommentSchema, ICreateCommentInput } from "../types/comment";
import IResponse from "../types/response";
import { Types } from "mongoose";
import { User } from "../models/user";
import { Blog } from "../models/blog";
import { Comment } from "../models/comment";



export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, blogId, content }: ICreateCommentInput = req.body;
 

    if (!userId || !blogId || !content) {
        return res.status(400).json(new IResponse("error", "Make sure all fields are correct"));
    }

    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(blogId)) {
        return res.status(400).json(new IResponse("error", "Invalid user ID or blog ID"));
    }
    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json(new IResponse("error", "Admin does not exist"));
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json(new IResponse("error", "Blog does not exist"));
        }

        const comment = new Comment({ commentedBy: userId, blog: blogId, content });

        const savedComment = await comment.save();

        return res.status(201).json(new IResponse("success", "Comment saved successfully", savedComment))

    } catch (error) {
        next(error);
    }
}


export const getCommentsForOne = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
}

