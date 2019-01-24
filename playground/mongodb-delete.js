//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',function(error,db){
    if(error){
        return console.log("Unable to connect to MongoDB Server");
    }
    console.log("Connected to MongoDB Server");

    //deleteMany
    /*db.collection('ToDos').deleteMany({text:'eat lunch'}).then((result)=>{
        console.log(result);
    })
    //deleteOne
    db.collection('ToDos').deleteOne({text:'eat lunch'}).then((result)=>{
        console.log(result);
    })
    //findOneAndDelete
    db.collection('ToDos').findOneAndDelete({completed:false}).then((result)=>{
        console.log(result);
    })*/
    //db.collection('Users').deleteMany({Name:'Danny'});
    /*db.collection('Users').findOneAndDelete({_id:new ObjectID('5c4a4178318ffe2cf8b2c63d')}).then((result)=>{
        console.log(result);
    });*/

    //db.close();
});