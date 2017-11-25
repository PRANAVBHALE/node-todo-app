const mongoose = require('mongoose');


    // let db = {
    //   localhost: ,
    //   mlab: 'mlab://pranav:bhale@ds117336.mlab.com:17336/todoapp'
    // };


mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/TodoApp',{ useMongoClient: true })

module.export={mongoose}
