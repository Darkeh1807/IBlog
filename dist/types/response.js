"use strict";
//Custome response
Object.defineProperty(exports, "__esModule", { value: true });
class IResponse {
    constructor(status, message, data, token) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.token = token;
    }
}
exports.default = IResponse;
