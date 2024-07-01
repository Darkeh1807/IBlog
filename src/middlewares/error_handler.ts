import { NextFunction, Request, Response } from "express";
import IResponse from "../types/response";


class NotFoundError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.status = 404;
    }
}

 const notFoundErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const notFound = new NotFoundError("Not Found");
    next(notFound);
};

 const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }

    const statusCode = (error as any).status || 500; // Ensure status is a number


    res.status(statusCode).json(new IResponse(`${error.name}`, `${error.message}`));
};


export {notFoundErrorHandler, errorHandler}