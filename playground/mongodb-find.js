//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(error,db){
    if(error){
        return console.log("Unable to connect to MongoDB Server");
    }
    console.log("Connected to MongoDB Server");

    /*db.collection('ToDos').find({
        _id: new ObjectID('5c4a33baa3ed7a2cf80d0858')
    }).toArray().then((docs)=>{
        console.log('ToDos');
        console.log(JSON.stringify(docs,null,2));
    },(err)=>{
        console.log(`unable to fetch todos`,err);
    })*/

    /*db.collection('ToDos').find().count().then((count)=>{
        console.log(`ToDos count: ${count}`);
    },(err)=>{
        console.log(`unable to fetch todos`,err);
    })*/

    db.collection('Users').find({Name:'Danny'}).toArray().then((docs)=>{
        console.log(`Todos\n${JSON.stringify(docs,null,2)}`);
    },(err)=>{
        console.log(`Unable to fetch Users ${err}`)
    });

    //db.close();
});