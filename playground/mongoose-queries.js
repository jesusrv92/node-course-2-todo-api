const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
var id = "5d5c7ecf1ec7c347f42befd2";
Todo.findById(id).then((todos) => {
    console.log('Todos', todos);
});
