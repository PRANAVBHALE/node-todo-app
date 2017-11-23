var express=require('express')
var bodyParser=require('body-parser')

var {mongoose}=require('./db/mongoose.js')
var {Todo}=require('./models/todo.js')
var {User}=require('./models/user.js')

var app = express()



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

app.listen(3000,()=>{
  console.log('Server availavble on port 3000');
})
