//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(error,db){
    if(error){
        return console.log("Unable to connect to MongoDB Server");
    }
    console.log("Connected to MongoDB Server");

    /*db.collection('ToDos').insertOne({
        text:'Something to do',
        completed:false
    },function(err,result){
        if(err){
            return console.log('Unable to insert todo',err);
        }
        console.log(JSON.stringify(result.ops,null,2));
    })
    db.collection('Users').insertOne({
        Name:'Danny',
        Age:24,
        Location:'NY'
    },function(err,result){
        if(err)return console.log(`Unable to insert to Users`,err);
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    })*/
    
    db.close();
});