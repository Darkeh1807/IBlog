import { Router } from "express";
import { userRouter } from "./user_routes";

export const myrouter = Router();

myrouter.use("/api/user", userRouter);




