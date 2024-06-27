import { SchemaTypes, Schema, model } from "mongoose";
import { IUserSchema } from "../types/user";

const UserSchema = new Schema<IUserSchema>({
    name: {
        type: SchemaTypes.String,
        required: true,
    },

    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    role: {
        type: SchemaTypes.String,
    }

}, {
    timestamps: true
})



export const User = model<IUserSchema>("User", UserSchema);

