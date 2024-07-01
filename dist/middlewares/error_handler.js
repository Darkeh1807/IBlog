"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundErrorHandler = void 0;
const response_1 = __importDefault(require("../types/response"));
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}
const notFoundErrorHandler = (req, res, next) => {
    const notFound = new NotFoundError("Not Found");
    next(notFound);
};
exports.notFoundErrorHandler = notFoundErrorHandler;
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    const statusCode = error.status || 500; // Ensure status is a number
    res.status(statusCode).json(new response_1.default(`${error.name}`, `${error.message}`));
};
exports.errorHandler = errorHandler;
