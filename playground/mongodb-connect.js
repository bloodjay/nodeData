// const MongoClient = require('mongodb').MongoClient;
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);
// var user = {name: 'Jiayi', age:30};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
       return console.log('unable to connect to database');
    }
    console.log('Connected to Server');
    const db = client.db('TodoApp');
    // db.collection('Todos').insertOne({
    //   text:'Do something',
    //   completed:'false'
    // },(err,result)=>{
    //     if(err){
    //       return console.log('unable to insert')
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })

    db.collection('Users').insertOne({
        name:'Jay',
        age:'30',
        location:'Bt'
    },(err,result) => {
        if(err)
        return console.log('unable to insert')
        console.log(JSON.stringify(result.ops,undefined,2))
        console.log(result.ops[0]._id.getTimestamp());
    })
    
    client.close();
});