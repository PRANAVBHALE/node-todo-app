const mongoose = require('mongoose');


    let db = {
      localhost: 'mongodb://localhost:27017/TodoApp',
      mlab: 'mongodb://pranav:bhale@ds117336.mlab.com:17336/todoapp'
    };


mongoose.Promise=global.Promise;
mongoose.connect(db.localhost||process.env.MONGODB_URI,{ useMongoClient: true })

module.export={mongoose}
