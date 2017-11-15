// const mongoClient=require('mongodb').MongoClient

const {MongoClient,ObjectId}=require('mongodb')

// var obj=new ObjectId;
//
// console.log(obj);


var user={
  name:'pranav',
  age:25
}

var {name}=user

console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Unable to connect to mongodb server');
  }
  console.log('connected to mongodb server');

  // db.collection('Todos').insertOne({
  //   text:'somthing to do',
  //   completed:false
  // },(err,result)=>{
  //   if(err){
  //     return console.log('Unable to insert record',err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // })

  // db.collection('Users').insertOne({
  //   //  _id:123,
  //     name:'Pranav Bhale',
  //     age:25,
  //     location:'india'
  // },(err,result)=>{
  //   if(err){
  //     return console.log('Unable to create user');
  //   }
  //
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  // })

  db.close();
})
