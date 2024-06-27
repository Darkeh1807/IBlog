import { model, Schema, SchemaTypes,Document,PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IBlogSchema } from '../types/blog';

interface BlogDocument extends IBlogSchema, Document {}
interface BlogModel extends PaginateModel<BlogDocument> {}

const blogSchema = new Schema<IBlogSchema>({
    title: {
        type: SchemaTypes.String,
        required: true,
    },
    description: {
        type: SchemaTypes.String,
        required: true,
    },
    createdBy: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
});


blogSchema.plugin(mongoosePaginate);

const Blog = model<BlogDocument, BlogModel>('Blog', blogSchema);
export { Blog };
