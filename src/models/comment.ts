import { model, Schema, SchemaTypes, Document, PaginateModel } from "mongoose";
import { ICommentSchema } from "../types/comment";
import mongoosePaginate from 'mongoose-paginate-v2';

interface CommenDocument extends ICommentSchema, Document { };
interface CommentModel extends PaginateModel<CommenDocument> { };

const commentSchema = new Schema<ICommentSchema>({
    content: {
        type: SchemaTypes.String,
        required: true
    },

    commentedBy: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },

    blog: {
        type: SchemaTypes.ObjectId,
        ref: "Blog",
        required: true,
    }
}, {
    timestamps: true
})

commentSchema.plugin(mongoosePaginate)


export const Comment = model<CommenDocument, CommentModel>("Comment", commentSchema);