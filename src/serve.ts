import express, { NextFunction, Request, Response } from "express"
import { config } from "dotenv"
import dbConnection from "./DB/connect_db";
import consola from "consola";
import { userRouter } from "./routes/user_routes";
import { blogRouter } from "./routes/blog_routes";
import { commentRouter } from "./routes/comment_routes";
import IResponse from "./types/response";
import { notFoundErrorHandler, errorHandler } from "./middlewares/error_handler";


config()

const PORT = 3500 || process.env.PORT;

const app = express()

app.use(express.json());



app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);


app.use(notFoundErrorHandler);
app.use(errorHandler);


export const serve = dbConnection.then(() => {
    app.listen(PORT, () => {
        consola.success(`Server has started running on port ${PORT}`);
    });
}).catch((e) => {
    consola.error(e);
})


