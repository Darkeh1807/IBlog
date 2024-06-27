"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const connect_db_1 = __importDefault(require("./DB/connect_db"));
const consola_1 = __importDefault(require("consola"));
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3500;
const app = (0, express_1.default)();
exports.serve = connect_db_1.default.then(() => {
    app.listen(PORT, () => {
        consola_1.default.success(`Server has started running on port ${PORT}`);
    });
}).catch((e) => {
    consola_1.default.error(e);
});
