import express, { NextFunction, Request, Response } from "express"
import { config } from "dotenv"
import dbConnection from "./DB/connect_db";
import consola from "consola";
import { notFoundErrorHandler, errorHandler } from "./middlewares/error_handler";
import { router } from "./routes/main_route";


config()

const PORT = 3500 || process.env.PORT;

const app = express()

app.use(express.json());
app.use(router)
app.use(notFoundErrorHandler);
app.use(errorHandler);


export const serve = dbConnection.then(() => {
    app.listen(PORT, () => {
        consola.success(`Server has started running on port ${PORT}`);
    });
}).catch((e) => {
    consola.error(e);
})


