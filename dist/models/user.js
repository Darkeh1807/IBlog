"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    role: {
        type: mongoose_1.SchemaTypes.String,
    }
}, {
    timestamps: true
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
