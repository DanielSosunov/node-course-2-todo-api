//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(error,db){
    if(error){
        return console.log("Unable to connect to MongoDB Server");
    }
    console.log("Connected to MongoDB Server");

    /*db.collection('ToDos').findOneAndUpdate({
        _id:new ObjectID("5c4a3f7a318ffe2cf8b2c63c")
    },{
        $set:{
            completed:true
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    })*/

    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('5c4a2fd50b27bd2b4831d662')
    },{
        $set:{
            Name:'Danny'
        },
        $inc:{
            Age:1
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    })

    //db.close();
});