import mongoose from "mongoose";

export interface ICommentSchema {
    content: string,
    commentedBy: mongoose.Types.ObjectId,
    blog: mongoose.Types.ObjectId,

}

export interface ICreateCommentInput {

}


