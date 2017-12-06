const mongoose=require('mongoose')
const validator=require('validator')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


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
  var token = jwt.sign({_id:user._id.toHexString(),access},process.env.JWT_SECRECT).toString()

  user.tokens.push({access,token})

    return user.save().then(()=>{
    return token
  })
}

UserSchema.methods.removeToken = function(token){
  var user = this

  return user.update({
    $pull:{                         //$pull mongodb property to remove object ith 'token'
      tokens:{token}
    }
  })
}

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

  UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;

    try {
      decoded = jwt.verify(token,process.env.JWT_SECRECT)
    } catch (e) {
      // return new Promise((resolve,reject)=>{
      //   reject()
      // })
      return Promise.reject('test')
    }

    return User.findOne({
      '_id' : decoded._id,
      'tokens.token':token,
      'tokens.access':'auth'
    });
  };

  UserSchema.statics.findByCredentials = function (email,password){
    var User = this;
    debugger
    return User.findOne({email}).then((user)=>{
      if(!user){
        return Promise.reject()
      }

      return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password,(err,res)=>{
          if(res){
            resolve(user)
          }else {
            reject()
          }
        })
      })
    })

  }

  UserSchema.pre('save',function(next){
    var user = this

    if (user.isModified('password')) {
      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
          user.password = hash
          next()
        })
      })
    }else {
      next()
    }
  })

  var User=mongoose.model('User',UserSchema);


module.exports={User}
