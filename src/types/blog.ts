import { Document, Types } from "mongoose";

export interface IBlogSchema extends Document {
    title: string;
    description: string;
    createdBy: Types.ObjectId;
}

export interface ICreateBlogInput {
    title: string;
    description: string;
    createdBy: string;
}

export interface IUpdateBlogInput {
    blogId: string;
    title: string;
    description: string;
    userId: string;
}
