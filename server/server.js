require('./config/config.js')

const _ = require('lodash');

const express=require('express')
const bodyParser=require('body-parser')
const{ObjectID}=require('mongodb')


var {mongoose}=require('./db/mongoose.js')
var {Todo}=require('./models/todo.js')
var {User}=require('./models/user.js')
var {authenticate} = require('./middleware/authenticate.js')

var app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())


app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });



  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
  //  console.log('Enable to save data');
  res.status(400).send(e)
//  console.log(req.body);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  },(e)=>{
    res.status(400).send(e)

  })
})

//GET/todos/12345 (:id) ie dynamic id request

app.get('/todos/:id',(req,res)=>{
//  res.send(req.params)
var id = req.params.id
if(!ObjectID.isValid(id)){
  // console.log('Id not valid');
  return res.status(404).send()
}

Todo.findById(id).then((todo)=>{
  if(!todo){
    return res.status(404).send()
  }
  res.send({todo});
}).catch((e)=>{
  res.status(400).send()
})
});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id


  //validate the id->not vlaid?return 404 -
  if(!ObjectID.isValid(id)){
    // console.log('Id not valid');
    return res.status(404).send()
  }

  //remove by id
    //if (fail) ->send 404
    //else success
    // catch error ->send 400
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    res.send({todo})
  }).catch((e)=>{
    res.status(400).send()
  })
})

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id
  var body =_.pick(req.body,['text','completed'])

  //validate the id->not vlaid?return 404 -
  if(!ObjectID.isValid(id)){
    // console.log('Id not valid');
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt=new Date().getTime()
  }else {
    body.completed=false
    body.completedAt=null
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
    return res.status(404).send();
    }
    res.send({todo})
  }).catch((e)=>{
    res.status(400).send();
  })

})

app.listen(port,()=>{
  console.log(`Server availavble on port ${port}`);
})


app.post('/users',(req,res)=>{
  var body =_.pick(req.body,['email','password'])
  var user = new User(body)

  //User.findByToken -> User model functions
  //user.generateAuthToken -> user instance methods

  user.save().then(()=>{
  //  res.send(user);
    return user.generateAuthToken()
  }).then((token)=>{
    res.header('x-auth',token).send(user)
  }).catch((e)=>{
  //  console.log('Enable to save data');
  res.status(400).send(e)
//  console.log(req.body);
})
});



app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user)
})

app.post('/users/login',(req,res)=>{
  var body = _.pick(req.body,['email','password'])
  debugger
  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user)
    //  res.send(user)
    })
  }).catch((e)=>{
    res.status(400).send()
  })
//  res.send(body)
})



module.exports={app}
