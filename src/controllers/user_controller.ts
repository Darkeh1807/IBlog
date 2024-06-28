import { NextFunction, query, Request, Response } from "express"
import { ICreateUserInput, ISignUserInput, IUserSchema } from "../types/user";
import IResponse from "../types/response";
import * as bcrypt from 'bcrypt';
import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import consola from "consola";
import { bcryptImpl } from "../utils/bcrypt";

config()
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role }: ICreateUserInput = req.body;

    if (!name || !email || !password) {
        return res.status(400).json(new IResponse("error", "Make sure all fields are correct"));
    }

    if (role !== undefined && role !== "ADMIN") {
        return res.status(400).json(new IResponse("error", "role field must be 'ADMIN', if not specified, will be default to 'USER'"));
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser != null) {
            return res.status(400).json(new IResponse("error", "User already exists"));
        }

        //Hash Password
        const hashedPassword = await bcryptImpl.hashPassword(password);


        const uRole = role || "USER"; //Default to 'USER'

        const user = new User({
            name, email, password: hashedPassword, role: uRole,
        })

        const savedUser = await user.save();


        return res.status(201).json(new IResponse("success", "User saved successfully", savedUser));
    } catch (error) {
        next(error);
    }
};






export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: ISignUserInput = req.body;

    if (!email || !password) {
        return res.status(400).json(new IResponse("error", "Make sure all fields are correct"))
    }

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser === null) {
            return res.status(404).json(new IResponse("error", "User not found"))
        }

        const isPassMatch = await bcryptImpl.compare(password, existingUser.password);

        if (!isPassMatch) {
            return res.status(400).json(new IResponse("error", "Invalid user credentials"))
        }

        const uRole = existingUser.role;
        const payload = { email: existingUser.email, password: password, uRole };

        const secret = process.env.JWTSECRET ?? "";

        const token = jwt.sign(payload, secret, { expiresIn: "24h" });

        return res.header({ token: token }).status(200).json(new IResponse("success", "sign in success", existingUser, token));


    } catch (error) {
        next(error);
    }


}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { adminId } = req.query;

    if (!adminId) {
        return res.status(400).json(new IResponse("error", "Admin ID is required"));
    }

    try {

        const admin = await User.findById(adminId);
        if (!admin) {
            return res.status(404).json(new IResponse("error", "Admin does not exist"));
        }

        if (admin.role !== "ADMIN") {
            return res.status(401).json(new IResponse("error", "You aren't authorized for to this resource"));
        }


        const users = await User.find();
        return res.status(200).json(new IResponse("success", "Users returned", users))


    } catch (error) {
        next(error);
    }


}

export const getsingleUser = () => { }

export const deleteUserAccount = () => { }