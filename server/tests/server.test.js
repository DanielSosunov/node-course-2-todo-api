const request = require('supertest');
const expect = require('expect');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

const todos = [
    {
        _id:new ObjectID(),
        text:'First Test Todo'
    },
    {
        _id:new ObjectID(),
        text:'Second Test Todo',
        completed:true,
        completedAt:333
    }
];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos',()=>{
    it('Should create a new Todo',(done)=>{
        var text = 'Test Todo Text';

        request(app).post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err)=>done(err));
        })
    })
    it('Should not create a Todo with invalid body data',(done)=>{
        request(app).post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err) return done(err);
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((err)=>done(err));
        })
    })
})
describe('GET /todos',()=>{
    it('Should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
})
describe('GET /todos/:id',()=>{
    it('should return todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    })
    it('should return a 404 if todo not found',(done)=>{
        var id = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    })
    it('should return a 404 for non-object ids',(done)=>{
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    })

})
describe('DELETE /todos/:id',()=>{
    it('should delete the todo',(done)=>{
        var id = todos[1]._id.toHexString();
        request(app).delete(`/todos/${id}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(id);
        })
        .end((err,res)=>{
            if(err) return done(err);
            Todo.findById(id).then((todo)=>{
                expect(todo).toNotExist();
                done();
            }).catch(e=>done(e));
        });
    });
    it('should return 404 if todo not found',(done)=>{
        var id = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 if object id is invalid',(done)=>{
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    })
})
describe('PATCH /todos/:id',()=>{
    it('should update the todo',(done)=>{
        var id = todos[0]._id.toHexString();
        var changedText = "Update from test;"
        request(app)
        .patch(`/todos/${id}/`)
        .send({
            "text":changedText,
            "completed":true
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(changedText)
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    })
    it('should clear completedAt when todo is not completed',(done)=>{
        var id = todos[1]._id.toHexString();
        var changedText = "Second changed text";
        request(app)
        .patch(`/todos/${id}`)
        .send({
            "text":changedText,
            "completed":false
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(changedText)
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    })
})