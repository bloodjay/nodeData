const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result)=>{
    console.log(result);
});

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5adf4d5d58e16a9e1f6020e8').then((todo) => {
 console.log(Todo);
})

Todo.findOneAndRemove({_id:''}).then((todo) => {

});