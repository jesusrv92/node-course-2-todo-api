"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("./../server/models/todo");
// Todo.deleteMany({}).then((result) => {
//     console.log(result);
// })
todo_1.default.findByIdAndDelete('5d5eef7bf4f03d2a04b2ae9f').then((todo) => {
    console.log(todo);
});
