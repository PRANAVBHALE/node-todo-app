const{ObjectID}=require('mongodb')

const {mongoose}=require('./../server/db/mongoose')
const{Todo}=require('./../server/models/todo')
const{User}=require('./../server/models/user')


// var id = '5a1734c2c1233b20507b199611'
var userid='5a17ce312187090a9e80e522'
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not Valid');
// }

if(!ObjectID.isValid(userid)){
  console.log('Id not valid');
}

User.findById(userid).then((user)=>{
  if(!user){
    return console.log('id not presebt');
  }
  console.log('Users by id',user);
}).catch((e)=>console.log(e));

// Todo.find({
//   _id:id
// }).then((todos)=>{
//   console.log('TOdos',todos);
// })
//
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log('TOdos',todo);
// })

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('id not present');
//   }
//   console.log('TOdos by id',todo);
// }).catch((e)=>console.log(e));
