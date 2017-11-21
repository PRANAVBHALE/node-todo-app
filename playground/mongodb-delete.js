// const mongoClient=require('mongodb').MongoClient

const {MongoClient,ObjectId}=require('mongodb')

var obj=new ObjectId;

console.log(obj);


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

  //delete one
  // db.collection('Todos').deleteOne({
  //   task:'Eat lunch'
  // }).then((result)=>{
  //   console.log(result);
  // },(err)=>{
  //   console.log('unable to delete data');
  // })

  //delete many
  // db.collection('Users').deleteMany({
  //   task:'Do NodeJS on udemy'
  // }).then((result)=>{
  //   console.log(result);
  // },(err)=>{
  //   console.log('unable to delete data');
  // })

  //find and delete
  db.collection('Todos').findOneAndDelete({
    completed:true
  }).then((result)=>{
    console.log(result);
  },(err)=>{
    console.log('unable to delete data');
  })

//  db.close();
})
