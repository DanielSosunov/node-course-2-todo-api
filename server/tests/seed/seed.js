const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const user1id = new ObjectID();
const user2id = new ObjectID();
const users =[{
    _id:user1id,
    email:"daniel@example.com",
    password:"user1pass",
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:user1id,access:'auth'},process.env.JWT_SECRET).toString()
    }]
},{
    _id:user2id,
    email:"daniel2@example.com",
    password:"user2pass",
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:user2id,access:'auth'},process.env.JWT_SECRET).toString()
    }]
}]
const todos = [
    {
        _id:new ObjectID(),
        text:'First Test Todo',
        _creator:user1id
    },
    {
        _id:new ObjectID(),
        text:'Second Test Todo',
        completed:true,
        completedAt:333,
        _creator:user2id
    }
];

const populateTodos = (done) =>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
}
const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo]);
    }).then(()=>done());
}
module.exports = {
    populateTodos,
    todos,
    users,
    populateUsers
}