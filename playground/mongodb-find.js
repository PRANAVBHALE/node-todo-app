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

  // db.collection('Todos').find({
  //   _id:new ObjectId('5a0bf820c56fb23c8073714e')
  // }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('Enable to find todos',err);
  // })

  // db.collection('Todos').find().count().then((count)=>{
  //   console.log(`Todos count:${count}`);
  // //  console.log(JSON.stringify(docs,undefined,2));
  // },(err)=>{
  //   console.log('Enable to find todos',err);
  // })

  db.collection('Users').find({
    name:'Pranav Bhale'
  }).toArray().then((docs)=>{
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log('Enable to find user',err);
  })

//  db.close();
})
