"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect = require("expect");
const mongodb = require("mongodb");
const request = require('supertest');
const { ObjectID } = mongodb;
// declare function beforeEach(fn: Function): Promise<{}>;
// declare function describe(str: string, fn: Function): void;
// declare function it(str: string, fn: Function): void;
const server_1 = require("./../server");
const todo_1 = require("./../models/todo");
const todos = [{
        _id: new ObjectID(),
        text: 'First test todo'
    }, {
        _id: new ObjectID(),
        text: 'Second test todo'
    }];
beforeEach((done) => {
    todo_1.default.deleteMany({}).then(() => {
        return todo_1.default.insertMany(todos);
    }).then(() => done());
});
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(server_1.default)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
            expect(res.body.text).toBe(text);
        })
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            todo_1.default.find({ text }).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            })
                .catch((e) => done(e));
        });
    });
    it('should not create todo with invalid body data', (done) => {
        request(server_1.default)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            todo_1.default.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});
describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(server_1.default)
            .get('/todos')
            .expect(200)
            .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
            .end(done);
    });
});
describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(server_1.default)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        request(server_1.default)
            .get(`/todos/${(new ObjectID()).toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non-object ids', (done) => {
        request(server_1.default)
            .get(`/todos/[hello]`)
            .expect(404)
            .end(done);
    });
});
describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        const hexId = todos[1]._id.toHexString();
        request(server_1.default)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            todo_1.default.findById(hexId).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch((e) => done(e));
        });
    });
    it('should return 404 if todo not found', (done) => {
        request(server_1.default)
            .delete(`/todos/${(new ObjectID()).toHexString()}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non-object ids', (done) => {
        request(server_1.default)
            .delete(`/todos/[hello]`)
            .expect(404)
            .end(done);
    });
});
