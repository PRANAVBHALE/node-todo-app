const expect=require('expect')
const request=require('supertest')


const {app}=require('./../server')
const{Todo}=require('./../models/todo')


const todos=[{
  text:'First todo task'
},{
  text:'second todo task'
},{
  text:'third todo task'
}]


beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=>done())
})

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
  //  var text = 'Test todo text'

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .expect((res)=>{
      expect(res.body.text).toBe();
      done()

    })
    .end((err,res)=>{
      if(err){
        return done(err)
      }

      Todo.find(text).then((todos)=>{
        expect(todos.length).toBe(4)
        expect(todos[0].text).toBe()
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
    .end(done)
  })
})
