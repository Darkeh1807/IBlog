"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myrouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user_routes");
exports.myrouter = (0, express_1.Router)();
exports.myrouter.use("/api/user", user_routes_1.userRouter);
