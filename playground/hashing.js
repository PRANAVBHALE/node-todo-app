const {SHA256} = require('crypto-js')
const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var password = '123abc'

// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt,(err,hash)=>{
//     console.log(hash);
//   })
// })

var hashPassword = '$2a$10$IawwZSRZRMcSqii0SUqax.oMUKLvnhzk7wfScYPklva8q7WqiEnnm'

bcrypt.compare("123",hashPassword,(err,res)=>{
  console.log(res);
})
//jwt.sign
//jwt.verify

// var data = {
//   id:10
// }
//
// var token = jwt.sign(data,'123abc')
// console.log(token);
//
// var decoded = jwt.verify(token,'123abc')
// console.log(decoded);
// var messsage = 'Hello World'
// var hash = SHA256(messsage).toString()
//
// console.log(`Message  : ${messsage}`);
// console.log(`HASH : ${hash}`);
//
// var data = {
//   id:3
// }
//
// var token = {
//   data,
//   hash:SHA256(JSON.stringify(data) + 'secrect').toString()
// }
//
// token.data.id =5
// token.hash = SHA256(JSON.stringify(token.data)).toString()
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'secrect').toString()
//
//
// if (resultHash === token.hash) {
//   console.log('Data not Change');
// }else {
//   console.log('data  change,dont trust');
// }
