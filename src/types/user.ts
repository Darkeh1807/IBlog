import { Document } from "mongoose";

export interface IUserSchema extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface ICreateUserInput {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface ISignUserInput {
    email: string;
    password: string;
}
