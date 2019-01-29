const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

/*Todo.remove({}).then((result)=>{
    console.log(result);
})*/

Todo.findOneAndRemove({_id:"5c50ad66c8b78e31f8d345bf"}).then((todo)=>{
    console.log(todo);
})

Todo.findByIdAndRemove('5c50ad66c8b78e31f8d345bf').then((todo)=>{
    console.log(todo);
})