"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongodb_1 = require("mongodb");
const todo_1 = require("./models/todo");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started on port ${port}`);
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
    if (!mongodb_1.ObjectID.isValid(id)) {
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
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!mongodb_1.ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    todo_1.default.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});
exports.default = app;
