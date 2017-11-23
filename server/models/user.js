var mongoose=require('mongoose')



var User=mongoose.model('User',{
  name:{
    type:String,
    required:true,

  },
  email:{
    type:String,
      required:true,
      trime:true
  },
  age:{
    type:Number,
      required:true,
      min:18,
      max:60
  }
})
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
