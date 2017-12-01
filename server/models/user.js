const mongoose=require('mongoose')
const validator=require('validator')
const _ = require('lodash')
const jwt = require('jsonwebtoken')


var UserSchema = new mongoose.Schema({
  email:{
    type:String,
      required:true,
      trime:true,
      minLength:1,
      unique:true,
      validate:{
        validator: validator.isEmail,
        message:'{VALUE} is not email',
        isAsync:false
      }
  },

  password:{
    type:String,
    minLength:1,
    require:true
  },

  tokens:[{
    access:{
      type:String,
      required:true
  },

  token:{
    type:String,
    required:true
    }
  }]
})

UserSchema.methods.toJSON = function(){
  var user = this
  var userObject = user.toObject()

  return _.pick(userObject,['_id','email'])
}

UserSchema.methods.generateAuthToken = function(){
  var user = this
  var access = 'auth'
  var token = jwt.sign({_id:user._id.toHexString(),access},'555').toString()

  user.tokens.push({access,token})

    return user.save().then(()=>{
    return token
  })
}

var User=mongoose.model('User',UserSchema);
//
//
// var user=new User({
//   name:'',
//   email:'     rabbid@rocketmail.com       ',
//   age:5
// })
//
// user.save().then((doc)=>{
//   console.log('saved mytodo',doc);
// },(e)=>{
//   console.log('enabble to save');
// })

module.exports={User}
