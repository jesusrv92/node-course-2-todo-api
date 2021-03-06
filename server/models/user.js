"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../db/mongoose");
const User = mongoose_1.default.model('User', new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
}));
exports.default = User;
