import mongoose from "mongoose";

export interface IBlogSchema {
    title: string,
    description: string,
    createdBy: mongoose.Types.ObjectId;
}


export interface ICreateBlogInput {
    title: string,
    description: string,
    createdBy: string,
}

export interface IUpdateBlogInput{
    blogId:string,
    title:string,
    description:string,
    userId :string,
}

