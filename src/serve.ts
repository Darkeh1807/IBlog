import express from "express"
import { config } from "dotenv"
import dbConnection from "./DB/connect_db";
import consola from "consola";
import { userRouter } from "./routes/user_routes";
import { blogRouter } from "./routes/blog_routes";


config()

const PORT = 3500 || process.env.PORT;

const app = express()

app.use(express.json());



app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

export const serve = dbConnection.then(() => {
    app.listen(PORT, () => {
        consola.success(`Server has started running on port ${PORT}`);
    });
}).catch((e) => {
    consola.error(e);
})


