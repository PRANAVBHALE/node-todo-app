var mongoose=require('mongoose')


var Todo=mongoose.model('Todo',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trime:true
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  },

  _creator:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  }
})
//
//
// var newTodo=new Todo({
//   text:'Cook dinner'
// })
//
// var myTodo=new Todo({
//   text:'   edit this video   '
// })
//
// // newTodo.save().then((doc)=>{
// //   console.log('saved todo',doc);
// // },(e)=>{
// //   console.log('enable ot save');
// // })
//
// myTodo.save().then((doc)=>{
//   console.log('saved mytodo',doc);
// },(e)=>{
//   console.log('enabble to save');
// })


module.exports={Todo}
