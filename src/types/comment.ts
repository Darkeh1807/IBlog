import { Document, Types } from "mongoose";

export interface ICommentSchema extends Document {
    content: string;
    commentedBy: Types.ObjectId;
    blog: Types.ObjectId;
}

export interface ICreateCommentInput {
    userId: Types.ObjectId;
    blogId: Types.ObjectId;
    content: string;
}
