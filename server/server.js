

var express=require('express')
var bodyParser=require('body-parser')
const{ObjectID}=require('mongodb')


var {mongoose}=require('./db/mongoose.js')
var {Todo}=require('./models/todo.js')
var {User}=require('./models/user.js')

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

app.listen(port,()=>{
  console.log(`Server availavble on port ${port}`);
})


module.exports={app}
