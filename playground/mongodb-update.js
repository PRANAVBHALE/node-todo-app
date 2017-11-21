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


  db.collection('Todos').findOneAndUpdate({
    _id:new ObjectId('5a0bf80ba10bb41d68fd01d0')
  },{
    $set:{
        completed:false
    }
  },{
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  },(err)=>{
    console.log('unable to update data');
  })

  db.collection('Users').findOneAndUpdate({
    _id:new ObjectId('5a0c230d95b97f235c04dd03')
  },{
    $set:{
      name:'Rohan'
    },
    $inc:{
      age:5
    }
  },{
    returnOriginal:false
  }).then((result)=>{
    console.log(result);
  },(err)=>{
    console.log('Unable to update data');
  })

//  db.close();
})
