const expect=require('expect')
const request=require('supertest')
const{ObjectID}=require('mongodb')



const {app}=require('./../server')
const{Todo}=require('./../models/todo')


const todos=[{
  _id:new ObjectID,
  text:'First todo task'
},{
  _id:new ObjectID,
  text:'second todo task'
},{
  id:new ObjectID,
  text:'third todo task'
}]


beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=>done())
})

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text = 'First todo task'

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
      done();

    })
    .end((err,res)=>{
      if(err){
        return done(err)
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(4)
        expect(todos[0].text).toBe(text)
      }).catch((e)=>done(e))
    })
  })

  it('should not create todos with invalid body data',(done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    done()

    .end((err,res)=>{
    if(err){
      return done(err)
    }

    Todo.find().then((todos)=>{
      expect(todos.length).toBe(3)
    }).catch((e)=>done(e))
  })
})
})


describe('GET/todos',()=>{
  it('should get all to dos',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(3)
    })
    .end(done);
  })
})


describe('GET/todos/:id',()=>{

  it('should give valid data',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done)

  })


  it('should give 404 if todo not found',(done)=>{
    var hexId=new ObjectID().toHexString()

    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  })

  it('should give 404 if todo not found',(done)=>{
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done)
  })

})


describe('DELETE/todos/:id',(req,res)=>{
  it('should delete valid todo',(done)=>{

    var hexId=todos[1]._id.toHexString()
    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId)
    })
    .end((err,res)=>{
      if(err){
        return done(err)
      }

      Todo.findById(hexId).then((todo)=>{
        expect(todo).toNotExist();
        done();
      }).catch((e)=>done(e));
    });
  });


  it('should give 404 if todo not found',(done)=>{
    var hexId=new ObjectID().toHexString()

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .end(done)
  })


  it('should give 404 for non Object id',(done)=>{
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done)
  })
})
