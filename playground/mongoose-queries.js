"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectID } = require('mongodb');
var idTodo = "5d5c7ecf1ec7c347f42befd2";
var idUser = "5d5ad0d6d870a42eb05ba545";
Todo.findById(idTodo).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Todo by Id', todo);
}).catch((e) => console.log(e));
User.findById(idUser).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log('User by Id', user);
}).catch((e) => console.log(e));
