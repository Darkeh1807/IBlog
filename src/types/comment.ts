import mongoose from "mongoose";

export interface ICommentSchema {
    content: string,
    commentedBy: mongoose.Types.ObjectId,
    blog: mongoose.Types.ObjectId,

}

export interface ICreateCommentInput {
    userId: mongoose.Types.ObjectId,
    blogId: mongoose.Types.ObjectId,
    content: string,
}


