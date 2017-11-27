const{ObjectID}=require('mongodb')

const {mongoose}=require('./../server/db/mongoose')
const{Todo}=require('./../server/models/todo')
const{User}=require('./../server/models/user')

// Todo.remove({}).then((result) =>{
//   console.log(result);
// })

Todo.findOneAndRemove({_id:'5a18771195b4fc383c5c7591'}).then((todo)=>{
//  console.log(todo);
})
Todo.findByIdAndRemove('5a18771195b4fc383c5c7591').then((todo)=>{
  console.log(todo);
})
