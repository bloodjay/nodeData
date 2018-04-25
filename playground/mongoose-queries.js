const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5ada40255cbed34ef4b25458';

Todo.find(
    {_id:id}
).then((todos)=>{
    console.log('Todos',todos)})

Todo.findOne({_id:id}).then((todos) => {
console.log('Todo by one',todo);
})

Todo.findById(id).then((todo) =>{
   console.log('Todo by ID',todo);
} )