
import { Router } from "express";
import { createUser, signInUser } from "../controllers/user_controller";

export const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/signin", signInUser);
