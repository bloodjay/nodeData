
var env = process.env.NODE_ENV || 'development';


if(env === 'development')
{
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
}else if(env === 'test '){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
  console.log('texttodo',process.env.MONGODB_URI)
}

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {mongoose} = require('./db/mongoose');
var {authenticate} = require('./middleware/authenticate')


var app = express();
app.use(bodyParser.json());

app.post('/todo', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    console.log(req.body);
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todo', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    })
})

app.delete('/todo/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);
    }).catch((e) => {
        res.status(404).send();
    })
    // get the id
    // remove todo by id
    //success and error, 400 with empty body
})

app.get('/todo/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }


    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
    //res.send(req.params);
})

app.patch('/todo/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed)&&body.completed)
    {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new: true}).then((todo) => {
         if(!todo)
         {
             return res.status(404).send();
         }

         res.send({todo});
    }).catch((e) => {
        res.status(400).send()
    })
})
//post /user

app.post('/users',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
    
    user.save().then(() => {
        return user.generateAuthToken();
        res.send(user)
    }).then((token) => {
       res.header('x-auth',token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})


app.get('/users/me',authenticate,(req,res) => {
   res.send(req.user)
})

app.listen(3000, () => {
    console.log('Started port 3000')
})


module.exports = { app }

