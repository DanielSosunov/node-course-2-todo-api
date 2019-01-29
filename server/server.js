const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.status(200).send(doc);
    },(e)=>{
        res.status(400).send(e);
    })
})
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.status(200).send({todos});
    },(err)=>{
        res.status(400).send(err);
    })
})
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todo.findById(id).then((todo)=>{
        if(!todo) return res.status(404).send();
        res.status(200).send({todo});
    },(err)=>{
        res.status(400).send()
    })
})
app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id))return res.status(404).send();

    Todo.findOneAndRemove(id).then((todo)=>{
        if(!todo) return res.status(404).send();
        res.status(200).send(JSON.stringify(todo));
    },(e)=>res.status(400).send());
})
app.listen(port,()=>{
    console.log('Started on port:',port)
});

module.exports = {
    app
};

