import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";

config();



export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied");
    }

    try {
        const secret = process.env.JWTSECRET as Secret;
        const decoded = jwt.verify(token, secret);
        req.user = decoded;

        next(decoded);
    } catch (error) {
        return res.status(500).send("Invalid token");
    }
};

