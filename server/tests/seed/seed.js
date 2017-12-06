//const ObjectID = require('mongodb');
const{ObjectID}=require('mongodb')
const jwt = require('jsonwebtoken')


const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()


const users = [{
  _id:userOneId,
  email:'pranav@gmail.com',
  password:'useronepass',
  tokens:[{
    access:'auth',
    token:jwt.sign({_id:userOneId,access:'auth'},'555').toString()
  }]
},{
  _id:userTwoId,
  email:'pranav25@gmail.com',
  password:'usertwopass',
  tokens:[{
    access:'auth',
    token:jwt.sign({_id:userTwoId,access:'auth'},'555').toString()
  }]
}]


const todos=[{
  _id:new ObjectID,
  text:'First todo task',
  _creator:userOneId
},{
  _id:new ObjectID,
  text:'second todo task',
  completed:true,
  completedAt:555,
  _creator:userTwoId
},{
  id:new ObjectID,
  text:'third todo task',
  _creator:userOneId
}]

const populateTodos = (done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=>done())
}

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
  //  return User.insertMany(users)
  var userOne = new User(users[0]).save()
  var userTwo = new User(users[1]).save()

    return Promise.all([userOne,userTwo])
  }).then(()=>done())
}

module.exports = {todos , populateTodos , users , populateUsers}
