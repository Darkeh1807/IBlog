import consola from "consola";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import { IUserSchema } from "../types/user";

config();

interface AuthRequest extends Request {
    user: IUserSchema;
}
export const verifyAccessToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined; //Token is either available or undefined
    token = req.headers.authorization?.split(" ")[1];
    consola.info(token);
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const secret = process.env.JWTSECRET ?? "";
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).send("Invalid token");
            }
            req.user = decoded;
        });
        next();
    } catch (error) {
        next(error);
    }

}