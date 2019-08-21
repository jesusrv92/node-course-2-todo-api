"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const { ObjectID } = mongodb;
const todo_1 = require("./models/todo");
const app = express();
app.listen(3000, () => {
    console.log('Started on port 3000');
});
app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    var todo = new todo_1.default({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});
app.get('/todos', (req, res) => {
    todo_1.default.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    todo_1.default.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});
exports.default = app;
