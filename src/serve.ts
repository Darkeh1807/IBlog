import express, { NextFunction, Request, Response } from "express"
import { config } from "dotenv"
import dbConnection from "./DB/connect_db";
import consola from "consola";
import { userRouter } from "./routes/user_routes";
import { blogRouter } from "./routes/blog_routes";
import { commentRouter } from "./routes/comment_routes";
import IResponse from "./types/response";


config()

const PORT = 3500 || process.env.PORT;

const app = express()

app.use(express.json());



app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);


app.use((error: any, req: Request, res: Response, next: NextFunction) => {

    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.status || 500;
    res.status(statusCode);

    return res.json(new IResponse("error", error.message));
});


export const serve = dbConnection.then(() => {
    app.listen(PORT, () => {
        consola.success(`Server has started running on port ${PORT}`);
    });
}).catch((e) => {
    consola.error(e);
})


