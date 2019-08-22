"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../db/mongoose");
const Todo = mongoose_1.default.model('Todo', new mongoose_1.default.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null
    }
}));
exports.default = Todo;
