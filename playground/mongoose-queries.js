const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

/*var id = "5c507bd851eaec540e5b45fd11";
if(!ObjectID.isValid(id)){
    console.log('Id not valid',id)
}
Todo.find({
    _id:id
}).then((todos)=>{
    console.log(todos);
})

Todo.findOne({
    _id:id
}).then((todo)=>{
    console.log(todo);
})

Todo.findById(id).then((todo)=>{
    if(!todo) return console.log('Id not found')
    console.log(todo);
}).catch(e=>console.log(e));*/

var id = "5c4f578deb642b741666bac8";
User.findById(id).then((user)=>{
    if(!user) return console.log('User not found');
    console.log(user);
}).catch(e=>console.log(e));