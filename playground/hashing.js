const {SHA256} = require('crypto-js')
const jwt =require('jsonwebtoken')

//jwt.sign
//jwt.verify

var data = {
  id:10
}

var token = jwt.sign(data,'123abc')
console.log(token);

var decoded = jwt.verify(token,'123abc')
console.log(decoded);
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
